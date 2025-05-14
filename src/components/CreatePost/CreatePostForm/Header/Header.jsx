import { Button } from "../../../common/Button/Button";
import { Input } from "../../../common/Input/Input";
import { Label } from "../../../common/Label/Label";

import { usePostContext } from "../../../../hooks/posts/usePostContext";
import { useState } from "react";
import { clearLocalImg, getLocalStorageItem, saveLocalPostData } from "../../../../utils/browser";
import { Max_IMG_Size } from "../../../../utils/constants";

import toast from "react-hot-toast";

export const Header = ({ mode }) => {
  const { postDataRef } =
    usePostContext();
  const localImgURL = getLocalStorageItem("PostData")
    ? getLocalStorageItem("PostData").imgURL
    : "";
  const [titleImgURL, setTitleImgURL] = useState(localImgURL);




  const checkImgSize =(fileSize,maxSize)=>{
    if (fileSize > maxSize) {  
      return false;
    }else{
     return true;
    }
  }

  const handleImageChange = (e) => {
    //also updating file and url state after image change
  //  console.log("handleImageChange ===>") 
    const file = e.target.files && e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);

    const isAllowedImgSize = checkImgSize(file.size,Max_IMG_Size);

    if (!isAllowedImgSize) {

      clearImgURL()
    
      toast.error(`please select file smaller than 2MB.`)
     
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
        imgURL:url
      })
     
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

  const handlePostTitleChange = (e) => {
    const titleVal = e.target.value;
    saveLocalPostData({
      title:titleVal
    })
  };

  const isEditMode = mode === "EDIT";

  const titleRef = postDataRef.current.title;
  let title = "";
  if (getLocalStorageItem("PostData")) {
    const localPostTitle = getLocalStorageItem("PostData").title;
    title = localPostTitle;
  } else if (titleRef && titleRef.value) {
    title = titleRef.value;
  }

  return (
    <header className="post title ">
      {/* <div className="flex flex-col gap-2 title_image mb-8">
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
      </div> */}
      <textarea
        name="post title"
        id="title"
        placeholder={isEditMode ? `Edit post title` : `New post title here...`}
        className="w-full text-4xl bg-bg-primary  border-bg-shade border-2 outline-none font-bold p-2"
        defaultValue={title}
        onChange={handlePostTitleChange}
        ref={(el) => (postDataRef.current.title = el)}
      ></textarea>
    </header>
  );
};
