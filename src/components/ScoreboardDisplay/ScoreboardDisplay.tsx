import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import type { IScoreboardItem } from '@src/models/apiHandlers';
import type { IQuestion } from '@src/models/problems';
import React, { useMemo } from 'react';

interface ScoreboardDisplayProps {
  scoreboardInfo: IScoreboardItem[];
  question: IQuestion;
}

const ScoreboardDisplay: React.FC<ScoreboardDisplayProps> = ({
  scoreboardInfo,
  question
}) => {
  const rows = useMemo(() => {
    return scoreboardInfo
      .filter((item) => item.questionId === question.id)
      .map((item) => ({
        ...item,
        earliestCorrectSubmission:
          item.earliestCorrectSubmission &&
          new Date(item.earliestCorrectSubmission)
      }));
  }, [scoreboardInfo, question]);

  if (rows.length < 1)
    return (
      <Typography variant="h6" minWidth={200} textAlign="center">
        No results
      </Typography>
    );

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="scoreboard">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Earliest Correct Submission</TableCell>
            <TableCell align="right"># of Attempts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.earliestCorrectSubmission
                  ? row.earliestCorrectSubmission.toLocaleString()
                  : 'N/A'}
              </TableCell>
              <TableCell align="right">{row.numberOfAttempts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreboardDisplay;
