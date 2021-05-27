import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
        variant='filled'
        severity={props.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                  // props.closed();
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
        {props.alertdata}
        </Alert>
      </Collapse>
    </div>
  );
}
