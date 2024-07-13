import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Home/Home.js";
import MovieDetail from "./Pages/Movie/MovieDetail.js";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:slug" element={<MovieDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
