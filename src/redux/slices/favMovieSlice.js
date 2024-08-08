import { createSlice } from "@reduxjs/toolkit";

const favMovieSlice = createSlice({
  name: "favMovies",
  initialState: {
    movies: [],
    totalMovies: 0,
    totalMoviesEachPage: 0,
    currentPage: 1,
    totalPage: 1,
  },
  reducers: {
    setFavMovies: (state, action) => {
      const { data, totalMovies, totalMoviesEachPage, currentPage, totalPage } =
        action.payload;
      state.movies = data;
      state.totalMovies = totalMovies;
      state.totalMoviesEachPage = totalMoviesEachPage;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
    },

    addFavMovie: (state, action) => {
      state.movies.push(action.payload);
    },

    removeFavMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setFavMovies, addFavMovie, removeFavMovie, setCurrentPage } =
  favMovieSlice.actions;

export default favMovieSlice.reducer;
