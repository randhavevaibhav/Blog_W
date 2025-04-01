import { useEffect, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { Input } from "../../../common/Input/Input";
import { Label } from "../../../common/Label/Label";
import { getFileObjectFromLocal } from "../../../../utils/browser";

import { getLocalPostInfo } from "../utils";

export const Header = ({ mode }) => {
  const {
    title,
    imgURL,
    imgFile,
    setLocalImgFile,
    setLocalImgURL,
    setLocalTitle,
  } = getLocalPostInfo(mode);
  const [titleImg, setTitleImg] = useState({
    file: null,
    url: imgURL,
  });

  useEffect(() => {
    const imgFileObj = getFileObjectFromLocal(imgFile);
    setTitleImg({
      ...titleImg,
      file: imgFileObj,
      url: imgURL,
    });
  }, []);

  const handleImageChange = (e) => {
    //also updating file and url state after image change
    const file = e.target.files && e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);

    // console.log("url ===> ", url);
    const reader = new FileReader();
    reader.onload = (e) => {
      // setLocalStorageItem(localPostTitleImgFile, e.target.result);
      setLocalImgFile(e.target.result);
      setTitleImg({
        ...titleImg,
        file,
        url,
      });
    };
    reader.readAsDataURL(file);

    setLocalImgURL(url);
  };
  const clearImgURL = () => {
    setLocalImgURL("");
    setLocalImgFile("");
    setTitleImg({});
  };

  const handlePostTitleChange = (val) => {
    // setLocalStorageItem(localPostTitle, val);
    setLocalTitle(val);
  };

  const isEditMode = mode==="EDIT";

  return (
    <header className="post title ">
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
        placeholder={isEditMode?`Edit post title`:`New post title here...`}
        className="w-full text-4xl bg-bg-primary  border-bg-shade border-2 outline-none font-bold p-2"
        defaultValue={title}
        onChange={(e) => handlePostTitleChange(e.target.value)}
      ></textarea>
    </header>
  );
};
