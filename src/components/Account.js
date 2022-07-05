import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Toolbar,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { Theaters } from "@mui/icons-material";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import Navbar from "./Navbar";

export default function Account() {
  const [bookings, setBookings] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user.uid) {
      const docRef = doc(db, "bookings", `${user.uid}`);

      const getBookings = async () => {
        const data = await getDoc(docRef);
        if (data.data()) {
          setBookings(data.data().user_bookings);
        }
      };

      getBookings();
    }
  }, [user]);

  return (
    <div style={{ background: "hsl(40, 10%, 94%)", height: "100vh" }}>
      <Navbar />
      <Toolbar />
      <Container>
        <Typography
          variant="h5"
          style={{ textAlign: "center", margin: "1rem 0" }}
        >
          Booking History
        </Typography>
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Welcome "{user.email}"!
        </Typography>

        {bookings.length > 0 ? (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {bookings.map((booking) => (
              <div key={booking.movie_id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Theaters />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={booking.movie_title}
                    secondary={
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>{booking.cinema}</div>
                        <div>{booking.format}</div>
                        <div>{booking.date}</div>
                        <div>{booking.time}</div>
                      </div>
                    }
                  />
                </ListItem>
                <Divider variant="inset" />
              </div>
            ))}
          </List>
        ) : (
          <Typography variant="h6" style={{ textAlign: "center" }}>
            No Previous Bookings Available
          </Typography>
        )}
      </Container>
    </div>
  );
}
