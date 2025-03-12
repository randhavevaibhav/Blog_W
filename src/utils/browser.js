import {
  localPost,
  localPostTitle,
  localPostTitleImgFile,
  localPostTitleImgURL,
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
    // console.log("Item found");
    // console.log("item =====> ", localStorage.getItem(key), key);
    return JSON.parse(item);
  }
  // if (item === "") {
  //   // console.log("Item not found");
  //   // console.log("item =====> ", localStorage.getItem(key), key);
  // }

  return null;
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFileObjectFromLocal = (data) => {
  let fileObj = null;
  if (data) {
    const byteString = atob(data.split(",")[1]);
    const mimeString = data.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    fileObj = new File([blob], "filename");
  }
  return fileObj;
};

export const clearLocalPostData = () => {
  setLocalStorageItem(localPostTitle, "");
  setLocalStorageItem(localPostTitleImgFile, "");
  setLocalStorageItem(localPostTitleImgURL, "");
  setLocalStorageItem(localPost, "");
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
