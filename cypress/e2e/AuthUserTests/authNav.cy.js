import { pageElements } from "@cypress/e2e/utils";
import {
  bookmarkPageNavTest,
  createPostPageNavTest,
  dashboardPageNavTest,
  editUserProfilePageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
  userProfilePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import { homePageNavTest } from "@cypress/e2e/AuthUserTests/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";

const { homePageElements } = pageElements;

const { userAvatar, deskTopMenuItems } = homePageElements;
const {
  userProfileLink,
  editProfileLink,
  bookmarkLink,
  createPostLink,
  homeLink,
  dashboardLink,
} = deskTopMenuItems;

const navigateDesktopMenuTest = () => {
  cy.getBySel(userAvatar);

  cy.getBySel(userAvatar).click();
  cy.getBySel(userProfileLink).click();
  globalLoading();
  userProfilePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(homeLink).click();
  globalLoading();
  homePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(dashboardLink).click();
  globalLoading();
  dashboardPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(createPostLink).click();
  globalLoading();
  createPostPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(editProfileLink).click();
  globalLoading();
  editUserProfilePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(bookmarkLink).click();
  globalLoading();
  bookmarkPageNavTest();
};

describe("Auth navigation test", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });
  it("checks If user is able to signin with persist option enable and able to navigate desktop routes", () => {
    navigateDesktopMenuTest();
  });
});
