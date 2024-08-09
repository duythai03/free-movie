import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaBars } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/userSlice";
import * as UserService from "../service/UserService";
import { ThemeContext } from "../Context/ThemeContext";

function Menu() {
  const Navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await UserService.logoutUser();
      dispatch(resetUser());
      localStorage.removeItem("access_token");
      Navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  console.log("user", user);
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      {/* Menu Icon for mobile */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl p-2">
          <FaBars />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50 block p-2 text-black font-medium">
            {!user.email ? (
              <Link
                to="/login"
                className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200"
              >
                Đăng nhập/Đăng ký
              </Link>
            ) : (
              <>
                <Link
                  to="/profile-user"
                  className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Thông tin người dùng
                </Link>
                <Link
                  to="/fav-movies"
                  className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200"
                >
                  Danh sách yêu thích
                </Link>
                <Link
                  to="/movie-history"
                  className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200"
                >
                  Lịch sử xem phim
                </Link>
                <div
                  onClick={handleLogout}
                  className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200"
                >
                  Đăng xuất
                </div>
              </>
            )}
            <div className="p-2 border-b border-gray-200 hover:text-teal-500">
              <Link to="/type/tv-shows">Tv show</Link>
            </div>
            <div className="p-2 border-b border-gray-200 hover:text-teal-500">
              <Link to="/type/phim-le">Phim điện ảnh</Link>
            </div>
            <div className="p-2 border-b border-gray-200 hover:text-teal-500">
              <Link to="/type/phim-bo">Phim bộ</Link>
            </div>
            <div className="p-2 hover:text-teal-500">
              <Link to="/type/hoat-hinh">Hoạt hình</Link>
            </div>
          </div>
        )}
      </div>

      {/* Menu for desktop */}
      <div className="hidden md:block">
        {!user.email ? (
          <Link to="/login" className="cursor-pointer font-semibold">
            Đăng nhập/Đăng ký
          </Link>
        ) : (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className={`btn m-1 text-white border-0 hover:bg-mainBlue text-base p-0 bg-transparent hover:bg-transparent ${
                theme === "tolight"
                  ? ""
                  : "!text-teal-700 !border !border-gray-300 px-4 rounded-lg"
              }`}
            >
              {user.name} <FaCaretDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-[1] w-72 p-2 bg-white text-teal-700 text-lg font-medium shadow-lg"
            >
              <li>
                <Link
                  to="/profile-user"
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  Thông tin người dùng
                </Link>
              </li>
              <li>
                <Link
                  to="/fav-movies"
                  className="block hover:bg-gray-100 border-b border-gray-200"
                >
                  Danh sách yêu thích
                </Link>
              </li>
              <li>
                <Link
                  to="/movie-history"
                  className="block hover:bg-gray-100 border-b border-gray-200"
                >
                  Lịch sử xem phim
                </Link>
              </li>
              <li>
                <div className="hover:bg-gray-100" onClick={handleLogout}>
                  Đăng xuất
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
