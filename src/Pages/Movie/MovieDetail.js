import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquareShareNodes,
  FaSquareReddit,
} from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import VideoPlayer from "../../Components/VideoPlayer";

function Movie() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [videoPlayerKey, setVideoPlayerKey] = useState(0);
  const [movieLoaded, setMovieLoaded] = useState(false); // New state to track movie loading

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
          setMovieLoaded(true); // Set movieLoaded to true after movie is set

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
      // Only fetch recommend movies if movieLoaded is true
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
            const limitedMovies = res.data.data.items.slice(0, 5);
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

  useEffect(() => {
    // Increment key to force remount VideoPlayer
    setVideoPlayerKey((prevKey) => prevKey + 1);
  }, [episodes]); // Re-render VideoPlayer when episodes change

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {loading && <div className="flex-grow">Loading...</div>}
      {error && <div className="flex-grow">{error}</div>}
      {!loading && !error && movie && (
        <div className="mt-3 md:mt-6 flex flex-col md:flex-row">
          <div className="w-full md:w-3/12 px-2 md:ml-6 md:px-0">
            <img src={movie.poster_url} alt={movie.name} className="w-full" />
            <div className="mt-3 line-clamp-1 text-xl font-semibold">
              {movie.name}
            </div>
            <div className="text-light-text mt-1">
              Cập nhập: {movie.modified.time.slice(0, 10)}
            </div>
            <div className="text-light-text mt-1">Thời lượng: {movie.time}</div>
            <div className="w-full h-[76px] my-4 bg-medium-blue flex justify-around items-center text-light-text">
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
            <div className="line-clamp-6 text-light-text">{movie.content}</div>
            <hr className="my-6 bg-gray-400 opacity-[0.2]" />
            <div className="grid grid-cols-2">
              <div className="text-light-text">Thể loại:</div>
              <div className="text-light-text">
                {movie.category.map((category) => (
                  <span key={category.id}>{category.name}, </span>
                ))}
              </div>
              <div className="text-light-text">Trạng thái:</div>
              <div className="text-light-text">{movie.status}</div>
              <div className="text-light-text">Năm:</div>
              <div className="text-light-text">{movie.year}</div>
              <div className="text-light-text">Đạo diễn:</div>
              <div className="text-light-text">{movie.director}</div>
              <div className="text-light-text ">Diễn viên:</div>
              <div className="text-light-text line-clamp-6">{movie.actor}</div>
            </div>
            <hr className="my-6 bg-gray-400 opacity-[0.2]" />
            <div className="mt-6 flex justify-center text-4xl">
              <i className="mr-2 text-[#4165af]">
                <FaSquareFacebook />
              </i>
              <i className="mr-2 text-white">
                <FaSquareXTwitter />
              </i>
              <i className="mr-2 text-[#ff4500]">
                <FaSquareReddit />
              </i>
              <i className="mr-2 text-[#0173f8]">
                <FaSquareShareNodes />
              </i>
            </div>
          </div>
          <div className="w-full md:w-9/12 md:ml-6 md:mr-8 md:px-0 mt-6 md:mt-0 px-2 md:px-0">
            <VideoPlayer
              key={videoPlayerKey}
              selectedEpisode={selectedEpisode}
            />

            {episodes.length > 1 && (
              <div className="mt-4">
                <div className="text-xl font-semibold mb-2">Các tập:</div>
                <ul className="grid grid-cols-4 gap-3 md:grid-cols-10">
                  {episodes.map((episode, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer p-4 text-center bg-medium-blue ${
                        episode === selectedEpisode
                          ? "text-blue-500"
                          : "text-gray-700"
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
              <div className="text-xl font-semibold">Gợi ý phim</div>
              <ul className="grid grid-cols-2 justify-items-center md:flex md:justify-around mt-8 md:ml-0">
                {movies.map((movie) => (
                  <li className="w-[150px] h md:h-[230px]" key={movie._id}>
                    <Link to={`/movie/${movie.slug}`}>
                      <img
                        src={`https://img.phimapi.com/${movie.poster_url}`}
                        alt={movie.name}
                        className="w-[150px] h-[210px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                      <p className="text-sm font-semibold mt-2 text-center line-clamp-2 mb-7 md:mb-0">
                        {movie.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Movie;
