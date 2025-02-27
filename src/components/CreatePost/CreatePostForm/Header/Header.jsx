import { useState } from "react";
import { Button } from "../../../Button/Button";
import { Input } from "../../../Input/Input";
import { Label } from "../../../Label/Label";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../../utils/browser";
import { localPostTitle, localPostTitleImg } from "../../../../utils/constants";

export const Header = ({ getImageFile }) => {
  const [titleImgURL, setTitleImgURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);
    getImageFile(file);

    setTitleImgURL(url);

    setLocalStorageItem(localPostTitleImg, url);
  };
  const clearImgURL = () => {
    setLocalStorageItem(localPostTitleImg, "");
    setTitleImgURL(null);
  };

  const handlePostTitleChange = (val) => {
    setLocalStorageItem(localPostTitle, val);
  };

  return (
    <header className="post title  md:px-16 md:py-6 px-4 py-2 ">
      <div className="flex flex-col gap-2 title_image mb-8">
        {titleImgURL ? (
          <div className="img_container">
            <img
              src={titleImgURL}
              alt="title image"
              className="w-[250px] h-[105px] object-scale-down"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-2 items-start md:flex-row">
          <Label className={"cursor-pointer border rounded-md px-8 py-1"}>
            {titleImgURL ? `Change image` : `Add cover image`}
            <Input
              type="file"
              accept="image/*"
              className="absolute -left-[99999px]"
              onChange={handleImageChange}
            />
          </Label>

          {titleImgURL ? (
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
