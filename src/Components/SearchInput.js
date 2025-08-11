import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ThemeContext } from "../Context/ThemeContext";
import axios from "axios";

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const context = useContext(ThemeContext);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        if (value.trim()) {
          axios
            .get(`https://phimapi.com/v1/api/tim-kiem?keyword=${value}`)
            .then((res) => {
              if (res.data.status) {
                setSuggestions(res.data.data.items.slice(0, 5));
              } else {
                setSuggestions([]);
              }
            })
            .catch(() => {
              setSuggestions([]);
            });
        } else {
          setSuggestions([]);
        }
      }, 400)
    );
  };

  const handleSuggestionClick = (slug) => {
    setIsSearchVisible(false);
    setSuggestions([]);
    setKeyword("");
    navigate(`/movie/${slug}`);
  };

  const handleSearch = () => {
    if (keyword.trim() === "") {
      console.log("Keyword is empty");
      return;
    }
    setIsSearchVisible(false);
    setSuggestions([]);
    setKeyword("");
    navigate(`/search/${keyword.trim()}`);
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
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="w-full p-2 pl-4 rounded-full text-black bg-white border border-gray-300 focus:outline-none"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i
              className="absolute right-4 top-2 text-lg text-gray-500 cursor-pointer"
              onClick={handleSearch}
            >
              <FaMagnifyingGlass />
            </i>
            {suggestions.length > 0 && keyword.length > 0 && (
              <div className="absolute z-10 bg-black bg-opacity-70 rounded-md shadow-md top-[100%] left-0 w-full min-w-[200px] min-h-[70px]">
                {suggestions.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center p-2 hover:bg-gray-700"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 mr-2">
                      <img
                        src={`https://phimimg.com/${item.poster_url}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="text-white text-xs cursor-pointer"
                      onClick={() => handleSuggestionClick(item.slug)}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        {suggestions.length > 0 && keyword.length > 0 && (
          <div className="absolute z-10 bg-black bg-opacity-70 rounded-md shadow-md top-[100%] left-0 w-full min-w-[200px] min-h-[70px]">
            {suggestions.map((item) => (
              <div
                key={item.slug}
                className="flex items-center p-2 hover:bg-gray-700"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 mr-2">
                  <img
                    src={`https://phimimg.com/${item.poster_url}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="text-white text-xs cursor-pointer"
                  onClick={() => handleSuggestionClick(item.slug)}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
