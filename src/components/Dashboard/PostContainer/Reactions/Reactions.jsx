import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { formatNumber } from "../../../../utils/browser";

const defaultClasses = `reactions flex gap-2 text-gray-400`;

export const Reactions = ({
  className,
  likeCount = 0,
  totalComments = 0,
}) => {
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <div className={overrideClasses}>
      <div className={`flex items-center gap-1`}>
        <FaRegHeart className="ml-2" />
        <span>{formatNumber(likeCount)}</span>
      </div>

      <div className={`flex items-center gap-1`}>
        <AiOutlineMessage className="ml-2" />
        <span>{formatNumber(totalComments)}</span>
      </div>
    </div>
  );
};
