import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import { useState, useEffect } from "react";

function OtherMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type_list } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://phimapi.com/v1/api/danh-sach/${type_list}?page=${currentPage}`
      )
      .then((res) => {
        if (res.data.status) {
          setMovies(res.data.data.items);
        } else {
          setError("cập nhập thất bại");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [currentPage]);

  let type;
  switch (type_list) {
    case "phim-le":
      type = "phim lẻ";
      break;
    case "phim-bo":
      type = "phim bộ";
      break;
    case "hoat-hinh":
      type = "phim hoạt hình";
      break;
    case "tv-show":
      type = "TV Show";
      break;
    default:
      type = "phim hay";
      break;
  }

  return (
    <div className="">
      <Header />
      {loading && <div className="flex-grow">Loading...</div>}
      {error && <div className="flex-grow">{error}</div>}
      {console.log(movies)}
      {!loading && !error && movies && (
        <div className="px-2 md:px-[70px] md:mb-16">
          <div className="text-xl font-bold mt-4 ml-3 md:ml-[60px]">
            Danh sách {type}
          </div>
          <ul className="grid grid-cols-2 gap-y-2 md:gap-y-16 md:grid-cols-5 justify-items-center mt-8 md:ml-0">
            {movies.map((movie) => (
              <li className="w-[150px] h md:h-[230px]" key={movie._id}>
                <Link to={`/movie/${movie.slug}`}>
                  <img
                    src={`https://img.phimapi.com/${movie.poster_url}`}
                    alt={movie.name}
                    className="w-[150px] h-[210px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                  <p className="text-sm mb-7 font-semibold mt-2 text-center line-clamp-2 md:mb-0">
                    {movie.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default OtherMovies;
