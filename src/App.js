import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import MovieDetail from "./Pages/Movie/MovieDetail.js";
import RecentMovies from "./Pages/MovieTypePages/RecentMovies.js";
import OtherMovies from "./Pages/MovieTypePages/OtherMovies.js";
import SearchResults from "./Pages/Search/SearchResults.js";
import { ThemeContext } from "./Context/ThemeContext";
import Login from "./Pages/Login/Login.js";
import SignUp from "./Pages/SignUp/SignUp.js";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "tolight" ? "" : "bg-light-bg text-light-text-light"
      }`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/recent-movies" element={<RecentMovies />} />
        <Route path="/type/:type_list" element={<OtherMovies />} />
        <Route path="/search/:search_query" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
