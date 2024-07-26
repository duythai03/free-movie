import { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("tolight");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "todark" ? "tolight" : "todark"));
  };

  useEffect(() => {}, [theme]); // Theo dõi sự thay đổi của theme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
