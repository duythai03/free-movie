import React, { useContext, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import MovieDetail from "./Pages/Movie/MovieDetail.js";
import RecentMovies from "./Pages/MovieTypePages/RecentMovies.js";
import OtherMovies from "./Pages/MovieTypePages/OtherMovies.js";
import SearchResults from "./Pages/Search/SearchResults.js";
import { ThemeContext } from "./Context/ThemeContext";
import Login from "./Pages/Login/Login.js";
import SignUp from "./Pages/SignUp/SignUp.js";
import { isJsonString } from "./utils/isJsonString";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./service/UserService";
import { updateUser } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Profile from "./Pages/Profile/Profile.js";
import FavMovieList from "./Pages/FavMovieList/FavMovieList.js";
import MovieHistory from "./Pages/MovieHistory/MovieHistory.js";
import TypeFilter from "./Pages/MovieFilterPages/TypeFilter.js";
import CountryFilter from "./Pages/MovieFilterPages/CountryFilter.js";

function App() {
  // const dispatch = useDispatch();

  // const handleDecoded = () => {
  //   let storageData = localStorage.getItem("access_token");
  //   let user = {};
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData);
  //     user = jwtDecode(storageData);
  //   }
  //   return { user, storageData };
  // };

  // const handleGetUserDetail = useCallback(
  //   async (id, token) => {
  //     try {
  //       const res = await UserService.getUserDetail(id, token);
  //       console.log("res", res);
  //       dispatch(updateUser({ ...res.data, access_token: token }));
  //     } catch (error) {
  //       console.log("Failed to fetch user details:", error);
  //     }
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   let { user, storageData } = handleDecoded();
  //   if (user?.id) {
  //     handleGetUserDetail(user?.id, storageData);
  //   }
  // }, [handleGetUserDetail]);

  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const currentTime = new Date();
  //     let { user } = handleDecoded();
  //     if (user?.exp < currentTime.getTime() / 1000) {
  //       const data = await UserService.refreshToken();
  //       config.headers["token"] = `Bearer ${data.access_token}`;
  //     }
  //     return config;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );
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
        <Route path="/profile-user" element={<Profile />} />
        <Route path="/fav-movies" element={<FavMovieList />} />
        <Route path="/movie-history" element={<MovieHistory />} />
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/recent-movies" element={<RecentMovies />} />
        <Route path="/type/:type_list" element={<OtherMovies />} />
        <Route path="/type-filter/:type_filter" element={<TypeFilter />} />
        <Route
          path="/country-filter/:country_filter"
          element={<CountryFilter />}
        />
        <Route path="/search/:search_query" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
