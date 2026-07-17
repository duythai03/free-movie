import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingGif from "../../assets/loading.gif";
import { ThemeContext } from "../../Context/ThemeContext";
import HoverCard from "../../Components/HoverCard";

function SearchResults() {
  const { search_query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    axios
      .get(`https://phimapi.com/v1/api/tim-kiem?keyword=${search_query}`)
      .then((res) => {
        if (res.data.status) {
          setResults(
            Array.isArray(res.data.data?.items) ? res.data.data.items : []
          );
        } else {
          setError("Tìm kiếm thất bại");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Tìm kiếm thất bại");
        setLoading(false);
      });
  }, [search_query]);

  const [hoverMovie, setHoverMovie] = useState(null);
  const [hoverPos, setHoverPos] = useState({ top: 0, left: 0 });

  const handleEnter = (e, movie) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPos({ top: rect.top - 24, left: rect.right + 8 });
    setHoverMovie(movie);
  };

  const handleLeave = () => {
    setHoverMovie(null);
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
      {!error && <p>{!error}</p>}
      {!loading && !error && results.length === 0 && (
        <div className="flex-grow flex justify-center items-center">
          <p
            className={`text-xl font-semibold mt-4 ml-3 xl:ml-[40px]
          ${theme === "tolight" ? "" : "text-black-text"}
          `}
          >
            Không tìm thấy kết quả
          </p>
        </div>
      )}
      {!loading && !error && results.length > 0 && (
        <div className="px-2 md:mb-16 md:px-[70px]">
          <div
            className={`text-xl font-semibold mt-4 ml-3 xl:ml-[40px]
          ${theme === "tolight" ? "" : "text-black-text"}
          `}
          >
            Kết quả tìm kiếm "{search_query}"
          </div>
          <ul className="grid grid-cols-2 gap-y-9 xl:gap-y-16 xl:grid-cols-6 justify-items-center mt-8 xl:ml-0 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {results.map((movie) => (
              <li
                className="group w-[150px] xl:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110"
                key={movie._id}
                onMouseEnter={(e) => handleEnter(e, movie)}
                onMouseLeave={handleLeave}
              >
                <Link to={`/movie/${movie.slug}`}>
                  <img
                    src={`${movie.poster_url}`}
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
          {hoverMovie && (
            <div
              onMouseEnter={() => setHoverMovie(hoverMovie)}
              onMouseLeave={handleLeave}
              style={{ position: "fixed", top: hoverPos.top, left: hoverPos.left, zIndex: 9999 }}
            >
              <HoverCard movie={hoverMovie} theme={theme} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
