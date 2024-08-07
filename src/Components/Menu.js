import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaBars } from "react-icons/fa6";

function Menu() {
  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLogin(false);
    setMenuOpen(false);
  };

  return (
    <div>
      {/* Menu Icon for mobile */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl p-2">
          <FaBars />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-10 block p-2 text-black font-medium hover:bg-gray-100">
            {!isLogin ? (
              <div
                // onClick={() => {
                //   setIsLogin(true);
                //   setMenuOpen(false);
                // }}
                className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200"
              >
                Đăng nhập/Đăng ký
              </div>
            ) : (
              <>
                <Link
                  to="/profile-user"
                  className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Thông tin người dùng
                </Link>
                <div className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200">
                  Danh sách yêu thích
                </div>
                <div className="block p-2 text-black hover:bg-gray-100 border-b border-gray-200">
                  Lịch sử xem phim
                </div>
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
        {!isLogin ? (
          <div
            // onClick={() => {
            //   setIsLogin(true);
            // }}
            className="cursor-pointer font-semibold"
          >
            Đăng nhập/Đăng ký
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-mainBlue text-white border-0 hover:bg-mainBlue text-2xl p-0 bg-transparent hover:bg-transparent"
            >
              Username <FaCaretDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-[1] w-72 p-2 bg-white text-black text-xl shadow-lg"
            >
              <li>
                <Link to="/profile-user" className="hover:text-mainBlue">
                  Thông tin người dùng
                </Link>
              </li>
              <li>
                <div className="hover:text-mainBlue" onClick={handleLogout}>
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
