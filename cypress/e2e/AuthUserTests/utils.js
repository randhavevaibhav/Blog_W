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
const { followersHeader } = followersPageElements;
const { followingUsersHeader } = followingUsersPageElements;
const { editCommentHeader } = editCommentPageElements;
const { deleteCommentModal } = deleteCommentPageElements;
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
      globalLoading()
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
  cy.getBySel(followersHeader).should("be.visible");
};

export const followingUsersPageNavTest = () => {
  cy.checkPathInc({ path: followingUsersPage });
  cy.getBySel(followingUsersHeader).should("be.visible");
};

export const editCommentPageNavTest = () => {
  cy.checkPathInc({ path: editCommentPage });
  cy.getBySel(editCommentHeader).should("be.visible");
};

export const deleteCommentPageNavTest = () => {
  cy.checkPathInc({ path: deleteCommentPage });
  cy.getBySel(deleteCommentModal).should("be.visible");
};
