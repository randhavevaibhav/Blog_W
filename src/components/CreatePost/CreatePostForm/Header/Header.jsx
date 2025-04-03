
import { Button } from "../../../common/Button/Button";
import { Input } from "../../../common/Input/Input";
import { Label } from "../../../common/Label/Label";

import { usePostContext } from "../../../../hooks/posts/usePostContext";

export const Header = ({ mode }) => {
  const { postData, changePostTitle, changePostImg } = usePostContext();

  const handleImageChange = (e) => {
    //also updating file and url state after image change
    const file = e.target.files && e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);

    console.log("url ===> ", file);

    changePostImg({
      img: {
        imgFile: file,
        imgURL: url,
      },
    });
  };

  const clearImgURL = () => {
    //context

    changePostImg({
      img: {
        imgFile: "",
        imgURL: "",
      },
    });
  };

  const handlePostTitleChange = (val) => {
    //context
    changePostTitle({
      title: val,
    });
  };

  const isEditMode = mode === "EDIT";

  return (
    <header className="post title ">
      <div className="flex flex-col gap-2 title_image mb-8">
        {postData.imgURL ? (
          <div className="img_container">
            <img
              src={postData.imgURL}
              alt="title image"
              className="w-[250px] h-[105px] object-scale-down"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-2 items-start md:flex-row">
          <Label className={"cursor-pointer border rounded-md px-8 py-1"}>
            {postData.imgURL ? `Change image` : `Add cover image`}
            <Input
              type="file"
              accept="image/*"
              className="absolute -left-[99999px]"
              onChange={handleImageChange}
            />
          </Label>

          {postData.imgURL ? (
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
        placeholder={isEditMode ? `Edit post title` : `New post title here...`}
        className="w-full text-4xl bg-bg-primary  border-bg-shade border-2 outline-none font-bold p-2"
        defaultValue={postData.title}
        onChange={(e) => handlePostTitleChange(e.target.value)}
      ></textarea>
    </header>
  );
};
