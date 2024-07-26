import React, { useContext } from "react";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import Logo from "../assets/FreeMovieLogo.png";
import { ThemeContext } from "../Context/ThemeContext";

function Header() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-[80px] px-3 flex justify-between items-center  md:h-[90px] md:px-[70px] ${
        theme === "tolight"
          ? " bg-gradient-to-r from-medium-blue via-light-blue to-medium-blue"
          : "bg-light-bg text-teal-900 shadow-bottom"
      }`}
    >
      <ul className="flex flex-row items-center xl:text-xl lg:text-lg md:text-sm">
        <Link to="/">
          <img
            src={Logo}
            alt="FreeMovie"
            className="h-[35px] md:h-[50px] w-auto md:mr-9"
          />
        </Link>
        <Link to="/type/tv-shows">
          <li
            className="mr-9 cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("tvshows")}
          >
            TV SHOW
          </li>
        </Link>
        <Link to="/type/phim-le">
          <li
            className="mr-9 cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("movies")}
          >
            PHIM ĐIỆN ẢNH
          </li>
        </Link>
        <Link to="/type/phim-bo">
          <li
            className="mr-9 cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("series")}
          >
            PHIM BỘ
          </li>
        </Link>
        <Link to="/type/hoat-hinh">
          <li
            className="cursor-pointer hidden md:block font-semibold"
            onClick={() => scrollToSection("cartoons")}
          >
            HOẠT HÌNH
          </li>
        </Link>
      </ul>
      <SearchInput />
      <ThemeToggle />
    </div>
  );
}

export default Header;
