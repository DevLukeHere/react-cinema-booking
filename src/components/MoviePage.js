import React, { useState, useEffect } from "react";
import {
  Typography,
  Toolbar,
  Container,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceholdePoster from "../assets/placeholder-poster.jpeg";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { db } from "../api/firebase";
import { arrayUnion, updateDoc, doc, getDoc } from "firebase/firestore";

export default function MoviePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [format, setFormat] = useState("");
  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(
        `http://api.themoviedb.org/3/movie/${location.state.movie.id}?api_key=328c283cd27bd1877d9080ccb1604c91`
      )
      .then((res) => {
        const movie = res.data;
        setMovie(movie);
        setGenres(movie.genres);
        setSpokenLanguages(movie.spoken_languages);
      });
  }, []);

  useEffect(() => {
    if (bookings.some((booking) => booking.movie_id == movie.id)) {
      setIsBooked(true);
    }
  }, [bookings]);

  const onChangeCinema = (e) => {
    setCinema(e.target.value);
  };

  const onChangeFormat = (e) => {
    setFormat(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onChangeTime = (e) => {
    setTime(e.target.value);
  };

  const handleClick = () => {
    const movieId = movie.id;
    const movieTitle = movie.title;
    const userId = user.uid;
    const bookingsCollectionRef = doc(db, "bookings", userId);

    const createBooking = async () => {
      setLoading(true);
      await updateDoc(
        bookingsCollectionRef,
        {
          user_bookings: arrayUnion({
            movie_id: movieId,
            movie_title: movieTitle,
            cinema: cinema,
            format: format,
            date: date,
            time: time,
          }),
        },
        { merge: true }
      );
      setLoading(false);
      navigate("/account");
    };

    createBooking();
  };

  return (
    <div style={{ background: "hsl(40, 10%, 94%)" }}>
      <Navbar />
      <Toolbar />
      <Container>
        <img
          style={{ width: "100%", height: "auto", marginTop: "1rem" }}
          src={
            movie.poster_path
              ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : PlaceholdePoster
          }
          alt="movie-poster"
        />
        <Typography
          style={{ fontWeight: "bold" }}
          mt={2}
          color="primary"
          gutterBottom
          variant="body2"
        >
          Synopsis
        </Typography>
        <Typography variant="caption">{movie.overview}</Typography>
        <div
          style={{
            padding: "0.75rem",
            background: "#fcf0f5",
            display: "flex",
            justifyContent: "space-around",
            margin: "1rem 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              style={{ fontWeight: "bold" }}
              mt={2}
              color="primary"
              gutterBottom
              variant="body2"
            >
              Genre
            </Typography>
            {genres.map((genre) => (
              <Typography key={genre.id} variant="caption">
                {genre.name}
              </Typography>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              style={{ fontWeight: "bold" }}
              mt={2}
              color="primary"
              gutterBottom
              variant="body2"
            >
              Language
            </Typography>
            {spokenLanguages.map((spokenLanguage, index) => (
              <Typography key={index} variant="caption">
                {spokenLanguage.english_name}
              </Typography>
            ))}
          </div>
          <div>
            <Typography
              style={{ fontWeight: "bold" }}
              mt={2}
              color="primary"
              gutterBottom
              variant="body2"
            >
              Runtime
            </Typography>
            <Typography variant="caption">{movie.runtime} mins</Typography>
          </div>
        </div>
        <div>
          <FormControl
            style={{ width: "100%", color: "black", marginBottom: "1rem" }}
            size="small"
          >
            <InputLabel>Cinema</InputLabel>
            <Select
              label="Cinema"
              value={cinema}
              onChange={onChangeCinema}
              disabled={user && !isBooked ? false : true}
            >
              <MenuItem value={"Cathay Cineplex Cineleisure"}>
                Cathay Cineplex Cineleisure
              </MenuItem>
              <MenuItem value={"Cathay Cineplex Causeway Point"}>
                Cathay Cineplex Causeway Point
              </MenuItem>
              <MenuItem value={"Cathay Cineplex Downtown East"}>
                Cathay Cineplex Downtown East
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ width: "100%", color: "black", marginBottom: "1rem" }}
            size="small"
          >
            <InputLabel>Format</InputLabel>
            <Select
              label="Format"
              value={format}
              onChange={onChangeFormat}
              disabled={user && !isBooked ? false : true}
            >
              <MenuItem value={"Dolby Digital"}>Dolby Digital</MenuItem>
              <MenuItem value={"IMAX"}>IMAX</MenuItem>
              <MenuItem value={"4DX"}>4DX</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ width: "100%", color: "black", marginBottom: "1rem" }}
            size="small"
          >
            <InputLabel>Date</InputLabel>
            <Select
              label="Date"
              value={date}
              onChange={onChangeDate}
              disabled={user && !isBooked ? false : true}
            >
              <MenuItem value={"18 Jul 2022"}>18 Jul 2022</MenuItem>
              <MenuItem value={"19 Jul 2022"}>19 Jul 2022</MenuItem>
              <MenuItem value={"20 Jul 2022"}>20 Jul 2022</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ width: "100%", color: "black", marginBottom: "1rem" }}
            size="small"
          >
            <InputLabel>Time</InputLabel>
            <Select
              label="Time"
              value={time}
              onChange={onChangeTime}
              disabled={user && !isBooked ? false : true}
            >
              <MenuItem value={"13:00"}>13:00</MenuItem>
              <MenuItem value={"17:30"}>17:30</MenuItem>
              <MenuItem value={"19:30"}>19:30</MenuItem>
            </Select>
          </FormControl>
          {!user ? (
            <div
              style={{
                textAlign: "center",
                width: "100%",
                paddingBottom: "1rem",
              }}
            >
              <Typography
                variant="caption"
                style={{ color: "red", fontStyle: "italic" }}
              >
                Please sign in to book movies
              </Typography>
            </div>
          ) : null}
          <div
            style={{
              textAlign: "center",
              width: "100%",
              paddingBottom: "2rem",
            }}
          >
            {loading ? (
              <CircularProgress style={{ width: "1.5rem", height: "1.5rem" }} />
            ) : (
              <Button
                disabled={
                  user && format && cinema && date && time && !isBooked
                    ? false
                    : true
                }
                onClick={handleClick}
                variant="outlined"
              >
                {isBooked ? "Booked" : "Book Now"}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
