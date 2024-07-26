import React, { useContext } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { ThemeContext } from "../Context/ThemeContext";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const { theme } = useContext(ThemeContext);
  const handleClick = (page) => {
    return () => {
      if (page > 0 && page <= totalPages) {
        onPageChange(page);
      }
    };
  };

  const renderPages = () => {
    const maxVisiblePages = 5; // Số lượng nút số tối đa hiển thị

    let pages = [];

    // Nếu totalPages nhỏ hơn hoặc bằng maxVisiblePages, hiển thị tất cả các trang
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={handleClick(i)}
            disabled={i === currentPage}
            className={`p-4 mx-3 hover:text-white ${
              i === currentPage ? "text-blue-500" : "text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Nếu totalPages lớn hơn maxVisiblePages, chỉ hiển thị một phần các trang và dấu ...
      if (currentPage <= 4) {
        // Hiển thị các trang từ 1 đến 3 và dấu ...
        for (let i = 1; i <= 4; i++) {
          pages.push(
            <button
              key={i}
              onClick={handleClick(i)}
              disabled={i === currentPage}
              className={`p-2 md:p-4 mx-1 hover:text-white md:mx-3 ${
                i === currentPage ? "text-blue-500" : "text-gray-700"
              }`}
            >
              {i}
            </button>
          );
        }
        pages.push(
          <span
            key="ellipsis"
            className="mx-1 md:mx-3 flex justify-center items-center text-gray-700"
          >
            ...
          </span>
        );
        pages.push(
          <button
            key={totalPages - 1}
            onClick={handleClick(totalPages - 1)}
            className={`p-2 md:p-4 mx-1 md:mx-3 hover:text-white ${
              totalPages - 1 === currentPage ? "text-blue-500" : "text-gray-700"
            }`}
          >
            {totalPages - 1}
          </button>
        );
        pages.push(
          <button
            key={totalPages}
            onClick={handleClick(totalPages)}
            className={`p-2 md:p-4 mx-1 md:mx-3 hover:text-white ${
              totalPages === currentPage ? "text-blue-500" : "text-gray-700"
            }`}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        // Hiển thị dấu ... và các trang từ totalPages - 3 đến totalPages
        pages.push(
          <button
            key={1}
            onClick={handleClick(1)}
            className={`p-2 md:p-4 mx-1 md:mx-3 hover:text-white ${
              1 === currentPage ? "text-blue-500" : "text-gray-700"
            }`}
          >
            1
          </button>
        );
        pages.push(
          <button
            key={2}
            onClick={handleClick(2)}
            className={`p-2 md:p-4 mx-1 hover:text-white md:mx-3 ${
              2 === currentPage ? "text-blue-500" : "text-gray-700"
            }`}
          >
            2
          </button>
        );
        pages.push(
          <span
            key="ellipsis"
            className="mx-1 md:mx-3 flex justify-center items-center text-gray-700"
          >
            ...
          </span>
        );
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              onClick={handleClick(i)}
              disabled={i === currentPage}
              className={`p-2 md:p-4 mx-1 md:mx-3 hover:text-white ${
                i === currentPage ? "text-blue-500" : "text-gray-700"
              }`}
            >
              {i}
            </button>
          );
        }
      } else {
        // Hiển thị dấu ... và các trang gần currentPage
        pages.push(
          <button
            key={1}
            onClick={handleClick(1)}
            className={`p-2 md:p-4 mx-1 md:mx-3 hover:text-white ${
              1 === currentPage ? "text-blue-500" : "text-gray-700"
            }`}
          >
            1
          </button>
        );
        pages.push(
          <span
            key="ellipsis"
            className="mx-1 md:mx-3 flex justify-center items-center text-gray-700"
          >
            ...
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              onClick={handleClick(i)}
              disabled={i === currentPage}
              className={`p-2 md:p-4 mx-1 md:mx-3 hover:text-white ${
                i === currentPage ? "text-blue-500" : "text-gray-700"
              }`}
            >
              {i}
            </button>
          );
        }
        pages.push(
          <span
            key="ellipsis2"
            className="mx-1 md:mx-3 flex justify-center items-center text-gray-700"
          >
            ...
          </span>
        );
        pages.push(
          <button
            key={totalPages}
            onClick={handleClick(totalPages)}
            className={`p-2 md:p-4 mx-1 md:mx-3 hover:text-white ${
              totalPages === currentPage ? "text-blue-500" : "text-gray-700"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="mt-12 flex justify-center">
      <button
        onClick={handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-4 opacity-70 hover:opacity-100
        ${theme === "tolight" ? "" : "text-black-text"}
        `}
      >
        <FaAngleLeft />
      </button>
      {renderPages()}
      <button
        onClick={handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-4 opacity-70 hover:opacity-100
        ${theme === "tolight" ? "" : "text-black-text"}
        `}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}

export default Pagination;
