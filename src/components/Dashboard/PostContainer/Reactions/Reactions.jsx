import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { IconWithText } from "../../../common/IconWithText/IconWithText";

const defaultClasses = `reactions flex gap-2 text-gray-400`;

export const Reactions = ({
  className,
  iconsSize = "",
  likeCount = 0,
  totalComments = 0,
}) => {
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <div className={overrideClasses}>
      <IconWithText Icon={FaRegHeart} text={likeCount} iconSize={iconsSize} />
      <IconWithText
        Icon={AiOutlineMessage}
        text={totalComments}
        iconSize={iconsSize}
      />
    </div>
  );
};
