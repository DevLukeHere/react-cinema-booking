import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {
  Typography,
  IconButton,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DialogWrapper(props) {
  const { dialogOpen, handleDialogClose } = props;
  const [toggleSignUp, setToggleSignUp] = useState(true);

  const handleSignUpToggle = () => {
    setToggleSignUp(!toggleSignUp);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle style={{ textAlign: "end", paddingBottom: "0" }}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {toggleSignUp ? (
            <SignUp handleDialogClose={handleDialogClose} />
          ) : (
            <SignIn handleDialogClose={handleDialogClose} />
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          {toggleSignUp ? (
            <Typography variant="body2">
              Already have an account?{" "}
              <Typography
                onClick={handleSignUpToggle}
                component="span"
                variant="body2"
                color="primary"
                style={{ textDecoration: "underline" }}
              >
                Sign In
              </Typography>
            </Typography>
          ) : (
            <Typography variant="body2">
              Don't have an account yet?{" "}
              <Typography
                onClick={handleSignUpToggle}
                component="span"
                variant="body2"
                color="primary"
                style={{ textDecoration: "underline" }}
              >
                Sign Up
              </Typography>
            </Typography>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
