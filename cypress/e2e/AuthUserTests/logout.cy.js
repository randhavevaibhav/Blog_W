import {
  terminateSessionAndMakeUserSigninWithPersistLogin,
  userSigninWithoutTerminateSession,
} from "@cypress/e2e/AuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";
import { paths } from "@cypress/e2e/utils";
import { requireLoginModalTest } from "@cypress/e2e/UnAuthUserTests/utils";

const { homePageElements } = pageElements;
const { signinPage } = paths;
const { userAvatar, deskTopMenuItems } = homePageElements;
const { logoutLink } = deskTopMenuItems;

describe("Logout test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("clientURL") + signinPage);
  });

  it("checks If user is able to logout from signin state and check if require login test pass and user is able to signin without terminate session", () => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
    cy.getBySel(userAvatar).delayedClick();
    cy.getBySel(logoutLink).delayedClick();
    cy.location("pathname").should("eq", "/");
    requireLoginModalTest();
    userSigninWithoutTerminateSession();
    cy.getBySel(userAvatar);
  });
});
