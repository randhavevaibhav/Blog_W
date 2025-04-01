

import { MdDangerous } from "react-icons/md";
import { Toaster } from "react-hot-toast";

import { useGetPostLikes } from "../../../hooks/likes/useGetPostLikes";
import { ErrorText } from "../../common/ErrorText/ErrorText";
import { LikeCompo } from "./LikeCompo/LikeCompo";
import { useGetAllPostComments } from "../../../hooks/comments/useGetAllPostComments";
import { CommentsCompo } from "./CommentsCompo/CommentsCompo";
import { LoadingTextWithSpinner } from "../../common/LoadingTextWithSpinner/LoadingTextWithSpinner";

export const LeftSidebar = ({ commentsCount }) => {
  const {
    isPending: isFetchPostLikesPending,
    isError:isFetchPostLikesErr,
    data: postLikesData,
  } = useGetPostLikes();

    const { isPending: isFetchCommentsPending, data: commentsData ,isError:isFetchPostCmtErr} =
      useGetAllPostComments();

  const isFetchPostAnalyticsPending = isFetchPostLikesPending || isFetchCommentsPending;
  const isFetchPostAnalyticsErr = isFetchPostLikesErr||isFetchPostCmtErr;

  if (isFetchPostAnalyticsPending) {
    return <LoadingTextWithSpinner>Fetching post analytics please wait ...</LoadingTextWithSpinner>;
  }

  if (isFetchPostAnalyticsErr) {
    return <ErrorText>Error while fetching post analytics.</ErrorText>;
  }
  const totalComments = commentsData.total_comments_count;

  // console.log("LeftSidebar re-render !! ===>")
  return (
    <>
      <aside>
        <div
          className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
        >
          <LikeCompo
            likes={postLikesData.likes}
            likedByUser={postLikesData.likedByUser}
          />

          <CommentsCompo commentsCount={totalComments}/>
        </div>
      </aside>
      <Toaster
        toastOptions={{ icon: <MdDangerous size={"40px"} color="red" /> }}
      />
    </>
  );
};
