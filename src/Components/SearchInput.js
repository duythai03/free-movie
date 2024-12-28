import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import normalize from "normalize-text";
import { ThemeContext } from "../Context/ThemeContext";

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const context = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim() === "") {
      console.log("Keyword is empty");
      return;
    }
    const normalizedKeyword = normalize(keyword);
    setIsSearchVisible(false);
    navigate(`/search/${encodeURIComponent(normalizedKeyword)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="relative px-2">
      <i
        className={`cursor-pointer text-lg sm:hidden flex items-center ${
          context.theme === "tolight" ? "text-white" : "text-black"
        }`}
        onClick={toggleSearchVisibility}
      >
        <FaMagnifyingGlass />
      </i>

      {isSearchVisible && (
        <div className="fixed top-[80px] left-0 w-screen p-1 z-20 bg-white shadow-md">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="w-full p-2 pl-4 rounded-full text-black bg-white border border-gray-300 focus:outline-none"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i
            className="absolute right-4 top-4 text-lg text-gray-500 cursor-pointer"
            onClick={handleSearch}
          >
            <FaMagnifyingGlass />
          </i>
        </div>
      )}

      {/* Hiển thị thanh tìm kiếm như cũ trên màn hình từ sm trở lên */}
      <div className="hidden sm:flex relative mr-2">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          className="w-40 p-1 pl-3 rounded-full text-black bg-white border border-gray-300 focus:outline-none xl:w-80 xl:p-2 xl:pl-6 sm:w-[280px] lg:w-[270px] md:w-40"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <i
          className="absolute right-[2px] text-sm text-gray-500 cursor-pointer px-[12px] py-[10px] sm:text-lg sm:px-[10px] sm:py-[10px]"
          onClick={handleSearch}
        >
          <FaMagnifyingGlass />
        </i>
      </div>
    </div>
  );
}

export default SearchInput;
