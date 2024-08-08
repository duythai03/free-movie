import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import favMovieSlice from "./slices/favMovieSlice";
import movieHistorySlice from "./slices/movieHistorySlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    favMovies: favMovieSlice,
    movieHistory: movieHistorySlice,
  },
});
