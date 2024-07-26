import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeContext";
import {
  FaStar,
  FaSquareFacebook,
  FaSquareShareNodes,
  FaSquareReddit,
} from "react-icons/fa6";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import LoadingGif from "../../assets/loading.gif";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

function Movie() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [movieLoaded, setMovieLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`https://phimapi.com/phim/${slug}`)
      .then((res) => {
        if (res.data.status) {
          setMovie(res.data.movie);
          const allServerData = res.data.episodes
            .map((ep) => ep.server_data)
            .flat();
          setEpisodes(allServerData);
          setSelectedEpisode(allServerData[0]);
          setMovieLoaded(true);
          console.log(res.data.movie);
          console.log(allServerData);
        } else {
          setError("Phim sẽ được cập nhập sớm nhất");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Phim sẽ được cập nhập sớm nhất");
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (movieLoaded) {
      let type = "phim-moi-cap-nhat";
      if (movie && movie.type === "hoathinh") {
        type = "hoat-hinh";
      } else if (movie && movie.type === "single") {
        type = "phim-le";
      } else if (movie && movie.type === "series") {
        type = "phim-bo";
      } else if (movie && movie.type === "tvshows") {
        type = "tv-shows";
      } else {
        type = "phim-moi-cap-nhat";
      }
      axios
        .get(`https://phimapi.com/v1/api/danh-sach/${type}`)
        .then((res) => {
          if (res.data.status) {
            const limitedMovies = res.data.data.items.slice(0, 6);
            setMovies(limitedMovies);
          } else {
            setError("Failed to fetch movies");
          }
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching data");
          setLoading(false);
        });
    }
  }, [movieLoaded, movie]);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v20.0&appId=367660879695093";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.nonce = "Iv8Zus5H";
    script.onload = () => {
      if (window.FB) {
        window.FB.init({
          appId: "367660879695093",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v20.0",
        });
        window.FB.XFBML.parse();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [movie]);

  return (
    <div className="min-h-screen flex flex-col">
      <div id="fb-root"></div>
      <Header />
      {loading && (
        <div className="flex-grow flex justify-center items-center">
          <img
            src={LoadingGif}
            alt="Loading..."
            className="w-[100px] h-[100px]"
          />
        </div>
      )}
      {error && <div className="flex-grow">{error}</div>}
      {!loading && !error && movie && (
        <div className="my-3 md:mt-6 flex flex-col md:flex-row">
          <div
            className={`w-full md:w-3/12 px-2 md:ml-6 md:px-0 ${
              theme === "tolight"
                ? "text-light-text"
                : "bg-white shadow-bigFull text-gray-900"
            }`}
          >
            <img src={movie.poster_url} alt={movie.name} className="w-full" />
            <div className={`${theme === "tolight" ? "" : "p-2"}`}>
              <div
                className={`mt-3 line-clamp-1 text-2xl font-semibold
              ${theme === "tolight" ? "text-white" : ""}
              `}
              >
                {movie.name}
              </div>
              <div className="">
                <div className=" mt-1">
                  Cập nhập: {movie.modified.time.slice(0, 10)}
                </div>
                <div className=" mt-1">Thời lượng: {movie.time}</div>
                <div
                  className={`w-full h-[76px] my-4 bg-medium-blue flex justify-around items-center 
                ${theme === "tolight" ? "" : "bg-custom-gray"}
                `}
                >
                  <div className="flex text-2xl">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <div className="text-xl">../10</div>
                  <div className="text-xl">(no review)</div>
                </div>
                <div className="line-clamp-12  text-sm text-justify">
                  {movie.content}
                </div>
                <hr
                  className={`my-6 border-0 h-[1px] bg-gray-400 opacity-[0.2] ${
                    theme === "tolight" ? "" : "opacity-80"
                  }`}
                />
                <div className="grid grid-cols-2">
                  <div className="">Tên đầy đủ:</div>
                  <div className="">{movie.name}</div>
                  <div className="">Thể loại:</div>
                  <div className="">
                    {movie.category.map((category) => (
                      <span key={category.id}>{category.name}, </span>
                    ))}
                  </div>
                  <div className="">Trạng thái:</div>
                  <div className="">{movie.status}</div>
                  <div className="">Năm:</div>
                  <div className="">{movie.year}</div>
                  <div className="">Đạo diễn:</div>
                  <div className="">{movie.director}</div>
                  <div className=" ">Diễn viên:</div>
                  <div className=" line-clamp-6">{movie.actor}</div>
                </div>
                <hr
                  className={`my-6 border-0 h-[1px] bg-gray-400 opacity-[0.2] ${
                    theme === "tolight" ? "" : "opacity-80"
                  }`}
                />
                <div className="mt-6 flex justify-center text-4xl">
                  <i className="mr-2 text-[#4165af]">
                    <FaSquareFacebook />
                  </i>
                  <i className="mr-2 text-[#ff4500]">
                    <FaSquareReddit />
                  </i>
                  <i className="mr-2 text-[#0173f8]">
                    <FaSquareShareNodes />
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full md:w-9/12 md:ml-6 md:mr-8 md:px-0 mt-6 md:mt-0 px-2 
            ${
              theme === "tolight" ? "" : "bg-white shadow-bigFull text-gray-900"
            }
          `}
          >
            <MediaPlayer
              src={selectedEpisode.link_m3u8}
              viewType="video"
              streamType="on-demand"
              logLevel="warn"
              crossOrigin
              playsInline
              title={movie.name}
              poster={movie.poster_url}
              className="mt-2 sm:mt-0"
            >
              <MediaProvider>
                <Poster className="vds-poster" />
              </MediaProvider>
              <DefaultVideoLayout
                thumbnails={movie.thumb_url}
                icons={defaultLayoutIcons}
              />
            </MediaPlayer>

            <div className={`${theme === "tolight" ? "" : "p-4"}`}>
              {episodes.length > 1 && (
                <div className="mt-4">
                  <div className="text-xl font-semibold mb-2">Các tập:</div>
                  <ul
                    className={`${
                      episodes.length > 30
                        ? "h-96 overflow-y-scroll scrollbar-hide"
                        : ""
                    } grid grid-cols-4 gap-3 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4`}
                  >
                    {episodes.map((episode, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer p-4 flex justify-center items-center text-center bg-medium-blue ${
                          episode === selectedEpisode
                            ? "text-blue-500"
                            : "text-[#d3d3d3]"
                        }`}
                        onClick={() => handleEpisodeClick(episode)}
                      >
                        Tập {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12">
                <div className="text-xl font-semibold">Có thể bạn sẽ thích</div>
                <ul className="grid grid-cols-2 gap-y-9 justify-items-center xl:flex xl:justify-around mt-8 xl:ml-0 sm:grid-cols-3">
                  {movies.map((movie) => (
                    <li
                      className={`w-[150px] xl:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110 
                        ${theme === "tolight" ? "" : "shadow-bigFull"}
                      `}
                      key={movie._id}
                    >
                      <Link to={`/movie/${movie.slug}`}>
                        <img
                          src={`https://img.phimapi.com/${movie.poster_url}`}
                          alt={movie.name}
                          className="w-[150px] h-[210px] object-cover"
                        />
                        <p
                          className={`absolute bottom-0 leading-[42px]  w-full h-[42px] bg-black bg-opacity-70 text-sm font-semibold mt-2 text-center line-clamp-1 xl:mb-0
                        ${theme === "tolight" ? "" : "text-white"}
                        `}
                        >
                          {movie.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 text-xl font-semibold">Bình luận phim</div>
              <div className="bg-white mt-4 w-full">
                <div
                  className="fb-comments"
                  data-href={`https://duythai03.github.io/free-movie/#/movie/${movie.slug}`}
                  data-width="100%"
                  data-mobile="autp"
                  data-numposts="5"
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Movie;
