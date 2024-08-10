import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaBars } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/userSlice";
import * as UserService from "../service/UserService";
import { ThemeContext } from "../Context/ThemeContext";
import { FaAngleRight } from "react-icons/fa6";

function Menu() {
  const Navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [genreOpen, setGenreOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
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
            <div className="p-2 border-b border-gray-200">
              <div
                onClick={() => setGenreOpen(!genreOpen)}
                className="flex justify-between items-center cursor-pointer hover:text-teal-500"
              >
                Thể loại{" "}
                <FaAngleRight
                  className={`transition-transform ${
                    genreOpen ? "rotate-90" : ""
                  }`}
                />
              </div>
              {genreOpen && (
                <div className="ml-4">
                  <Link
                    to="/type-filter/tinh-cam"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Kinh Dị
                  </Link>
                  <Link
                    to="/type-filter/tinh-cam"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Hành Động
                  </Link>
                  <Link
                    to="/type-filter/tinh-cam"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Tình Cảm
                  </Link>
                  <Link
                    to="/type-filter/am-nhac"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Âm Nhạc
                  </Link>
                  <Link
                    to="/type-filter/vo-thuat"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Võ Thuật
                  </Link>
                  <Link
                    to="/type-filter/chinh-kich"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Chính Kịch
                  </Link>
                  <Link
                    to="/type-filter/co-trang"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Cổ Trang
                  </Link>
                  <Link
                    to="/type-filter/tai-lieu"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Tài Liệu
                  </Link>
                  <Link
                    to="/type-filter/tam-ly"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Tâm Lý
                  </Link>
                  <Link
                    to="/type-filter/gia-dinh"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Gia Đình
                  </Link>
                  <Link
                    to="/type-filter/khoa-hoc"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Khoa Học
                  </Link>
                  <Link
                    to="/type-filter/bi-an"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Bí Ẩn
                  </Link>
                  <Link
                    to="/type-filter/chien-tranh"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Chiến Tranh
                  </Link>
                  <Link
                    to="/type-filter/hai-huoc"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Hài Hước
                  </Link>
                  <Link
                    to="/type-filter/the-thao"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Thể Thao
                  </Link>
                  <Link
                    to="/type-filter/phieu-luu"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Phiêu Lưu
                  </Link>
                  <Link
                    to="/type-filter/hinh-su"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Hình Sự
                  </Link>
                  <Link
                    to="/type-filter/vien-tuong"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Viễn Tưởng
                  </Link>
                  <Link
                    to="/type-filter/phim-18"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Phim 18+
                  </Link>
                </div>
              )}
            </div>
            <div className="p-2 border-b border-gray-200">
              <div
                onClick={() => setCountryOpen(!countryOpen)}
                className="flex justify-between items-center cursor-pointer hover:text-teal-500"
              >
                Quốc gia{" "}
                <FaAngleRight
                  className={`transition-transform ${
                    countryOpen ? "rotate-90" : ""
                  }`}
                />
              </div>
              {countryOpen && (
                <div className="ml-4">
                  <Link
                    to="/country-filter/viet-nam"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Việt Nam
                  </Link>
                  <Link
                    to="/country-filter/au-my"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Âu Mỹ
                  </Link>
                  <Link
                    to="/country-filter/trung-quoc"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Trung Quốc
                  </Link>
                  <Link
                    to="/country-filter/dai-loan"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Đài Loan
                  </Link>
                  <Link
                    to="/country-filter/thai-lan"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Thái Lan
                  </Link>
                  <Link
                    to="/country-filter/an-do"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Ấn Độ
                  </Link>
                  <Link
                    to="/country-filter/anh"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Anh
                  </Link>
                  <Link
                    to="/country-filter/hong-kong"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Hồng Kông
                  </Link>
                  <Link
                    to="/country-filter/han-quoc"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Hàn Quốc
                  </Link>
                  <Link
                    to="/country-filter/nhat-ban"
                    className="block p-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Nhật Bản
                  </Link>
                </div>
              )}
            </div>
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
