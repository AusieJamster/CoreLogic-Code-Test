import React from 'react';
import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogBoxTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const DialogBoxTitle: React.FC<DialogBoxTitleProps> = ({
  children,
  onClose,
  ...other
}) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default DialogBoxTitle;
