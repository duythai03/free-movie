import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingGif from "../../assets/loading.gif";
import { ThemeContext } from "../../Context/ThemeContext";

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
          setResults(res.data.data.items);
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
      {error && <p>{error}</p>}
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
                className="w-[150px] xl:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110"
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
        </div>
      )}
    </div>
  );
}

export default SearchResults;
