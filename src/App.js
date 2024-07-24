import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import MovieDetail from "./Pages/Movie/MovieDetail.js";
import FilmDetail from "./Pages/Movie/FilmDetail.js";
import RecentMovies from "./Pages/MovieTypePages/RecentMovies.js";
import OtherMovies from "./Pages/MovieTypePages/OtherMovies.js";
import Film from "./Pages/MovieTypePages/Film.js";
import SearchResults from "./Pages/Search/SearchResults.js";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/film/:slug" element={<FilmDetail />} />
        <Route path="/recent-movies" element={<RecentMovies />} />
        <Route path="/type/:type_list" element={<OtherMovies />} />
        <Route path="/type/film" element={<Film />} />
        <Route path="/search/:search_query" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
