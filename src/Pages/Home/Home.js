import React from "react";
import Header from "../../Components/Header";
import Slider from "./Slider";
import RecentMoviesList from "./RecentMoviesList";
import MoviesList from "./MoviesList";
import SeriesList from "./SeriesList";
import CartoonList from "./CartoonList";
import TvshowList from "./TvshowList";
import Footer from "../../Components/Footer";

function Home() {
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
