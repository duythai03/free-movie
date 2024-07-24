import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import LoadingGif from "../../assets/loading.gif";

function Film() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type_list } = useParams();
  const isFirstLoadRef = useRef(true); // useRef for isFirstLoad

  useEffect(() => {
    // Reset currentPage to 1 whenever type_list changes
    setCurrentPage(1);
  }, [type_list]);

  useEffect(() => {
    if (isFirstLoadRef.current || currentPage > 1) {
      // Scroll to top on first load from another page
      window.scrollTo(0, 0);
      isFirstLoadRef.current = false;
    }
  }, [currentPage]);

  useEffect(() => {
    axios
      .get(`https://xxvnapi.com/api/chuyen-muc/hentai?page=${currentPage}`)
      .then((res) => {
        if (res.data.status) {
          setMovies(res.data.movies);
          setTotalPages(res.data.page.total);
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
          <div className="text-xl font-semibold mt-4 ml-3 xl:ml-[40px]">
            Danh sách phim hay - Trang {currentPage}
          </div>
          <ul className="grid grid-cols-2 gap-y-9 xl:gap-y-16 xl:grid-cols-6 justify-items-center mt-8 xl:ml-0 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {movies.map((movie) => (
              <li
                className="w-[150px] xl:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110"
                key={movie.id}
              >
                <Link to={`/film/${movie.slug}`}>
                  <img
                    src={movie.thumb_url}
                    alt={movie.name}
                    className="w-[150px] h-[210px] object-cover"
                    loading="lazy"
                  />
                  <p className="absolute bottom-0 leading-[42px]  w-full h-[42px] bg-black bg-opacity-70 text-sm font-semibold mt-2 text-center line-clamp-1 xl:mb-0">
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

export default Film;
