import React from "react";
import Header from "../../Components/Header";
import Slider from "./Slider";
import RecentMoviesList from "./RecentMoviesList";
import MoviesList from "./MoviesList";
import SeriesList from "./SeriesList";
import CartoonList from "./CartoonList";
import TvshowList from "./TvshowList";
import Footer from "../../Components/Footer";
import Animation from "../../Components/Animation";

function Home() {
  return (
    <div className="">
      <Header />
      <Slider />
      <Animation animationType="fade-up">
        <RecentMoviesList />
      </Animation>
      <Animation animationType="fade-up">
        <MoviesList />
      </Animation>
      <Animation animationType="fade-up">
        <SeriesList />
      </Animation>
      <Animation animationType="fade-up">
        <CartoonList />
      </Animation>
      <Animation animationType="fade-up">
        <TvshowList />
      </Animation>
      <Footer />
    </div>
  );
}

export default Home;
