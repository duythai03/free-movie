import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import LoadingGif from "../../assets/loading.gif";

function RecentMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const moviesContainerRef = useRef(null);
  useEffect(() => {
    axios
      .get(
        `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${currentPage}`
      )
      .then((res) => {
        if (res.data.status) {
          setMovies(res.data.items);
          setTotalPages(res.data.pagination.totalPages);
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

  useEffect(() => {
    if (moviesContainerRef.current) {
      moviesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

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
      {console.log(movies)}
      {!loading && !error && movies && (
        <div className="px-2 md:px-[70px]" ref={moviesContainerRef}>
          <div className="text-xl font-bold mt-4 ml-3 md:ml-[60px]">
            Danh sách phim mới - Trang {currentPage}
          </div>
          <ul className="grid grid-cols-2 gap-y-2 md:gap-y-16 md:grid-cols-5 justify-items-center mt-8 md:ml-0">
            {movies.map((movie) => (
              <li className="w-[150px] h md:h-[230px]" key={movie._id}>
                <Link to={`/movie/${movie.slug}`}>
                  <img
                    src={movie.poster_url}
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

export default RecentMovies;