import React, { useRef, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import PlaceholdePoster from "../assets/placeholder-poster.jpeg";
import { useNavigate } from "react-router-dom";

export default function MovieCard(props) {
  const { movies, handlePage } = props;
  const navigate = useNavigate();
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        handlePage();
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const handleClickDetails = (movie) => {
    navigate(`/${movie.id}`, { state: { movie: movie } });
  };

  return (
    <>
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <Grid
              key={movie.id}
              ref={setLastElement}
              item
              xs={12}
              md={6}
              lg={4}
            >
              <Card sx={{ maxWidth: 345 }} style={{ borderRadius: "1rem" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    movie.poster_path
                      ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : PlaceholdePoster
                  }
                  alt="movie-poster"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button
                    onClick={() => handleClickDetails(movie)}
                    size="small"
                  >
                    Movie Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        } else {
          return (
            <Grid key={movie.id} item xs={12} md={6} lg={4}>
              <Card sx={{ maxWidth: 345 }} style={{ borderRadius: "1rem" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    movie.poster_path
                      ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : PlaceholdePoster
                  }
                  alt="movie-poster"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button
                    onClick={() => handleClickDetails(movie)}
                    size="small"
                  >
                    Movie Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        }
      })}
    </>
  );
}
