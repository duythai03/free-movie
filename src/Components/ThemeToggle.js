import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Brightness from "../assets/brightness.png";
import Moon from "../assets/moon.png";

function ThemeToggle() {
  const context = useContext(ThemeContext);
  return (
    <div className="">
      <button onClick={context.toggleTheme}>
        {context.theme === "tolight" ? (
          <img src={Brightness} alt="Light Mode" className="w-8 h-8 mt-1" />
        ) : (
          <img src={Moon} alt="Dark Mode" className="w-8 h-8 mt-1" />
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
