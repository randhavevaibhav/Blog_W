import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { Label } from "../../Label/Label";

import { forwardRef, useState } from "react";
import { getLocalStorageItem } from "../../../utils/browser";
import { useUploadCloud } from "../../../hooks/cloud/useUploadCloud";
import { LoadingWithText } from "../../LoadingWithText/LoadingWithText";
export const Header = forwardRef((props, ref) => {
  const [titleImgURL, setTitleImgURL] = useState(
    getLocalStorageItem("localPostTitleImg")
  );
  const { uploadFile, isPending } = useUploadCloud();

  let loacalPostTitle = getLocalStorageItem("localPostTitle");

  if (!loacalPostTitle) {
    loacalPostTitle = "";
  }

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      uploadFile(formData);
      console.log(
        "localPostTitleImg ===> ",
        getLocalStorageItem("localPostTitleImg")
      );
      setTitleImgURL(getLocalStorageItem("localPostTitleImg"));
    }
  };

  const clearImgURL = () => {
    setTitleImgURL(null);
  };

  return (
    <header className="post title  md:px-16 md:py-6 px-4 py-2 ">
      <div className="flex flex-col gap-2 title_image mb-8">
        {isPending ? (
          <LoadingWithText>Uploading image...</LoadingWithText>
        ) : titleImgURL ? (
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
        ref={ref}
        defaultValue={loacalPostTitle}
      ></textarea>
    </header>
  );
});
