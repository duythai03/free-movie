import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import HorizonLine from "../../Components/HorizonLine";
import { ThemeContext } from "../../Context/ThemeContext";

function CartoonList() {
  const [movies, setMovies] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("https://phimapi.com/v1/api/danh-sach/hoat-hinh")
      .then((res) => {
        if (res.data.status) {
          const limitedMovies = res.data.data.items.slice(0, 8);
          setMovies(limitedMovies);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="cartoons" className="md:px-[70px] mt-8 h-auto">
      <Link to={`/type/hoat-hinh`}>
        <div
          className={`flex items-center opacity-[0.9] hover:opacity-100 ${
            theme === "tolight"
              ? ""
              : "text-teal-900 opacity-100 hover:opacity-80"
          }`}
        >
          <h2 className="ml-6 mr-3 text-xl font-semibold xl:ml-2">
            Phim hoạt hình
          </h2>

          <i className="text-2xl  cursor-pointer">
            <FaAnglesRight style={{ transform: "translateY(2px)" }} />
          </i>
        </div>
      </Link>
      <ul
        className="grid grid-cols-2 gap-y-10 mb-12 justify-items-center xl:flex xl:justify-around mt-8 xl:ml-0
      md:grid-cols-4 sm:grid-cols-3"
      >
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
              <div className="absolute bottom-0 leading-[42px]  w-full h-[42px] bg-black text-white bg-opacity-70 text-sm font-semibold mt-2 text-center line-clamp-1 xl:mb-0">
                {movie.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <HorizonLine />
    </div>
  );
}

export default CartoonList;
