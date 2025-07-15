import PostContainer from '@/components/common/PostContainer/PostContainer';
import { usePrefetch } from '@/hooks/prefetch/usePrefetch';
import React, { forwardRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Article = forwardRef(({post},ref) => {
   const {
    userId,
    firstName,
    postId,
    titleImgURL,
    title,
    createdAt,
    likes,
    comments,
    profileImgURL,
    tagList
  } = post;
  const { preFetchIndividualPost, preFetchPostComments } = usePrefetch();
    const navigate = useNavigate();
  return (
     <article
        className="cursor-pointer"
        ref={ref}
        onMouseOver={() => {
          preFetchIndividualPost({ userId, postId, imgURL: titleImgURL });
          preFetchPostComments({
            postId,
          });
        }}
        onClick={() => {
          navigate(`/post/${userId}/${postId}`);
        }}
      >
        <PostContainer className={``}>
          <div className="flex items-start">
            <Link
              to={`/userprofile/${userId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PostContainer.UserProfile profileImg={profileImgURL} />
            </Link>

            <div className="flex flex-col gap-1">
              <PostContainer.PostAuthorName userName={firstName} />
              <PostContainer.PostTitle userId={userId} postId={postId}>
                <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize">
                  {title}
                </h4>
              </PostContainer.PostTitle>
              <PostContainer.PostTags tagList={tagList}/>
              <PostContainer.PostReactions
                like={likes}
                totalComments={comments}
              />
              <PostContainer.PostPublish createdAt={createdAt} />
            </div>
          </div>
        </PostContainer>
      </article>
  )
}
)