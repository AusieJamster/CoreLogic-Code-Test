import { TextField } from '@mui/material';
import type { TOnAction } from '@src/models/onAction';
import { ActionType } from '@src/models/onAction';
import React, { useEffect, useState } from 'react';

interface NameFieldProps {
  onAction: TOnAction<string>;
  name: string;
}

const MAX_NAME_LENGTH = 60 as const;

const NameField: React.FC<NameFieldProps> = ({ onAction, name }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  const updateInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
      .replace(/[^0-9a-z ]/gi, '')
      .substring(0, MAX_NAME_LENGTH);

    try {
      onAction({
        type: ActionType.UPDATE_NAME,
        data: value
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TextField
      id="name-field"
      label="Name"
      onChange={updateInput}
      value={inputValue}
      sx={{ width: '100%', maxWidth: 300, marginX: 'auto' }}
      inputProps={{ maxLength: MAX_NAME_LENGTH }}
    />
  );
};

export default NameField;
