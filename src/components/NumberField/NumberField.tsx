import { TextField } from '@mui/material';
import type { TOnAction } from '@src/models/onAction';
import { ActionType } from '@src/models/onAction';
import React, { useEffect, useState } from 'react';

interface NumberFieldProps {
  onAction: TOnAction<number>;
  solution: number;
}

const NumberField: React.FC<NumberFieldProps> = ({ onAction, solution }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(solution !== 0 ? solution.toString() : '');
  }, [solution]);

  const updateInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.replace(/[^0-9.]/gi, '').substring(0, 15);

    try {
      const valueAsNumber = parseFloat(value);
      onAction({
        type: ActionType.UPDATE_SOLUTION,
        data: !Number.isNaN(valueAsNumber) ? valueAsNumber : 0
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TextField
      id="solution-field"
      label="Solution"
      onChange={updateInput}
      value={inputValue}
      sx={{ width: '100%', maxWidth: 300, marginX: 'auto' }}
      inputProps={{ maxLength: 15 }}
    />
  );
};

export default NumberField;
