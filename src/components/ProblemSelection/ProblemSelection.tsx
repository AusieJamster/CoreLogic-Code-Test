import { Autocomplete, TextField } from '@mui/material';
import type { TOnAction } from '@src/models/onAction';
import { ActionType } from '@src/models/onAction';
import type { IQuestion } from '@src/models/problems';
import { problemsList } from '@src/models/problems';
import React, { useMemo, useState } from 'react';

interface ProblemSelectionProps {
  defaultQuestion: IQuestion;
  selectedQuestion: IQuestion;
  onAction: TOnAction<IQuestion>;
}

const ProblemSelection: React.FC<ProblemSelectionProps> = ({
  defaultQuestion,
  selectedQuestion,
  onAction
}) => {
  const [inputValue, setInputValue] = useState('');

  const problemsOptions = useMemo(
    () => problemsList.map((problem) => problem.name),
    []
  );

  return (
    <Autocomplete
      id="Problem Select"
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={problemsOptions}
      renderInput={(params) => (
        <TextField {...params} label="Problem to solve" variant="outlined" />
      )}
      onChange={(_, value) => {
        onAction({
          type: ActionType.UPDATE_QUESTION,
          data:
            problemsList.find((problem) => problem.name === value) ||
            defaultQuestion
        });
      }}
      value={selectedQuestion.name}
      sx={{ width: '100%', maxWidth: 300, marginX: 'auto' }}
    />
  );
};

export default ProblemSelection;
