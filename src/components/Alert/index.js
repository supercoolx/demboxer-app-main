
import React from 'react'
// import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber } from "@material-ui/core/colors";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

import { useAlert } from '../../hooks/Context/AlertContext'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: "#0ec167",
    color: "#fffff"
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: "#fffff"
  },
  info: {
    backgroundColor: theme.palette.primary.main,
    color: "#fffff"
  },
  warning: {
    backgroundColor: amber[700],
    color: "#fffff"
  },
  icon: {
    fontSize: 20,
    color: "white"
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
    color: "white"
  },
  message: {
    display: "flex",
    alignItems: "center",
    color: "white"
  }
}));

function SnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

SnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function Alert() {
  const classes = useStyles2();

  const { alert, storeAlert } = useAlert();

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    storeAlert({
      ...alert,
      successSnackbarOpen: false,
      errorSnackbarOpen: false,
      infoSnackbarOpen: false
    })
  }


  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={alert.successSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message={alert.successSnackbarMessage}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={alert.errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant="error"
          className={classes.margin}
          message={alert.errorSnackbarMessage}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={alert.infoSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant="info"
          className={classes.margin}
          message={alert.infoSnackbarMessage}
        />
      </Snackbar>
    </>

  );
}