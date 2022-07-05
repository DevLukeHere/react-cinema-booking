import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignIn(props) {
  const { handleDialogClose } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await signIn(email, password);
      setLoading(false);
      handleDialogClose();
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <Typography
        variant="h6"
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        Sign In Now
      </Typography>
      <TextField
        required
        id="standard-required"
        label="Email"
        variant="outlined"
        type="email"
        style={{ width: "100%", marginBottom: "1rem" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        vvariant="outlined"
        style={{ width: "100%", marginBottom: "1rem" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ width: "100%", textAlign: "center" }}>
        {loading ? (
          <CircularProgress style={{ width: "1.5rem", height: "1.5rem" }} />
        ) : (
          <Button onClick={handleSubmit} variant="outlined">
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}
