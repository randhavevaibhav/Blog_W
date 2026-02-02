import { pageElements } from "@cypress/e2e/utils";
import { paths } from "@cypress/e2e/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
const {
  singinPageElements,
  homePageElements,
  TerminateSessionPageElements,
  toastMsg,
  userProfilePageElements,
  dashBoardPageElements,
  createPostPageElements,
  editUserProfilePageElements,
  bookmarkPageElements,
  followersPageElements,
  followingUsersPageElements,
  editCommentPageElements,
  deleteCommentPageElements,
  deletePostPageElements,
  searPostPageElements,
} = pageElements;

const {
  userProfilePage,
  home,
  createPostPage,
  editUserProfilePage,
  bookmarkPage,
  dashboardPage,
  signinPage,
  terminate,
  followersPage,
  followingUsersPage,
  editCommentPage,
  deleteCommentPage,
  deletePostPage,
  getUserPostsPath,
  getUserStatsPath,
  createCommentPath,
  individualPostPage,
  searchPostPath
} = paths;

const { signinBtn, emailInput, passInput, persistLoginCheck } =
  singinPageElements;

const { terminateEmailInput, terminatePassInput, terminateSessionBtn } =
  TerminateSessionPageElements;

const { discoverPostsPageBtn } = homePageElements;
const { userName } = userProfilePageElements;
const { dashboardHeaderTitle } = dashBoardPageElements;
const { showPreviewBtn } = createPostPageElements;
const { editUserProfileHeader } = editUserProfilePageElements;
const { bookmarkHeader } = bookmarkPageElements;
const { followersHeader, followersNotFound } = followersPageElements;
const { followingUsersHeader, followingsNotFound } = followingUsersPageElements;
const { editCommentHeader } = editCommentPageElements;
const { deleteCommentModal } = deleteCommentPageElements;
const { deletePostModal } = deletePostPageElements;
const {searchPostHeader} = searPostPageElements;
const { error } = toastMsg;
const { wrongPassMsg } = error;

export const userSignin = ({ isPersist = false, wrongPass = false }) => {
  cy.getBySel(emailInput).clear().type(Cypress.env("userEmail"));
  if (wrongPass) {
    cy.getBySel(passInput).clear().type("##432wFdsfsdf");
  } else {
    cy.getBySel(passInput).clear().type(Cypress.env("password"));
  }
  if (isPersist) {
    cy.getBySel(persistLoginCheck).then(($button) => {
      if ($button.attr("aria-checked") === "false") {
        cy.wrap($button).click();
      } else {
        cy.log("Button is already checked, skipping click.");
      }
    });
  }
  cy.getBySel(signinBtn).click();
  if (wrongPass) {
    cy.checkToastMessage({
      message: wrongPassMsg,
    });
  }
};

export const terminateSession = () => {
  cy.getBySel(terminateEmailInput).should("be.visible");
  cy.getBySel(terminateEmailInput).clear().type(Cypress.env("userEmail"));
  cy.getBySel(terminatePassInput).clear().type(Cypress.env("password"));
  cy.getBySel(terminateSessionBtn).click();
};

export const userSigninWithoutTerminateSession = () => {
  cy.visit(Cypress.env("clientURL") + signinPage);
  userSignin({ isPersist: true });
};

export const terminateSessionAndMakeUserSigninWithPersistLogin = () => {
  cy.log("sign in page url", Cypress.env("clientURL") + signinPage);
  cy.visit(Cypress.env("clientURL") + signinPage);
  userSignin({ isPersist: true });
  cy.wait(800);
  globalLoading();
  cy.url().then((url) => {
    if (!url.includes(terminate)) {
      homePageNavTest();
    } else if (url.includes(terminate)) {
      terminateSession();
      cy.wait(800);
      globalLoading();
      userSignin({ isPersist: true });
      globalLoading();
    }
  });
};

export const userProfilePageNavTest = () => {
  cy.checkPathInc({ path: userProfilePage });
  cy.getBySel(userName).should("be.visible");
};

