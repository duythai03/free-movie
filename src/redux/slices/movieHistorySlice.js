import { createSlice } from "@reduxjs/toolkit";

const movieHistorySlice = createSlice({
  name: "movieHistory",
  initialState: {
    movies: [],
    totalMovies: 0,
    totalMoviesEachPage: 0,
    currentPage: 1,
    totalPage: 1,
  },
  reducers: {
    setMovies: (state, action) => {
      const { data, totalMovies, totalMoviesEachPage, currentPage, totalPage } =
        action.payload;
      state.movies = data;
      state.totalMovies = totalMovies;
      state.totalMoviesEachPage = totalMoviesEachPage;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
    },

    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },

    removeHistory: (state) => {
      state.movies = [];
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setMovies, addMovie, removeHistory, setCurrentPage } =
  movieHistorySlice.actions;

export default movieHistorySlice.reducer;
