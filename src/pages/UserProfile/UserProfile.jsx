import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { FaBirthdayCake } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { LuScrollText } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useGetUserInfo } from "../../hooks/user/useGetUserInfo";
import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

const UserProfile = () => {
  const { data: userData, isPending, isError } = useGetUserInfo();

  if (isPending) {
    return (
      <MainLayout className={`max-w-[1024px]`}>
        <LoadingTextWithGIF />
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout className={`max-w-[1024px]`}>
        <ErrorText>Error while feching userInfo</ErrorText>
      </MainLayout>
    );
  }

  const userName = userData.userInfo.first_name;
  const userMail = userData.userInfo.email;
  const joinedOn = userData.userInfo.registered_at;
  const totalComments = userData.totalComments;
  const totalPosts = userData.totalPosts;
  const recentPost = userData.recentPost;
  const recentComment = userData.recentComment;
  return (
    <MainLayout className={`max-w-[1024px]`}>
      {/* user info Header */}
      <div className="header p-4 ">
        <header className="p-4 bg-bg-shade">
          <div className="flex justify-end">
            <Link to={`/edit/${userMail}`}>Edit User</Link>
          </div>
          <div className="text-center user_details flex flex-col gap-2 mb-4">
            <h1 className="text-2xl">{userName}</h1>
            <p>A fullstack sofware engineer</p>
          </div>

          <div className="meta text-sm flex gap-6 justify-center">
            <span className="flex gap-2 items-center text-gray-400">
              <FaBirthdayCake />
              {`Joined on ${format(new Date(joinedOn), "yyyy-MM-dd")}`}
            </span>
            <a
              href="mailto:testusermail@gmail.com"
              className="flex gap-2 items-center text-gray-400"
            >
              <IoMail />
              {userMail}
            </a>
          </div>
        </header>
      </div>
      {/* user data Bottom */}
      <div className="bottom_info_div px-4 grid grid-cols-[1fr_2fr] gap-4">
        {/* Left side */}
        <div className="left_side flex flex-col gap-4">
          <div className="skills bg-bg-shade p-4">
            <h4 className="title text-lg font-semibold capitalize">Skills</h4>
            <div className="">Js, tailwind, NodJs, ReactJs</div>
          </div>
          <div className="post_stat bg-bg-shade p-4">
            <div className="flex items-center total_posts mb-4">
              <LuScrollText className="mr-2" />

              <span>{`${totalPosts} posts published`}</span>
            </div>

            <div className="flex items-center total_comments mb-4">
              <FaRegComment className="mr-2" />

              <span>{`${totalComments} comments written`}</span>
            </div>
          </div>
        </div>
        {/* main content */}
        <div className="main_content ">
          <div className="recent_post bg-bg-shade">
            {/* posts */}
            {recentPost ? (
              <>
                <div className="ind_posts gap-2 items-center bg-bg-shade p-4 rounded-md  mb-6">
                  <h4 className="text-xl font-semibold tracking-wide ">
                    Recent Posts
                  </h4>
                  <div className="post_title">
                    <Link
                      to={`/post/${recentPost.user_id}/${recentPost.post_id}`}
                    >
                      <h3 className="text-lg">{recentPost.title}</h3>
                    </Link>
                    <span className="text-sm text-gray-400">
                      Published:{" "}
                      {format(new Date(recentPost.created_at), "yyyy-MM-dd")}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
          {/* recent comments */}
          <div className="recent_comment bg-bg-shade p-4">
            <h4 className="text-xl font-semibold tracking-wide mb-4">
              Recent comments
            </h4>
            {/* Individual comment */}
            {recentComment ? (
              <div className="ind_comment">
                <Link
                  to={`/post/${recentComment.user_id}/${recentComment.post_id}`}
                >
                  <div>
                    <h4 className="text-lg font-semibold tracking-wide">
                      {recentComment.post_title}
                    </h4>
                    <div className="flex items-center gap-4">
                      <p className="text-base">{recentComment.content}</p>
                      <span className="text-sm text-gray-400">
                        {`commented on : ${format(
                          new Date(recentComment.created_at),
                          "yyyy-MM-dd"
                        )}`}
                      </span>
                    </div>
                  </div>
                </Link>
                <hr className="mt-2" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default UserProfile;
