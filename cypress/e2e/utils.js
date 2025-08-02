export const pageElements = {
  singinPageElements: {
    signinBtn: "signin-button",
    signupLink: "signup-link",
    emailInput: "email-input",
    emailErr: "email-error",
    passInput: "password-input",
    passErr: "password-error",
    persistLoginCheck: "persist-login-check",
  },
  signupPageElements: {
    signupBtn: "signup-button",
    signinLink: "signin-link",
    firstNameErr: "first-name-error",
    emailErr: "email-error",
    passErr: "password-error",
    confirmPassErr: "confirm-password-error",
    firstNameInput: "first-name-input",
    emailInput: "email-input",
    passInput: "password-input",
    confirmPassInput: "confirm-password-input",
  },
  homePageElements: {
    siteLogo: "site-logo",
    userAvatar: "user-avatar",
    createAccount: "create_account",
    bookmark: "bookmark",
    nonBookmarkedArticles: "article[data-bookmark='false']",
    bookmarkedArticles: "article[data-bookmark='true']",
    deskTopMenuItems: {
      userProfileLink: "user-profile-link",
      homeLink: "home-link",
      dashboardLink: "dashboard-link",
      createPostLink: "create-post-link",
      editProfileLink: "edit-profile-link",
      bookmarkLink: "bookmark-link",
      followersLink: "followers-link",
      followingUsersLink: "following-users-link",
      logoutLink: "logout-link",
    },
    discoverPostsPageBtn: "discover-posts-page-btn",
    followingPostsPageBtn: "following-posts-page-btn",
    discoverPostsPage: "discover-posts-page",
    followingPostsPage: "following-posts-page",
  },
  followersPageElements: {
    followersHeader: "followers-header",
  },
  followingUsersPageElements: {
    followingUsersHeader: "following-users-header",
  },
  editCommentPageElements: {
    editCommentHeader: "edit-comment-header",
    editCmtSubmitBtn: "edit-comment-submit-btn",
    editCmtDismissBtn: "edit-comment-dismiss-btn",
    editCmtTxtArea: "edit-comment-text-area",
  },
  deleteCommentPageElements:{
    deleteCommentModal:"delete-comment-modal",
    deleteCommentBtn:"delete-comment-btn",
    cancelDeleteCommentBtn:"cancel-delete-comment-btn"
  },
  modal: {
    requireLoginModal: "require-login-modal",
    closeModal: "close-modal",
  },
  individualPostPageElements: {
    bookmark: "bookmark",
    like: "like",
    comment: "comment",
    createCmtTxtArea: "create-comment-text-area",
    replyCmtTxtArea: "reply-comment-text-area",
    createCmtSubmitBtn: "create-comment-submit-btn",
    replyCmtSubmitBtn: "reply-comment-submit-btn",
    replyCmtDismissBtn: "reply-comment-dismiss-btn",
    commentsList: "comments-list",
    commentListComment: "comment-list-comment",
    commentContent: "comment-content",
    commentMenuTrigger: "comment-menu-trigger",
    deleteCmtMenuBtn: "delete-cmt-button",
    editCmtMenuBtn: "edit-cmt-button",
    individualPostContainer: "individual-post-container",
    individualPostPageSkeleton: "individual-post-page-skeleton",
    commentSkeleton: "comment-skeleton",
  },
  userProfilePageElements: {
    userName: "user-profile-user-name",
  },
  dashBoardPageElements: {
    dashBoardHeaderTitle: "dashboard-header-title",
  },
  createPostPageElements: {
    showPreviewBtn: "show-preview-btn",
  },
  editUserProfilePageElements: {
    editUserProfileHeader: "edit-user-profile-header",
  },
  bookmarkPageElements: {
    bookmarkHeader: "bookmark-header",
  },

  TerminateSessionPageElements: {
    terminateEmailInput: "terminate-email-input",
    terminatePassInput: "terminate-password-input",
    terminateSessionBtn: "terminate-session-btn",
  },
  postArticle: {
    article: "post-article",
    bookmark: "bookmark",
    title: "post-title",
    articlesSkeleton: "articles-skeleton",
  },
  followButton: "follow-button",
  toastMsg: {
    error: {
      wrongPassMsg: "Invalid password !",
    },
    success: {
      editCmtSuccessMsg: "comment edited successfully !!",
    },
  },
  loadingSpinner: "loading-spinner",
};

export const paths = {
  home: "/",
  userProfilePage: "/userprofile",
  dashboardPage: "/dashboard",
  createPostPage: "/new",
  editUserProfilePage: "/userprofile/edit",
  bookmarkPage: "/bookmark",
  signinPage: "/signin",
  signupPage: "/signup",
  individualPostPage: "/post",
  terminate: "/terminate",
  followersPage: "/followers",
  followingUsersPage: "/followings",
  editCommentPage: "/comment/edit",
  deleteCommentPage:"/comment/delete"
};
