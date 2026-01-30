import { pageElements } from "@cypress/e2e/utils";
import {
  bookmarkPageNavTest,
  createPostPageNavTest,
  dashboardPageNavTest,
  editUserProfilePageNavTest,
  followersPageNavTest,
  followingUsersPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
  userProfilePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import { homePageNavTest } from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  articlesLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

const { homePageElements } = pageElements;

const { userAvatar, deskTopMenuItems } = homePageElements;
const {
  userProfileLink,
  editProfileLink,
  bookmarkLink,
  createPostLink,
  homeLink,
  dashboardLink,
  followersLink,
  followingUsersLink,
} = deskTopMenuItems;

const navigateDesktopMenuTest = () => {
  cy.wait(800);
  globalLoading();
  articlesLoading();
  cy.getBySel(userAvatar);

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(userProfileLink).delayedClick();
  cy.wait(800);
  globalLoading();
  userProfilePageNavTest();

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(homeLink).delayedClick();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  homePageNavTest();

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(dashboardLink).delayedClick();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  dashboardPageNavTest();

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(createPostLink).delayedClick();
  cy.wait(800);
  globalLoading();
  createPostPageNavTest();

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(editProfileLink).delayedClick();
  cy.wait(800);
  globalLoading();
  editUserProfilePageNavTest();

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(bookmarkLink).delayedClick();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  bookmarkPageNavTest();

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(followersLink).delayedClick();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  followersPageNavTest();

  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(followingUsersLink).delayedClick();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  followingUsersPageNavTest();
};

describe("Auth navigation test", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });
  it("checks If user is able to signin with persist option enable and able to navigate desktop routes", () => {
    navigateDesktopMenuTest();
  });
});
