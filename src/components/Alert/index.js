import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snack from '@material-ui/core/SnackbarContent';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from "react-alert-template-basic";
import styles from 'assets/jss/material-kit-react/components/snackbarContentStyle.js';

const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  transition: transitions.FADE
};

const useStyles = makeStyles(styles);

const AlertTemplate = ({ style, options, message, close }) => {
  const classes = useStyles();
  return (
    <div style={{ ...style }}>
      <Snack
        message={<div>{message}</div>}
        classes={{
          root: classes.root + ' ' + classes[options.type],
          message: classes.message + ' ' + classes.container
        }}
      />
    </div>
  );
};

export default AlertProvider;
export { alertOptions, AlertTemplate };
