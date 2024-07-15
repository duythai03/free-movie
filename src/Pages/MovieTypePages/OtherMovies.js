import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import LoadingGif from "../../assets/loading.gif";

function OtherMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type_list } = useParams();
  const moviesContainerRef = useRef(null);

  useEffect(() => {
    // Reset currentPage to 1 whenever type_list changes
    setCurrentPage(1);
  }, [type_list]);

  useEffect(() => {
    axios
      .get(
        `https://phimapi.com/v1/api/danh-sach/${type_list}?page=${currentPage}`
      )
      .then((res) => {
        if (res.data.status) {
          setMovies(res.data.data.items);
          setTotalPages(res.data.data.params.pagination.totalPages);
        } else {
          setError("Cập nhật thất bại");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [currentPage, type_list]);

  useEffect(() => {
    if (moviesContainerRef.current) {
      moviesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    case "tv-shows":
      type = "TV Show";
      break;
    default:
      type = "phim hay";
      break;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
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
      {!loading && !error && movies && (
        <div className="px-2 md:px-[70px]">
          <div
            className="text-xl font-bold mt-4 ml-3 md:ml-[60px]"
            ref={moviesContainerRef}
          >
            Danh sách {type} - Trang {currentPage}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default OtherMovies;
