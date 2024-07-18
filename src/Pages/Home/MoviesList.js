import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const type = "phim-le";

  useEffect(() => {
    axios
      .get("https://phimapi.com/v1/api/danh-sach/phim-le")
      .then((res) => {
        if (res.data.status) {
          const limitedMovies = res.data.data.items.slice(0, 8);
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
  }, []);

  console.log(movies);
  return (
    <div id="movies" className="md:px-[70px] mt-8 h-auto">
      <Link to={`/type/${type}`}>
        <div className="flex items-center opacity-[0.9] hover:opacity-100">
          <h2 className="ml-6 mr-3 text-xl font-semibold xl:ml-2">
            Phim điện ảnh
          </h2>

          <i className="text-2xl  cursor-pointer">
            <FaAnglesRight style={{ transform: "translateY(2px)" }} />
          </i>
        </div>
      </Link>
      <ul
        className="grid grid-cols-2 gap-y-10 mb-12 justify-items-center xl:flex xl:justify-around mt-8 xl:ml-0
      md:grid-cols-4 sm:grid-cols-3"
      >
        {movies.map((movie) => (
          <li
            className="w-[150px] h xl:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110"
            key={movie._id}
          >
            <Link to={`/movie/${movie.slug}`}>
              <img
                src={`https://img.phimapi.com/${movie.poster_url}`}
                alt={movie.name}
                className="w-[150px] h-[210px] object-cover"
              />
              <div className="absolute bottom-0 leading-[42px]  w-full h-[42px] bg-black bg-opacity-70 text-sm font-semibold mt-2 text-center line-clamp-1 xl:mb-0">
                {movie.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <hr className="xl:mt-12 bg-gray-400 opacity-[0.2]" />
    </div>
  );
}

export default MoviesList;
