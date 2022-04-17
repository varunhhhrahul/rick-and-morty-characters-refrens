import React, { useState } from "react";
import { Alert, Box, Snackbar, SnackbarCloseReason } from "@mui/material";
import { AlertComponentPropsWithStyle } from "react-alert";
import styles from "../../assets/jss/components/alertTemplateStyles";

interface IMessageProps {
  message: React.ReactNode;
  severity: "error" | "success" | "info" | undefined;
  handleClose:
    | ((event: Event | React.SyntheticEvent<any, Event>) => void)
    | undefined;
}

const Message: React.FC<IMessageProps> = ({
  message,
  severity,
  handleClose,
}) => {
  const [open] = useState(true);

  return (
    <Box sx={styles.root}>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={severity} onClose={handleClose} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

interface IAlertTemplateProps extends AlertComponentPropsWithStyle {}

export const AlertTemplate: React.FC<IAlertTemplateProps> = ({
  options,
  message,
  close,
}) => <Message severity={options.type} handleClose={close} message={message} />;
