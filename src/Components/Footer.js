import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-medium-blue text-white pt-8 mt-8 pb-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        <div className="md:pl-12 text-center md:text-start">
          <h2 className="font-bold text-lg">FREEMOVIE</h2>
          <p className="mt-4">
            Trang web cung cấp thông tin về các bộ phim mới nhất,{" "}
            <span>
              <Link to="/type/secret" className="cursor-default">
                phim hot
              </Link>
            </span>{" "}
            và nhiều hơn nữa. Made by Logan :3
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Cung cấp thông tin</h2>
          <ul className="mt-4 space-y-2 text-center md:text-start">
            <li>
              <div className="hover:underline cursor-pointer">Phim mới</div>
            </li>
            <li>
              <div className="hover:underline cursor-pointer">
                Phim phổ biến
              </div>
            </li>
            <li>
              <div className="hover:underline cursor-pointer">
                Thể loại phim
              </div>
            </li>
            <li>
              <div className="hover:underline cursor-pointer">
                Tin tức điện ảnh
              </div>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-start">
          <h2 className="font-bold text-lg">Thông tin liên hệ</h2>
          <div className="mt-4 space-x-4 flex flex-row md:flex-col md:space-x-0 lg:flex-row lg:space-x-4">
            <a
              href="https://www.facebook.com/"
              target="blank"
              className="hover:underline block"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/"
              target="blank"
              className="hover:underline block"
            >
              Instgram
            </a>
            <a
              href="https://github.com/duythai03"
              target="blank"
              className="hover:underline block"
            >
              Github
            </a>
            <a
              href="https://discord.com/"
              target="blank"
              className="hover:underline block"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; 2024 FREEMOVIE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
