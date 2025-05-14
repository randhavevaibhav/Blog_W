import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostContext } from "@/hooks/posts/usePostContext";
import { getLocalStorageItem, saveLocalPostData } from "@/utils/browser";
import { Max_IMG_Size } from "@/utils/constants";
import React, { useState } from "react";

export const TitleImg = () => {
  const { postDataRef } = usePostContext();
  const localImgURL = getLocalStorageItem("PostData")
    ? getLocalStorageItem("PostData").imgURL
    : "";
  const [titleImgURL, setTitleImgURL] = useState(localImgURL);

  const checkImgSize = (fileSize, maxSize) => {
    if (fileSize > maxSize) {
      return false;
    } else {
      return true;
    }
  };

  const handleImageChange = (e) => {
    //also updating file and url state after image change
    //  console.log("handleImageChange ===>")
    const file = e.target.files && e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);

    const isAllowedImgSize = checkImgSize(file.size, Max_IMG_Size);

    if (!isAllowedImgSize) {
      clearImgURL();

      toast.error(`please select file smaller than 2MB.`);

      return;
    }

    postDataRef.current.imgURL = url;
    postDataRef.current.imgFile = file;

    setTitleImgURL(url);

    // console.log("file ===> ", file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result,
      };

      saveLocalPostData({
        imgFileObj: fileData,
        imgURL: url,
      });

      // console.log("fileData ===> ", fileData);
    };

    reader.readAsDataURL(file);
  };

  const clearImgURL = () => {
    postDataRef.current.imgFile = "";
    postDataRef.current.imgURL = "";
    setTitleImgURL("");
    clearLocalImg();
  };

  return (
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
        <Label className={"cursor-pointer border rounded-md px-4 py-2 font-medium"}>
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
            varient={"destructive"}
          >
            Remove image
          </Button>
        ) : null}
      </div>
    </div>
  );
};
