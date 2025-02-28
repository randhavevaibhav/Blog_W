import { useEffect, useState } from "react";
import { Button } from "../../../Button/Button";
import { Input } from "../../../Input/Input";
import { Label } from "../../../Label/Label";
import {
  getFileObjectFromLocal,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../../utils/browser";
import {
  localPostTitle,
  localPostTitleImgURL,
  localPostTitleImgFile,
} from "../../../../utils/constants";

export const Header = () => {

  //url: for storing file url in local to persisit between reload.
  //file : for storing file obj in local to use it when form submitted.
  const [titleImg, setTitleImg] = useState({
    file: null,
    url: getLocalStorageItem(localPostTitleImgURL),
  });

  useEffect(() => {
    //updating url and file state after reload.
    const storedFileData = getLocalStorageItem(localPostTitleImgFile);
    const localImgURL = getLocalStorageItem(localPostTitleImgURL);
  
    const imgFileObj = getFileObjectFromLocal(storedFileData);
    setTitleImg({
      ...titleImg,
      file: imgFileObj,
      url: localImgURL,
    });
  }, []);

  const handleImageChange = (e) => {
    //also updating file and url state after image change
    const file = e.target.files && e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);
   
    // console.log("url ===> ", url);
    const reader = new FileReader();
    reader.onload = (e) => {
      setLocalStorageItem(localPostTitleImgFile,e.target.result)
      setTitleImg({
        ...titleImg,
        file,
        url,
      });
    };
    reader.readAsDataURL(file);
    // console.log("titleImg ===> ", titleImg);

    setLocalStorageItem(localPostTitleImgURL, url);
  };
  const clearImgURL = () => {
    setLocalStorageItem(localPostTitleImgURL, "");
    setLocalStorageItem(localPostTitleImgFile, "");
    setTitleImg({});
  };

  const handlePostTitleChange = (val) => {
    setLocalStorageItem(localPostTitle, val);
  };

  return (
    <header className="post title  md:px-16 md:py-6 px-4 py-2 ">
      <div className="flex flex-col gap-2 title_image mb-8">
        {titleImg.url ? (
          <div className="img_container">
            <img
              src={titleImg.url}
              alt="title image"
              className="w-[250px] h-[105px] object-scale-down"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-2 items-start md:flex-row">
          <Label className={"cursor-pointer border rounded-md px-8 py-1"}>
            {titleImg.url ? `Change image` : `Add cover image`}
            <Input
              type="file"
              accept="image/*"
              className="absolute -left-[99999px]"
              onChange={handleImageChange}
            />
          </Label>

          {titleImg.url ? (
            <Button
              className=" border-none"
              onClick={clearImgURL}
              varient={"danger"}
            >
              Remove image
            </Button>
          ) : null}
        </div>
      </div>
      <textarea
        name="post title"
        id="title"
        placeholder="New post title here..."
        className="w-full text-4xl bg-bg-primary font-bold outline-none"
        defaultValue={getLocalStorageItem(localPostTitle)}
        onChange={(e) => handlePostTitleChange(e.target.value)}
      ></textarea>
    </header>
  );
};
