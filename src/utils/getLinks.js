export const getUserProfilePageLink = ({ userId }) => {
  return `/userprofile/${userId}`;
};

export const getPostPageLink = ({ postId }) => {
  return `/post/${postId}`;
};

export const getHomePageLink = () => {
  return `/`;
};

export const getUpdateUserPageLink = () => {
  return `/update/user`;
};

export const getCreatePostPageLink = () => {
  return `/new`;
};

export const getFollowersPageLink = () => {
  return `/followers`;
};

export const getFollowingsPageLink = () => {
  return `/followings`;
};

export const getDashboardPageLink = () => {
  return `/dashboard`;
};

export const getBookmarkPageLink = () => {
  return `/bookmark`;
};

export const getSignInPageLink = () => {
  return `/signin`;
};

export const getSignupPageLink = () => {
  return `/signup`;
};

export const getEditPostPageLink = ({ postId }) => {
  return `/edit/${postId}`;
};

export const getDeletePostPageLink = ({ postTitle, postId }) => {
  return `/post/delete/${postTitle}/${postId}`;
};

export const getTaggedPostsPageLink = ({ hashtagId, hashtagName,hashtagColor }) => {
  return `/tag/${hashtagId}/${encodeURIComponent(hashtagName)}/${encodeURIComponent(hashtagColor)}`;
};

export const getSearchedPostsPageLink = ({ query }) => {
  return `/search?query=${encodeURIComponent(query)}`;
};

export const getTerminatePageLink = () => {
  return `/terminate`;
};

export const getDeleteCommentPageLink = ({
    commentId,
    postId,
    hasReplies
}) => {
  return `/comment/delete/${commentId}/${postId}/${Number(hasReplies)}`;
};

export const getEditCommentPageLink = ({
    commentId,
    postId,
    content
}) => {
  return `/comment/edit/${commentId}/${content}/${postId}`;
};
