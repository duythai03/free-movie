import React, { useContext } from "react";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import Logo from "../assets/FreeMovieLogo.png";
import { ThemeContext } from "../Context/ThemeContext";
import Menu from "./Menu";
import { FaAngleDown } from "react-icons/fa6";

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
      className={`h-[80px] px-3 flex justify-between items-center  md:h-[90px] xl:px-[70px] ${
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
        <div>
          <div className="dropdown dropdown-bottom hidden md:block mr-9">
            <div
              tabIndex={0}
              role="button"
              className={`btn px-0 bg-transparent border-none font-semibold shadow-none xl:text-xl lg:text-lg md:text-sm hover:bg-transparent hover:brightness-75 ${
                theme === "tolight" ? "text-white " : " text-teal-900"
              }`}
            >
              THỂ LOẠI <FaAngleDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-[600px] p-2 shadow grid grid-cols-5 gap-y-2 text-white"
            >
              <li>
                <Link to="/type-filter/kinh-di" className="whitespace-nowrap">
                  Kinh Dị
                </Link>
              </li>
              <li>
                <Link to="/type-filter/hanh-dong" className="whitespace-nowrap">
                  Hành Động
                </Link>
              </li>
              <li>
                <Link to="/type-filter/tinh-cam" className="whitespace-nowrap">
                  Tình Cảm
                </Link>
              </li>
              <li>
                <Link to="/type-filter/am-nhac" className="whitespace-nowrap">
                  Âm Nhạc
                </Link>
              </li>
              <li>
                <Link to="/type-filter/vo-thuat" className="whitespace-nowrap">
                  Võ Thuật
                </Link>
              </li>
              <li>
                <Link
                  to="/type-filter/chinh-kich"
                  className="whitespace-nowrap"
                >
                  Chính Kịch
                </Link>
              </li>
              <li>
                <Link to="/type-filter/co-trang" className="whitespace-nowrap">
                  Cổ Trang
                </Link>
              </li>
              <li>
                <Link to="/type-filter/tai-lieu" className="whitespace-nowrap">
                  Tài Liệu
                </Link>
              </li>
              <li>
                <Link to="/type-filter/tam-ly" className="whitespace-nowrap">
                  Tâm Lý
                </Link>
              </li>
              <li>
                <Link to="/type-filter/gia-dinh" className="whitespace-nowrap">
                  Gia Đình
                </Link>
              </li>
              <li>
                <Link to="/type-filter/khoa-hoc" className="whitespace-nowrap">
                  Khoa Học
                </Link>
              </li>
              <li>
                <Link to="/type-filter/bi-an" className="whitespace-nowrap">
                  Bí Ẩn
                </Link>
              </li>
              <li>
                <Link
                  to="/type-filter/chien-tranh"
                  className="whitespace-nowrap"
                >
                  Chiến Tranh
                </Link>
              </li>
              <li>
                <Link to="/type-filter/hai-huoc" className="whitespace-nowrap">
                  Hài Hước
                </Link>
              </li>
              <li>
                <Link to="/type-filter/the-thao" className="whitespace-nowrap">
                  Thể Thao
                </Link>
              </li>
              <li>
                <Link to="/type-filter/phieu-luu" className="whitespace-nowrap">
                  Phiêu Lưu
                </Link>
              </li>
              <li>
                <Link to="/type-filter/hinh-su" className="whitespace-nowrap">
                  Hình Sự
                </Link>
              </li>
              <li>
                <Link
                  to="/type-filter/vien-tuong"
                  className="whitespace-nowrap"
                >
                  Viễn Tưởng
                </Link>
              </li>
              <li>
                <Link to="/type-filter/phim-18" className="whitespace-nowrap">
                  Phim 18+
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="dropdown dropdown-bottom hidden md:block mr-9">
            <div
              tabIndex={0}
              role="button"
              className={`btn px-0 bg-transparent border-none font-semibold shadow-none xl:text-xl lg:text-lg md:text-sm hover:bg-transparent hover:brightness-75 ${
                theme === "tolight" ? "text-white " : " text-teal-900"
              }`}
            >
              QUỐC GIA <FaAngleDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-[600px] p-2 shadow grid grid-cols-5 gap-y-2 text-white"
            >
              <li>
                <Link
                  to="/country-filter/viet-nam"
                  className="whitespace-nowrap"
                >
                  Việt Nam
                </Link>
              </li>
              <li>
                <Link to="/country-filter/au-my" className="whitespace-nowrap">
                  Âu Mỹ
                </Link>
              </li>
              <li>
                <Link
                  to="/country-filter/trung-quoc"
                  className="whitespace-nowrap"
                >
                  Trung Quốc
                </Link>
              </li>
              <li>
                <Link
                  to="/country-filter/dai-loan"
                  className="whitespace-nowrap"
                >
                  Đài Loan
                </Link>
              </li>
              <li>
                <Link
                  to="/country-filter/thai-lan"
                  className="whitespace-nowrap"
                >
                  Thái Lan
                </Link>
              </li>
              <li>
                <Link to="/country-filter/an-do" className="whitespace-nowrap">
                  Ấn Độ
                </Link>
              </li>
              <li>
                <Link to="/country-filter/anh" className="whitespace-nowrap">
                  Anh
                </Link>
              </li>
              <li>
                <Link
                  to="/country-filter/hong-kong"
                  className="whitespace-nowrap"
                >
                  Hồng Kông
                </Link>
              </li>
              <li>
                <Link
                  to="/country-filter/han-quoc"
                  className="whitespace-nowrap"
                >
                  Hàn Quốc
                </Link>
              </li>
              <li>
                <Link
                  to="/country-filter/nhat-ban"
                  className="whitespace-nowrap"
                >
                  Nhật Bản
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/type/phim-le">
          <li
            className="mr-9 cursor-pointer hidden lg:block font-semibold"
            onClick={() => scrollToSection("movies")}
          >
            PHIM ĐIỆN ẢNH
          </li>
        </Link>
        <Link to="/type/phim-bo">
          <li
            className="mr-9 cursor-pointer hidden lg:block font-semibold"
            onClick={() => scrollToSection("series")}
          >
            PHIM BỘ
          </li>
        </Link>
      </ul>
      <SearchInput />
      <ThemeToggle />
      <Menu />
    </div>
  );
}

export default Header;
