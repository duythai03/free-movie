import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import LoadingGif from "../../assets/loading.gif";

function SearchResults() {
  const { search_query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      {error && <p>{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p className="ml-4">Không tìm thấy kết quả</p>
      )}
      {!loading && !error && results.length > 0 && (
        <div className="px-2 md:mb-16 md:px-[70px]">
          <div className="text-xl font-semibold mt-4 ml-3 md:ml-[60px]">
            Kết quả tìm kiếm "{search_query}"
          </div>
          <ul className="grid grid-cols-2 gap-y-9 md:gap-y-16 md:grid-cols-6 justify-items-center mt-8 md:ml-0">
            {results.map((movie) => (
              <li
                className="w-[150px] md:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110"
                key={movie._id}
              >
                <Link to={`/movie/${movie.slug}`}>
                  <img
                    src={`https://img.phimapi.com/${movie.poster_url}`}
                    alt={movie.name}
                    className="w-[150px] h-[210px] object-cover"
                  />
                  <p className="absolute bottom-0 leading-[42px]  w-full h-[42px] bg-black bg-opacity-70 text-sm font-semibold mt-2 text-center line-clamp-1 md:mb-0">
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

export default SearchResults;
