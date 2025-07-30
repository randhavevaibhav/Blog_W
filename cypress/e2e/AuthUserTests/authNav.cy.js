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
  cy.reload();

  cy.getBySel(userAvatar).click();
  cy.getBySel(userProfileLink).click();
  userProfilePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(homeLink).click();
  homePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(dashboardLink).click();
  dashboardPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(createPostLink).click();
  createPostPageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(editProfileLink).click();
  editUserProfilePageNavTest();

  cy.getBySel(userAvatar).click();
  cy.getBySel(bookmarkLink).click();
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
