import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import FavMovieList from "../Pages/FavMovieList/FavMovieList";
import MovieHistory from "../Pages/MovieHistory/MovieHistory";
import MovieDetail from "../Pages/Movie/MovieDetail";
import RecentMovies from "../Pages/MovieTypePages/RecentMovies";
import OtherMovies from "../Pages/MovieTypePages/OtherMovies";
import SearchResults from "../Pages/Search/SearchResults";
import TypeFilter from "../Pages/MovieFilterPages/TypeFilter";
import CountryFilter from "../Pages/MovieFilterPages/CountryFilter";

export const routes = [
  {
    path: "/",
    page: Home,
    showLayout: true,
  },
  {
    path: "/signup",
    page: SignUp,
    showLayout: false,
  },
  {
    path: "/login",
    page: Login,
    showLayout: false,
  },
  {
    path: "/profile-user",
    page: Profile,
    showLayout: true,
  },
  {
    path: "/fav-movies",
    page: FavMovieList,
    showLayout: true,
  },
  {
    path: "/movie-history",
    page: MovieHistory,
    showLayout: true,
  },
  {
    path: "/movie/:slug",
    page: MovieDetail,
    showLayout: true,
  },
  {
    path: "/recent-movies",
    page: RecentMovies,
    showLayout: true,
  },
  {
    path: "/type/:type_list",
    page: OtherMovies,
    showLayout: true,
  },
  {
    path: "/type-filter/:type_filter",
    page: TypeFilter,
    showLayout: true,
  },
  {
    path: "/country-filter/:country_filter",
    page: CountryFilter,
    showLayout: true,
  },
  {
    path: "/search/:search_query",
    page: SearchResults,
    showLayout: true,
  },
];
