import React from "react";
import { FaMoon } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";
import { toggleTheme } from "../../../utils/utils";
import { useThemeContext } from "../../../hooks/Theme/useThemeContext";

export const ThemeToggle = () => {
  const { changeThemeToDark, changeThemeToLight, theme } = useThemeContext();

  const isDark = theme === "dark";

  return (
    <div className=" flex gap-4 items-center">
      {isDark ? (
        <div
          className="mr-2 p-2 cursor-pointer"
          onClick={() => {
            toggleTheme();
            changeThemeToLight();
          }}
        >
          <LuSunMedium size={'16px'} />
        </div>
      ) : (
        <div
          className="mr-2 p-2 cursor-pointer"
          onClick={() => {
            toggleTheme();
            changeThemeToDark();
          }}
        >
          <FaMoon size={'16px'} />
        </div>
      )}
    </div>
  );
};
