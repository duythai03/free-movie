import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import LoadingGif from "../../assets/loading.gif";
import { ThemeContext } from "../../Context/ThemeContext";

function CountryFilter() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { country_filter } = useParams();
  const moviesContainerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Reset currentPage to 1 whenever country_filter changes
    setCurrentPage(1);
  }, [country_filter]);

  useEffect(() => {
    axios
      .get(
        `https://phimapi.com/v1/api/quoc-gia/${country_filter}?page=${currentPage}&limit=18`
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
  }, [currentPage, country_filter]);

  useEffect(() => {
    if (moviesContainerRef.current) {
      moviesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  let type;
  switch (country_filter) {
    case "viet-nam":
      type = "Việt Nam";
      break;
    case "trung-quoc":
      type = "Trung Quốc";
      break;
    case "au-my":
      type = "Âu Mỹ";
      break;
    case "dai-loan":
      type = "Đài Loan";
      break;
    case "thai-lan":
      type = "Thái Lan";
      break;
    case "an-do":
      type = "Ấn Độ";
      break;
    case "anh":
      type = "Anh";
      break;
    case "hong-kong":
      type = "Hồng Kông";
      break;
    case "han-quoc":
      type = "Hàn Quốc";
      break;
    case "nhat-ban":
      type = "Nhật Bản";
      break;
    default:
      type = "Quốc gia khác";
      break;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
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
            className={`text-xl font-semibold mt-4 ml-3 xl:ml-[40px]
          ${theme === "tolight" ? "" : "text-black-text"}
          `}
            ref={moviesContainerRef}
          >
            Danh sách phim {type} - Trang {currentPage}
          </div>
          <ul className="grid grid-cols-2 gap-y-9 xl:gap-y-16 xl:grid-cols-6 justify-items-center mt-8 xl:ml-0 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
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
    </div>
  );
}

export default CountryFilter;
