import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import loadingGif from "../../assets/loading.gif";

function Slider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1")
      .then((res) => {
        if (res.data.status) {
          const limitedMovies = res.data.items.slice(0, 6);
          setMovies(limitedMovies);
        } else {
          setError("Failed to fetch movies");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  const ulRef = useRef(null);
  const liRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const totalItem = movies.length;
  const leftBtnRef = useRef();
  const rightBtnRef = useRef();
  const intervalRef = useRef(null);

  const startInterval = () => {
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
  };

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
  }, [totalItem]);

  return (
    <div className="w-full overflow-hidden relative">
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
        {movies.map((movie) => (
          <li
            key={movie._id}
            className="relative flex-shrink-0 w-full"
            ref={liRef}
          >
            <img
              src={movie.thumb_url}
              alt={movie.name}
              className="w-full h-[500px] md:h-[600px] object-cover brightness-50"
            />
            <div className="absolute top-[180px] left-[70px] md:left-[110px] flex flex-col">
              <div className=" flex flex-row font-bold text-2xl">
                <span className="mr-2 md:mr-4">HD</span>
                <span className="mr-4">{movie.year}</span>
              </div>
              <div className="font-bold text-[30px] md:text-[50px]">
                {movie.name}
              </div>
              <div className="text-sm">Phim mới đề xuất: {movie.name}</div>
              <div className="text-sm flex flex-row mt-2">
                <div className="mr-4 ">Movie</div>
                <div className="mr-4">New</div>
              </div>
              <div className="mt-6 w-[200px] h-[50px] bg-gray-200 hover:bg-white border rounded-3xl flex justify-center items-center text-dark-blue text-xl font-semibold cursor-pointer">
                <Link to={`/movie/${movie.slug}`}>Xem ngay</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Slider;
