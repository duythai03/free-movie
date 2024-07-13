import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
        <li className="mr-9 cursor-pointer font-bold md:text-3xl">FREEMOVIE</li>
        <li
          className="mr-9 cursor-pointer hidden md:block"
          onClick={() => scrollToSection("tvshows")}
        >
          TV Show
        </li>
        <li
          className="mr-9 cursor-pointer hidden md:block"
          onClick={() => scrollToSection("movies")}
        >
          Phim điện ảnh
        </li>
        <li
          className="mr-9 cursor-pointer hidden md:block"
          onClick={() => scrollToSection("series")}
        >
          Phim bộ
        </li>
        <li
          className="cursor-pointer hidden md:block"
          onClick={() => scrollToSection("contact")}
        >
          Liên hệ
        </li>
      </ul>
      <div className="flex relative">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          className="w-40 p-1 pl-3 rounded-full text-black border border-gray-300 focus:outline-none md:w-80 md:p-2 md:pl-6"
        />
        <i className="absolute right-[2px] text-xl text-gray-500 cursor-pointer px-[12px] py-[10px] hidden md:block">
          <FaMagnifyingGlass />
        </i>
      </div>
    </div>
  );
}

export default Header;
