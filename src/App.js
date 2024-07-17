import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import MovieDetail from "./Pages/Movie/MovieDetail.js";
import RecentMovies from "./Pages/MovieTypePages/RecentMovies.js";
import OtherMovies from "./Pages/MovieTypePages/OtherMovies.js";
import SearchResults from "./Pages/Search/SearchResults.js";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/free-movie" element={<Home />} />
          <Route path="/movie/:slug" element={<MovieDetail />} />
          <Route path="/recent-movies" element={<RecentMovies />} />
          <Route path="/type/:type_list" element={<OtherMovies />} />
          <Route path="/search/:search_query" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