export const dashboardPageNavTest = () => {
  cy.checkPathEqTo({ path: dashboardPage });
  cy.getBySel(dashboardHeaderTitle).should("be.visible");
};

export const createPostPageNavTest = () => {
  cy.checkPathEqTo({ path: createPostPage });
  cy.getBySel(showPreviewBtn).should("be.visible");
};

export const editUserProfilePageNavTest = () => {
  cy.checkPathInc({ path: editUserProfilePage });
  cy.getBySel(editUserProfileHeader).should("be.visible");
};

export const bookmarkPageNavTest = () => {
  cy.checkPathEqTo({ path: bookmarkPage });
  cy.getBySel(bookmarkHeader).should("be.visible");
};

export const homePageNavTest = () => {
  cy.checkPathEqTo({ path: home });
  cy.getBySel(discoverPostsPageBtn).should("be.visible");
};

export const followersPageNavTest = () => {
  cy.checkPathInc({ path: followersPage });
  cy.get(`[data-test='${followersHeader}'],[data-test='${followersNotFound}']`)
    .filter(":visible")
    .should("have.length.at.least", 1);
};

export const followingUsersPageNavTest = () => {
  cy.checkPathInc({ path: followingUsersPage });
  cy.get(
    `[data-test='${followingUsersHeader}'],[data-test='${followingsNotFound}']`
  )
    .filter(":visible")
    .should("have.length.at.least", 1);
};

export const editCommentPageNavTest = () => {
  cy.checkPathInc({ path: editCommentPage });
  cy.getBySel(editCommentHeader).should("be.visible");
};

export const deleteCommentPageNavTest = () => {
  cy.checkPathInc({ path: deleteCommentPage });
  cy.getBySel(deleteCommentModal).should("be.visible");
};

export const deletePostPageNavTest = () => {
  cy.checkPathInc({ path: deletePostPage });
  cy.getBySel(deletePostModal).should("be.visible");
};

export const searchPostPageNavTest = () => {
  cy.checkPathInc({ path: searchPostPath });
  cy.getBySel(searchPostHeader).should("be.visible");
};

export const getInterceptors = () => {
  const getUserPostsRequest = "getUserPosts";
  const getIndividualPostRequest = "getIndividualPost";
  const getUserStatsRequest = "getUserStats";
  const deletePostRequest = "deletePost";
  const createCommentRequest = "createComment";
  const homeRequest = "home";

  return {
    getInterceptorAlias: () => {
      return {
        getUserPostsRequestAlias: `@${getUserPostsRequest}`,
        getIndividualPostRequestAlias: `@${getIndividualPostRequest}`,
        getUserStatsRequestAlias: `@${getUserStatsRequest}`,
        deletePostRequestAlias: `@${deletePostRequest}`,
        createCommentRequestAlias: `@${createCommentRequest}`,
        homeRequestAlias: `@${homeRequest}`,
      };
    },
    interceptGetUserPosts: () => {
      cy.intercept("GET", Cypress.env("apiURL") + getUserPostsPath + "/**").as(
        getUserPostsRequest
      );
    },
    interceptIndividualPost: () => {
      cy.intercept(
        "GET",
        Cypress.env("apiURL") + individualPostPage + "/**"
      ).as(getIndividualPostRequest);
    },
    interceptGetUserStats: () => {
      cy.intercept("GET", Cypress.env("apiURL") + getUserStatsPath + "/**").as(
        getUserStatsRequest
      );
    },
    interceptDeletePost: () => {
      cy.intercept("DELETE", Cypress.env("apiURL") + deletePostPage + "/**").as(
        deletePostRequest
      );
    },
    interceptCreateComment: () => {
      cy.log(
        "cypress api path ==> ",
        Cypress.env("apiURL") + createCommentPath
      );
      cy.intercept("POST", Cypress.env("apiURL") + createCommentPath).as(
        createCommentRequest
      );
    },
    interceptHome: () => {
      cy.intercept("GET", Cypress.env("clientURL")).as(homeRequest);
    },
  };
};
