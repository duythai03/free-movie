import React from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

function Header() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-[80px] px-6 flex justify-between items-center bg-gradient-to-r from-medium-blue via-light-blue to-medium-blue md:h-[100px] md:px-[70px] ">
      <ul className="flex flex-row text-xl items-center">
        <Link to="/free-movie">
          <li className="mr-9 cursor-pointer font-bold md:text-3xl">
            FREEMOVIE
          </li>
        </Link>
        <Link to="/type/tv-shows">
          <li
            className="mr-9 cursor-pointer hidden md:block"
            onClick={() => scrollToSection("tvshows")}
          >
            TV Show
          </li>
        </Link>
        <Link to="/type/phim-le">
          <li
            className="mr-9 cursor-pointer hidden md:block"
            onClick={() => scrollToSection("movies")}
          >
            Phim điện ảnh
          </li>
        </Link>
        <Link to="/type/phim-bo">
          <li
            className="mr-9 cursor-pointer hidden md:block"
            onClick={() => scrollToSection("series")}
          >
            Phim bộ
          </li>
        </Link>
        <Link to="/type/hoat-hinh">
          <li
            className="cursor-pointer hidden md:block"
            onClick={() => scrollToSection("cartoons")}
          >
            Hoạt hình
          </li>
        </Link>
      </ul>
      <SearchInput />
    </div>
  );
}

export default Header;
