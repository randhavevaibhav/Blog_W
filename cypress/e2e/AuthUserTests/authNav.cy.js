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

  cy.getBySel(userAvatar).click();
  cy.getBySel(userProfileLink).click();
  cy.wait(800);
  globalLoading();
  userProfilePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(homeLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  homePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(dashboardLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  dashboardPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(createPostLink).click();
  cy.wait(800);
  globalLoading();
  createPostPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(editProfileLink).click();
  cy.wait(800);
  globalLoading();
  editUserProfilePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(bookmarkLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  bookmarkPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(followersLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  followersPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(followingUsersLink).click();
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
