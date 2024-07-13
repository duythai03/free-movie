import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartoonList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://phimapi.com/v1/api/danh-sach/hoat-hinh")
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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(movies);
  return (
    <div className="md:px-[70px] mt-8 h-auto">
      <h2 className="ml-6 text-xl font-semibold md:ml-2">Phim hoạt hình</h2>
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
      <hr className="md:mt-12 bg-gray-400 opacity-[0.2]" />
    </div>
  );
}

export default CartoonList;
