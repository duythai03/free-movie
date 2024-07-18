import React from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import Logo from "../assets/FreeMovieLogo.png";

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
          <img
            src={Logo}
            alt="FreeMovie"
            className="h-[45px] md:h-[50px] w-auto mr-9"
          />
        </Link>
        <Link to="/free-movie/type/tv-shows">
          <li
            className="mr-9 cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("tvshows")}
          >
            TV SHOW
          </li>
        </Link>
        <Link to="/free-movie/type/phim-le">
          <li
            className="mr-9 cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("movies")}
          >
            PHIM ĐIỆN ẢNH
          </li>
        </Link>
        <Link to="/free-movie/type/phim-bo">
          <li
            className="mr-9 cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("series")}
          >
            PHIM BỘ
          </li>
        </Link>
        <Link to="/free-movie/type/hoat-hinh">
          <li
            className="cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("cartoons")}
          >
            HOẠT HÌNH
          </li>
        </Link>
      </ul>
      <SearchInput />
    </div>
  );
}

export default Header;
