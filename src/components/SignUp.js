import React, { useEffect, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../api/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp(props) {
  const { handleDialogClose } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUser, updateUser, user } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await createUser(email, password);
      await updateUser(email);
      navigate("/");
      setLoading(false);
      handleDialogClose();
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (user) {
      const setUserDb = async () => {
        await setDoc(doc(db, "bookings", user.uid), { user_bookings: [] });
      };
      setUserDb();
    }
  }, [user]);

  return (
    <div>
      <Typography
        style={{ textAlign: "center", marginBottom: "1rem" }}
        variant="h6"
      >
        Sign Up Now
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
        variant="outlined"
        style={{ width: "100%", marginBottom: "1rem" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ width: "100%", textAlign: "center" }}>
        {loading ? (
          <CircularProgress style={{ width: "1.5rem", height: "1.5rem" }} />
        ) : (
          <Button onClick={handleSubmit} variant="outlined">
            Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}
