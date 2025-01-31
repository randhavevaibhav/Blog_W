import { Button } from "../../../comonents/Button/Button";
import { Input } from "../../../comonents/Input/Input";
import { Label } from "../../../comonents/Label/Label";

import { forwardRef, useState } from "react";
import { getLocalStorageItem } from "../../../utils/browser";
export const Header = forwardRef((props, ref) => {
  const [titleImgURL, setTitleImgURL] = useState(null);

   let loacalPostTitle = getLocalStorageItem("localPostTitle");
    if (!loacalPostTitle) {
      loacalPostTitle = "";
    }
  

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTitleImgURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const clearImgURL = () => {
    setTitleImgURL(null);
  };

  return (
    <header className="post title  md:px-16 md:py-6 px-4 py-2 ">
      <div className="flex flex-col gap-2 title_image mb-8">
        {titleImgURL && (
          <div className="img_container">
            <img
              src={titleImgURL}
              alt="title image"
              className="w-[250px] h-[105px] object-scale-down"
            />
          </div>
        )}

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

          {titleImgURL && (
            <Button
              className=" border-none"
              onClick={clearImgURL}
              varient={"danger"}
            >
              Remove image
            </Button>
          )}
        </div>
      </div>
      <textarea
        name="post title"
        id="title"
        placeholder="New post title here..."
        className="w-full text-4xl bg-bg-primary font-bold outline-none"
        ref={ref}
      >{loacalPostTitle}</textarea>
    </header>
  );
});
