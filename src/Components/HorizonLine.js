import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function HorizonLine() {
  const { theme } = useContext(ThemeContext);

  return (
    <hr
      className={`xl:mt-12 border-0 h-[1px] ${
        theme === "tolight" ? "bg-gray-400 opacity-20" : "bg-teal-700"
      }`}
    />
  );
}

export default HorizonLine;
