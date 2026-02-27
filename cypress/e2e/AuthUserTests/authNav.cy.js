import { pageElements } from "@cypress/e2e/utils";
import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";

import {
  globalLoading,
  articlesLoading,
  individualPostNavTest,
  individualPostLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import {
  bookmarkNavBaseTest,
  createPostNavBaseTest,
  dashboardNavBaseTest,
  editUserProfileNavBaseTest,
  followersNavBaseTest,
  followingUsersNavBaseTest,
  homeNavBaseTest,
  userProfileNavBaseTest,
} from "@cypress/e2e/AuthUserTests/authNavTests";

const { homePageElements, userProfilePageElements, postArticle } = pageElements;
const { userAvatar } = homePageElements;
const { recentCommentLink } = userProfilePageElements;
const { title } = postArticle;

const userProfileNavTests = () => {
  userProfileNavBaseTest();
  cy.getBySel(title).click();
  globalLoading();
  individualPostLoading();
  individualPostNavTest();
  userProfileNavBaseTest();
  cy.getBySel(recentCommentLink).click();
  globalLoading();
  individualPostLoading();
  individualPostNavTest();
};

const navigateDesktopMenuTest = () => {
  cy.wait(800);
  globalLoading();
  articlesLoading();
  cy.getBySel(userAvatar);

  userProfileNavTests();
  homeNavBaseTest();
  dashboardNavBaseTest();
  createPostNavBaseTest();
  editUserProfileNavBaseTest();
  bookmarkNavBaseTest();
  followersNavBaseTest();
  followingUsersNavBaseTest();
};

describe("Auth navigation test", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });
  it("checks If user is able to signin with persist option enable and able to navigate desktop routes", () => {
    navigateDesktopMenuTest();
  });
});
