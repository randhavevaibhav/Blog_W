import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";


export const SelectProfileImg = forwardRef((props, ref) => {
  const [selectedProfImg, setSelectedProfImg] = useState(null);

  const handleImgChange = () => {
    const profileImgFile =
      ref.current.files && ref.current.files[0]
        ? ref.current.files[0]
        : selectedProfImg;

    if (profileImgFile) {
      setSelectedProfImg(profileImgFile);
    } else {
      setSelectedProfImg(null);
    }
  };

  const removeImg = () => {
    setSelectedProfImg(null);
  };
  return (
    <Label className={" w-full flex flex-col items-center cursor-pointer gap-2"}>
      <UserAvatar
        userProfileImg={
          selectedProfImg ? URL.createObjectURL(selectedProfImg) : null
        }
        avatarSize={"large"}
      />
      {selectedProfImg ? (
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeImg();
          }}
          className="flex gap-2 items-center"
        >
          Remove <FaTrashAlt className="flex-none text-red-500" />
        </span>
      ) : (
        <span className="text-base rounded-md">Add profile picture</span>
      )}

      <Input
        type="file"
        accept="image/*"
        className="absolute -left-[99999px]"
        ref={ref}
        onChange={handleImgChange}
      />
    </Label>
  );
});
