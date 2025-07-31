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
      logoutLink: "logout-link",
    },
    discoverPostsPageBtn: "discover-posts-page-btn",
    followingPostsPageBtn: "following-posts-page-btn",
    discoverPostsPage: "discover-posts-page",
    followingPostsPage: "following-posts-page",
  },
  modal: {
    requireLoginModal: "require-login-modal",
    closeModal: "close-modal",
  },
  individualPostPageElements: {
    bookmark: "bookmark",
    like: "like",
    individualPostContainer: "individual-post-container",
    individualPostPageSkeleton: "individual-post-page-skeleton",
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
  errors: {
    signinErrors: {
      wrongPassMsg: "Invalid password !",
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
  terminate:"/terminate"
};
