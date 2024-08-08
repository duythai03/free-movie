import React, { useEffect } from "react";
import Header from "../../Components/Header";
import Slider from "./Slider";
import RecentMoviesList from "./RecentMoviesList";
import MoviesList from "./MoviesList";
import SeriesList from "./SeriesList";
import CartoonList from "./CartoonList";
import TvshowList from "./TvshowList";
import Footer from "../../Components/Footer";
import axios from "axios";

function Home() {
  useEffect(() => {
    axios.get("https://free-movie-be.vercel.app/gfg-articles").then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className="">
      <Header />
      <Slider />
      <RecentMoviesList />
      <MoviesList />
      <SeriesList />
      <CartoonList />
      <TvshowList />
      <Footer />
    </div>
  );
}

export default Home;
