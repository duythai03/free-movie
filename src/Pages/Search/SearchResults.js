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
        <p>Không tìm thấy kết quả</p>
      )}
      {!loading && !error && results.length > 0 && (
        <div className="px-2 md:mb-16 md:px-[70px]">
          <div className="text-xl font-bold mt-4 ml-3 md:ml-[60px]">
            Kết quả tìm kiếm của {search_query}
          </div>
          <ul className="grid grid-cols-2 gap-y-2 md:gap-y-16 md:grid-cols-5 justify-items-center mt-8 md:ml-0">
            {results.map((movie) => (
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

export default SearchResults;
