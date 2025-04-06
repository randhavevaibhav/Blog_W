import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const changeThemeToDark = () => {
    setTheme("dark");
  };

  const changeThemeToLight = () => {
    setTheme("light");
  };

  return (
    <ThemeContext.Provider
      value={{ changeThemeToDark, changeThemeToLight, theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
