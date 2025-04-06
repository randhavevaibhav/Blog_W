import { useContext } from "react";
import { ThemeContext } from "../../contexts/Theme/ThemeContextProvider";

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
