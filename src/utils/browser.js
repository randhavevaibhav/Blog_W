import { getFileFromFileObj } from "./utils";

export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);

  if (item != "") {
    return JSON.parse(item);
  }

  return null;
};


export const getLocalPostData = () => {
  const localPostData = getLocalStorageItem("PostData");

  return localPostData
    ? {
        ...localPostData,
        imgFile: localPostData.imgFileObj
          ? getFileFromFileObj(localPostData.imgFileObj)
          : "",
      }
    : {
        title: "",
        content: "",
        imgFile: "",
        imgURL: "",
      };
};


export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const saveLocalPostData = (data) => {
  if (!toString.call(data) === "[object Object]") {
    throw new Error(`Please provide object`);
  }

  const oldPostData = getLocalStorageItem("PostData");

  const newPostData = {
    ...(oldPostData ? oldPostData : {}),
    ...data,
  };

  setLocalStorageItem("PostData", newPostData);
};



export const clearLocalImg = () => {
  const imgURL = "";
  const imgFileObj = "";
  const oldPostData = getLocalStorageItem("PostData");
  const newPostData = {
    ...(oldPostData ? oldPostData : {}),
    imgURL,
    imgFileObj,
  };
  saveLocalPostData(newPostData);
};
export const clearLocalPostData = () => {
  setLocalStorageItem("PostData", "");
};

