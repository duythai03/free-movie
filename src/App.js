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
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/free-movie" element={<Home />} />
          <Route path="/free-movie/movie/:slug" element={<MovieDetail />} />
          <Route path="/free-movie/recent-movies" element={<RecentMovies />} />
          <Route path="/free-movie/type/:type_list" element={<OtherMovies />} />
          <Route
            path="/free-movie/search/:search_query"
            element={<SearchResults />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
