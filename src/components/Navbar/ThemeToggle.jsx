import React from "react";
import { FaMoon } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";
import { toggleTheme } from "../../utils/utils";
import { useThemeContext } from "../../hooks/Theme/useThemeContext";

export const ThemeToggle = () => {
  const { changeThemeToDark, changeThemeToLight, theme } = useThemeContext();

  const isDark = theme === "dark";

  return (
    <div className=" flex gap-4 items-center">
      {isDark ? (
        <LuSunMedium
          className="cursor-pointer mr-2 text-fs_xl"
          onClick={() => {
            toggleTheme();
            changeThemeToLight();
          }}
        />
      ) : (
        <FaMoon
          className="cursor-pointer mr-2 text-fs_xl"
          onClick={() => {
            toggleTheme();
            changeThemeToDark();
          }}
        />
      )}
    </div>
  );
};
