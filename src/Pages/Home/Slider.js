import React from "react";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Slider() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1")
      .then((res) => {
        if (res.data.status) {
          const limitedMovies = res.data.items.slice(0, 7);
          setMovies(limitedMovies);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ulRef = useRef(null);
  const liRef = useRef(null);
  const [, setCurrent] = useState(0);
  const totalItem = movies.length;
  const leftBtnRef = useRef();
  const rightBtnRef = useRef();
  const intervalRef = useRef(null);

  const startInterval = useCallback(() => {
    const ulElement = ulRef.current;
    if (!ulElement || totalItem === 0) return;

    const width = liRef.current.clientWidth;

    intervalRef.current = setInterval(() => {
      setCurrent((prevCurrent) => {
        const newCurrent = (prevCurrent + 1) % totalItem;
        ulElement.style.transform = `translateX(-${newCurrent * width}px)`;
        return newCurrent;
      });
    }, 5000);
  }, [totalItem]);

  const handleNextSLide = () => {
    clearInterval(intervalRef.current);
    const ulElement = ulRef.current;
    if (!ulElement || totalItem === 0) return;

    const width = liRef.current.clientWidth;

    setCurrent((prevCurrent) => {
      const newCurrent = (prevCurrent + 1) % totalItem;
      ulElement.style.transform = `translateX(-${newCurrent * width}px)`;
      return newCurrent;
    });
    startInterval();
  };

  const handlePrevSlide = () => {
    clearInterval(intervalRef.current);
    const ulElement = ulRef.current;
    if (!ulElement || totalItem === 0) return;

    const width = liRef.current.clientWidth;

    setCurrent((prevCurrent) => {
      if (prevCurrent === 0) {
        const newCurrent = totalItem - 1;
        ulElement.style.transform = `translateX(-${newCurrent * width}px)`;
        return newCurrent;
      } else {
        const newCurrent = (prevCurrent - 1 + totalItem) % totalItem;
        ulElement.style.transform = `translateX(-${newCurrent * width}px)`;
        return newCurrent;
      }
    });
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  return (
    <div className="w-full overflow-hidden relative text-white">
      <i
        className="absolute top-[220px] md:top-[260px] left-[16px] md:left-[24px] text-5xl z-10 opacity-40 hover:opacity-100 cursor-pointer"
        ref={leftBtnRef}
        onClick={handlePrevSlide}
      >
        <FaAngleLeft />
      </i>
      <i
        className="absolute top-[220px] md:top-[260px] right-[16px] md:right-[24px] text-5xl z-10 opacity-40 hover:opacity-100 cursor-pointer"
        ref={rightBtnRef}
        onClick={handleNextSLide}
      >
        <FaAngleRight />
      </i>
      <ul className="flex transition-transform duration-500" ref={ulRef}>
        {movies.map((movie) => {
          const imdb = movie.imdb || null;
          const tmdb = movie.tmdb || null;
          const useImdb = imdb && imdb.id != null && Number(imdb.vote_average || 0) !== 0 && Number(imdb.vote_count || 0) !== 0;
          const voteAverage = useImdb
            ? (imdb.vote_average ?? null)
            : (tmdb && tmdb.vote_average !== undefined ? tmdb.vote_average : null);
          const voteCount = useImdb
            ? (imdb.vote_count ?? null)
            : (tmdb && tmdb.vote_count !== undefined ? tmdb.vote_count : null);

          return (
            <li
              key={movie._id}
              className="relative flex-shrink-0 w-full"
              ref={liRef}
            >
              <img
                src={movie.thumb_url || (movie.poster_url ? `https://img.phimapi.com/${movie.poster_url}` : "")}
                alt={movie.name}
                className="w-full h-[500px] md:h-[600px] object-cover brightness-50"
              />
              <div className="absolute top-[180px] left-[70px] md:left-[110px] flex flex-col">
                <div className=" flex flex-row items-center font-bold text-2xl">
                  <span className="mr-2 md:mr-4">{(tmdb && tmdb.type ? tmdb.type.toUpperCase() : (movie.type ? movie.type.toUpperCase() : "HD"))}</span>
                  <span className="mr-4">{movie.year || "--"}</span>
                  {movie.time && <span className="ml-2 text-sm font-normal">{movie.time}</span>}
                  {tmdb && tmdb.season && (
                    <span className="ml-3 text-sm font-normal">S{tmdb.season}</span>
                  )}
                  {voteAverage !== null && voteAverage !== undefined && (
                    <span className="ml-3 text-sm font-normal">★ {voteAverage}{voteCount != null ? ` (${voteCount})` : ""}</span>
                  )}
                </div>
                <div className="font-bold text-[30px] md:text-[50px]">
                  {movie.name}
                </div>
                <div className="text-sm mt-2 line-clamp-2">{movie.content || movie.description || `Phim: ${movie.name}`}</div>
                <div className="text-sm flex flex-row mt-2 gap-4">
                  {movie.status && <div className="mr-4">{movie.status}</div>}
                </div>
                <div className="mt-6 w-[200px] h-[50px] bg-gray-200 hover:bg-white border rounded-3xl flex justify-center items-center text-dark-blue text-xl font-semibold cursor-pointer">
                  <Link to={`/movie/${movie.slug}`}>Xem ngay</Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Slider;
