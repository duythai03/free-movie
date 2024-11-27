import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import * as MovieHistoryService from "../../service/MovieHistoryService";
import {
  setMovies,
  setCurrentPage,
  removeHistory,
} from "../../redux/slices/movieHistorySlice";
import { ToastContainer, toast } from "react-toastify";
import LoadingGif from "../../assets/loading.gif";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../Context/ThemeContext";
import Pagination from "../../Components/Pagination";

function MovieHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const movieHistory = useSelector((state) => state.movieHistory.movies);
  const currentPage = useSelector((state) => state.movieHistory.currentPage);
  const totalPages = useSelector((state) => state.movieHistory.totalPage);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await MovieHistoryService.getAllMovies(
          user.access_token,
          currentPage
        );
        dispatch(setMovies(response));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user.access_token) {
      fetchMovies();
    }
  }, [user.access_token, currentPage, dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleRemoveHistory = async () => {
    try {
      await MovieHistoryService.removeAllMovies(user.access_token);
      dispatch(removeHistory());
      setIsModalOpen(false);
      toast.success("Lịch sử đã được xóa thành công!");
    } catch (error) {
      console.error("Error removing history:", error);
      toast.error("Đã xảy ra lỗi khi xóa lịch sử.");
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      {isLoading && (
        <div className="flex-grow flex justify-center items-center">
          <img
            src={LoadingGif}
            alt="Loading..."
            className="w-[100px] h-[100px]"
          />
        </div>
      )}
      {!isLoading && movieHistory.length === 0 && (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-xl font-semibold">Lịch sử trống</p>
        </div>
      )}
      {!isLoading && movieHistory.length > 0 && (
        <div className="px-2 md:px-[70px]">
          <div className="flex justify-between items-center mt-4">
            <div
              className={`text-xl font-semibold ml-3 xl:ml-[40px]
            ${theme === "tolight" ? "" : "text-black-text"}
            `}
            >
              Lịch sử xem phim - Trang {currentPage}
            </div>
            <button
              className={`text-sm md:text-base rounded-lg border border-gray-500 p-2 font-semibold ml-3 xl:ml-[40px]
            ${theme === "tolight" ? "" : "text-black-text"}
            `}
              onClick={handleModal}
            >
              Xóa lịch sử
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-y-9 xl:gap-y-16 xl:grid-cols-6 justify-items-center mt-8 xl:ml-0 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {movieHistory.map((movie) => (
              <li
                className={`w-[150px] xl:h-[210px] relative transition-transform duration-300 ease-in-out hover:scale-110 
                          ${theme === "tolight" ? "" : "shadow-bigFull"}
                        `}
                key={movie.slug}
              >
                <Link to={`/movie/${movie.slug}`}>
                  <img
                    src={movie.poster_url}
                    alt={movie.name}
                    className="w-[150px] h-[210px]  object-cover"
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
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg text-gray-700">
            <p className="text-xl font-semibold">
              Bạn có chắc chắn muốn xóa lịch sử?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="text-base rounded-lg border border-gray-500 p-2 font-semibold"
                onClick={handleModal}
              >
                Hủy
              </button>
              <button
                className="text-base rounded-lg bg-red-500 text-white p-2 font-semibold ml-4"
                onClick={handleRemoveHistory}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieHistory;
