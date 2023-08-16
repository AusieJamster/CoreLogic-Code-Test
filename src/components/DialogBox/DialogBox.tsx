import React from 'react';
import { Button, DialogContent, DialogActions } from '@mui/material';
import { CustomDialog } from './DialogBox.styles';
import DialogBoxTitle from './DialogBoxTitle';
import type { TOnAction } from '@src/models/onAction';
import { ActionType } from '@src/models/onAction';

interface DialogBoxProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onAction: TOnAction;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  title,
  children,
  open,
  onAction
}) => {
  const handleClose = () => {
    onAction({ type: ActionType.CLOSE_SCOREBOARD });
  };

  return (
    <CustomDialog
      onClose={handleClose}
      aria-labelledby="dialog-title"
      open={open}
    >
      <DialogBoxTitle id="dialog-title" onClose={handleClose}>
        {title}
      </DialogBoxTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default DialogBox;
