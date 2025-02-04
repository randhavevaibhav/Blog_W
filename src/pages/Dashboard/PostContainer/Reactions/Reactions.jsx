import { AiOutlineMessage } from "react-icons/ai"
import { FaRegHeart } from "react-icons/fa"
import { IoEyeOutline } from "react-icons/io5"


export const Reactions = () => {
  return (
    <div className="reactions flex gap-2 text-gray-400">
    <div className="likes">
      <span className=" flex items-center">
        {" "}
        <FaRegHeart className="mr-2" />0
      </span>
    </div>
    <div className="comments">
      <span className=" flex items-center">
        {" "}
        <AiOutlineMessage className="mr-2" />0
      </span>
    </div>
    <div className="views">
      <span className=" flex items-center">
        {" "}
        <IoEyeOutline className="mr-2" />0
      </span>
    </div>
  </div>
  )
}

