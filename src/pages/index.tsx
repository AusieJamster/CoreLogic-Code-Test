import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Stack, Typography } from '@mui/material';
import ProblemSelection from '@src/components/ProblemSelection';
import type { IQuestion } from '@src/models/problems';
import { problemsList } from '@src/models/problems';
import type { TOnAction } from '@src/models/onAction';
import { ActionType } from '@src/models/onAction';
import NumberField from '@src/components/NumberField';
import CustomButton from '@src/components/CustomButton';
import DialogBox from '@src/components/DialogBox';
import axios from 'axios';
import type { IScoreboardItem } from '@src/models/apiHandlers';
import ScoreboardDisplay from '@src/components/ScoreboardDisplay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NameField from '@src/components/NameField/NameField';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = ({}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>(
    problemsList[0]
  );
  const [answer, setAnswer] = useState<number>(0);

  const [scoreboardOpen, setScoreboardOpen] = useState<boolean>(false);

  const [scoreboardInfo, setScoreboardInfo] = useState<IScoreboardItem[]>([]);
  const [name, setName] = useState<string>('');

  const onAction: TOnAction<unknown> = ({ type, data }) => {
    switch (type) {
      case ActionType.UPDATE_QUESTION:
        setSelectedQuestion(data as IQuestion);
        break;

      case ActionType.UPDATE_SOLUTION:
        setAnswer(data as number);
        break;

      case ActionType.UPDATE_NAME:
        setName(data as string);
        break;

      case ActionType.SUBMIT_FORM:
        axios
          .post(`/api${selectedQuestion.url}`, { name, answer })
          .then((res) => {
            toast(res.data ? 'Wow so easy!' : 'Woops, try again.');
          })
          .catch(console.error);
        break;

      case ActionType.OPEN_SCOREBOARD:
        axios
          .get<IScoreboardItem[]>('/api/scoreboard', {
            params: {
              questionId: selectedQuestion.id
            }
          })
          .then((res) => {
            setScoreboardInfo(res.data);
          })
          .catch(console.error);
        setScoreboardOpen(true);
        break;

      case ActionType.CLOSE_SCOREBOARD:
        setScoreboardOpen(false);
        break;

      default:
        break;
    }
  };

  return (
    <main>
      <Stack
        component="form"
        direction="column"
        height="100vh"
        width="100vw"
        gap={5}
        justifyContent="center"
      >
        <Stack direction="row" alignItems="space-around">
          <ProblemSelection
            defaultQuestion={problemsList[0]}
            selectedQuestion={selectedQuestion}
            onAction={onAction}
          />
          <CustomButton
            onClick={() => onAction({ type: ActionType.OPEN_SCOREBOARD })}
            label={'Score Board'}
          />
        </Stack>
        <Typography variant="h1" textAlign="center">
          {selectedQuestion.name}
        </Typography>
        <Stack gap={1} alignItems="center">
          {selectedQuestion.description.map((desc, idx) => (
            <Typography key={`desc-${idx}`}>{desc}</Typography>
          ))}
        </Stack>
        <NameField onAction={onAction} name={name} />
        <NumberField onAction={onAction} solution={answer} />
        <CustomButton
          onClick={() => onAction({ type: ActionType.SUBMIT_FORM })}
          label={'Submit Answer'}
        />
      </Stack>
      <ToastContainer />
      <DialogBox title={'Scoreboard'} open={scoreboardOpen} onAction={onAction}>
        <ScoreboardDisplay
          scoreboardInfo={scoreboardInfo}
          question={selectedQuestion}
        />
      </DialogBox>
    </main>
  );
};

export default HomePage;
