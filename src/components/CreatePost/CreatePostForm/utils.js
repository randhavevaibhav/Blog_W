import { getLocalStorageItem, setLocalStorageItem } from "../../../utils/browser";
import {
  localPost,
  localPostEdit,
  localPostTitle,
  localPostTitleEdit,
  localPostTitleImgFile,
  localPostTitleImgFileEdit,
  localPostTitleImgURL,
  localPostTitleImgURLEdit,
} from "../../../utils/constants";

export const getLocalPostInfo = (mode) => {
  switch (mode) {
    case "EDIT":
      return {
        title: getLocalStorageItem(localPostTitleEdit),
        content: getLocalStorageItem(localPostEdit),
        imgFile: getLocalStorageItem(localPostTitleImgFileEdit),
        imgURL: getLocalStorageItem(localPostTitleImgURLEdit),
        setLocalTitle:(val)=>setLocalStorageItem(localPostTitleEdit,val),
        setLocalContent:(val)=>setLocalStorageItem(localPostEdit,val),
        setLocalImgFile:(val)=>setLocalStorageItem(localPostTitleImgFileEdit,val),
        setLocalImgURL:(val)=>setLocalStorageItem(localPostTitleImgURLEdit,val)
      };
    case "CREATE":
      return {
        title: getLocalStorageItem(localPostTitle),
        content: getLocalStorageItem(localPost),
        imgFile: getLocalStorageItem(localPostTitleImgFile),
        imgURL: getLocalStorageItem(localPostTitleImgURL),
        setLocalTitle:(val)=>setLocalStorageItem(localPostTitle,val),
        setLocalContent:(val)=>setLocalStorageItem(localPost,val),
        setLocalImgFile:(val)=>setLocalStorageItem(localPostTitleImgFile,val),
        setLocalImgURL:(val)=>setLocalStorageItem(localPostTitleImgURL,val)
      };
  }

  return null;
};
