import React from "react";
import { FaMoon } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";
import { toggleTheme } from "../../utils/utils";
import { useThemeContext } from "../../hooks/Theme/useThemeContext";

export const ThemeToggle = () => {
  const { changeThemeToDark, changeThemeToLight } = useThemeContext();
  return (
    <div className=" flex gap-4 items-center">
      <FaMoon
        className="dark:hidden cursor-pointer mr-2 text-fs_xl"
        
        onClick={() => {
          toggleTheme();
          changeThemeToDark();
        }}
      />
      <LuSunMedium
        className="hidden dark:block cursor-pointer mr-2 text-fs_xl"
        size={"22px"}
        onClick={() => {
          toggleTheme();
          changeThemeToLight();
        }}
      />
    </div>
  );
};
