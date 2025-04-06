import { MdDangerous } from "react-icons/md";
import { Toaster } from "react-hot-toast";

import { LikeCompo } from "./LikeCompo/LikeCompo";

import { CommentsCompo } from "./CommentsCompo/CommentsCompo";

export const LeftSidebar = ({ totalLikes, totalComments, isLikedByUser }) => {
  return (
    <>
      <aside>
        <div
          className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
        >
          <LikeCompo likes={totalLikes} likedByUser={isLikedByUser} />

          <CommentsCompo commentsCount={totalComments} />
        </div>
      </aside>
      <Toaster
        toastOptions={{ icon: <MdDangerous size={"40px"} color="red" /> }}
      />
    </>
  );
};
