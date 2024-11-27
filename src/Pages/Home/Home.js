import React from "react";
import Slider from "./Slider";
import RecentMoviesList from "./RecentMoviesList";
import MoviesList from "./MoviesList";
import SeriesList from "./SeriesList";
import CartoonList from "./CartoonList";
import TvshowList from "./TvshowList";
import Animation from "../../Components/Animation";

function Home() {
  return (
    <div className="">
      <Slider />
      <Animation animationType="fade-right">
        <RecentMoviesList />
      </Animation>
      <Animation animationType="fade-right">
        <MoviesList />
      </Animation>
      <Animation animationType="fade-right">
        <SeriesList />
      </Animation>
      <Animation animationType="fade-right">
        <CartoonList />
      </Animation>
      <Animation animationType="fade-right">
        <TvshowList />
      </Animation>
    </div>
  );
}

export default Home;
