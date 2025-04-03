import {

  localSelectedTheme,
} from "./constants";

export const setTheme = () => {
  const selectedTheme = getLocalStorageItem(localSelectedTheme) || "dark";
  // console.log("selectedTheme ===> ", selectedTheme);

  if (selectedTheme === "dark") {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
};

export const toggleTheme = () => {
  const isDark = document.body.classList.contains("dark");
  if (isDark) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    setLocalStorageItem(localSelectedTheme, "light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    setLocalStorageItem(localSelectedTheme, "dark");
  }
};

export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);

  if (item != "") {
 
    return JSON.parse(item);
  }

  return null;
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};



export const clearLocalPostData = () => {
  setLocalStorageItem("PostData", "");
};

export const  formatNumber=(number)=> {
  // Use the toLocaleString method to add suffixes to the number
  number = number.toLocaleString('en-US', {
    // add suffixes for thousands, millions, and billions
    // the maximum number of decimal places to use
    maximumFractionDigits: 2,
    // specify the abbreviations to use for the suffixes
    notation: 'compact',
    compactDisplay: 'short'
  });

  return number;
}
