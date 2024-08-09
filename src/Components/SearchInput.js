import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import normalize from "normalize-text";

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = () => {
    if (keyword.trim() === "") {
      console.log("Keyword is empty");
      return;
    }
    const normalizedKeyword = normalize(keyword);
    navigate(`/search/${encodeURIComponent(normalizedKeyword)}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="flex relative">
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        className="w-40 p-1 pl-3 rounded-full text-black bg-white border border-gray-300 focus:outline-none xl:w-80 xl:p-2 xl:pl-6 sm:w-[280px] lg:w-[270px] md:w-40"
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <i
        className="absolute right-[2px] text-sm text-gray-500 cursor-pointer px-[12px] py-[10px] hidden sm:block sm:text-lg sm:px-[10px] sm:py-[10px]"
        onClick={handleSearch}
      >
        <FaMagnifyingGlass />
      </i>
    </div>
  );
}

export default SearchInput;
