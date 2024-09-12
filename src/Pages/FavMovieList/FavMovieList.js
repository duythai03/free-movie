import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import * as FavMovieService from "../../service/FavMovieService";
import {
  setFavMovies,
  setCurrentPage,
  removeFavMovie,
} from "../../redux/slices/favMovieSlice";
import { ToastContainer, toast } from "react-toastify";
import LoadingGif from "../../assets/loading.gif";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../Context/ThemeContext";
import Pagination from "../../Components/Pagination";

function FavMovieList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favMovies = useSelector((state) => state.favMovies.movies);
  const currentPage = useSelector((state) => state.favMovies.currentPage);
  const totalPages = useSelector((state) => state.favMovies.totalPage);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Để lưu trữ ID của phim muốn xóa

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await FavMovieService.getAllMovies(
          user.access_token,
          currentPage
        );
        dispatch(setFavMovies(response));
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

  const handleModal = (movieId) => {
    setSelectedMovieId(movieId);
    setModal(!isModalOpen);
  };

  const handleDeleteMovie = async () => {
    try {
      await FavMovieService.deleteMovie(user.access_token, selectedMovieId);
      dispatch(removeFavMovie(selectedMovieId));
      toast.success("Đã xóa phim khỏi danh sách yêu thích!");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa phim khỏi danh sách yêu thích!");
    } finally {
      setModal(false); // Đóng modal sau khi xóa phim
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Header />
      {isLoading && (
        <div className="flex-grow flex justify-center items-center">
          <img
            src={LoadingGif}
            alt="Loading..."
            className="w-[100px] h-[100px]"
          />
        </div>
      )}
      {!isLoading && favMovies.length === 0 && (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-xl font-semibold">
            Bạn chưa thêm phim nào vào danh sách yêu thích
          </p>
        </div>
      )}
      {!isLoading && favMovies.length > 0 && (
        <div className="px-2 md:px-[70px]">
          <div
            className={`text-xl font-semibold mt-4 ml-3 xl:ml-[40px]
            ${theme === "tolight" ? "" : "text-black-text"}
            `}
          >
            Danh sách phim yêu thích - Trang {currentPage}
          </div>
          <ul className="grid grid-cols-2 gap-y-9 xl:gap-y-16 xl:grid-cols-6 justify-items-center mt-8 xl:ml-0 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {favMovies.map((movie) => (
              <li
                className={`w-[150px] xl:h-[210px] items-center relative transition-transform duration-300 ease-in-out hover:scale-110 
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
                <button
                  className="absolute right-0 top-0 p-2 bg-gray-700 opacity-80"
                  onClick={() => handleModal(movie._id)}
                >
                  Xóa
                </button>
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
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg text-gray-700">
            <p className="text-xl font-semibold">
              Bạn có chắc muốn xóa phim khỏi danh sách yêu thích?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="text-base rounded-lg border border-gray-500 p-2 font-semibold"
                onClick={() => setModal(false)}
              >
                Hủy
              </button>
              <button
                className="text-base rounded-lg bg-red-500 text-white p-2 font-semibold ml-4"
                onClick={handleDeleteMovie}
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

export default FavMovieList;
