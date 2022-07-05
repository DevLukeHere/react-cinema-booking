import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Typography, Toolbar, Container, Grid, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MovieCard from "./MovieCard";
import Filters from "./Filters";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("release_date.desc");
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    });
  }, []);

  const onChangeFilters = (value) => {
    setFilter(value);
  };

  const loadMoreMovies = () => {
    setLoading(true);
    axios
      .get(
        `http://api.themoviedb.org/3/discover/movie?api_key=328c283cd27bd1877d9080ccb1604c91&include_adult=false&page=${page}&primary_release_year=2021&language=en-US&region=us&sort_by=${filter}`
      )
      .then((res) => {
        const movies = res.data.results;

        movies.forEach((movie, index) => {
          setMovies((prev) => [...prev, movie]);
        });

        setLoading(false);
      });
  };

  const handlePage = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    loadMoreMovies();
  }, [page]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://api.themoviedb.org/3/discover/movie?api_key=328c283cd27bd1877d9080ccb1604c91&include_adult=false&page=${page}&primary_release_year=2021&language=en-US&region=us&sort_by=${filter}`
      )
      .then((res) => {
        const movies = res.data.results;

        setMovies(movies);

        setLoading(false);
      });
  }, [filter]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ background: "hsl(40, 10%, 94%)", position: "relative" }}>
      <Navbar />
      <Toolbar />
      <Container>
        {showTopButton ? (
          <Fab
            color="primary"
            aria-label="up"
            style={{ position: "fixed", right: "5%", bottom: "5%" }}
            onClick={goToTop}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        ) : null}
        <Filters
          filter={filter}
          setFilter={setFilter}
          onChangeFilters={onChangeFilters}
        />
        <Grid container spacing={3}>
          <MovieCard
            movies={movies}
            handlePage={handlePage}
            loadMoreMovies={loadMoreMovies}
          />
          {loading && (
            <Typography variant="h6" style={{ color: "#ffffff" }}>
              loading...
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
}
