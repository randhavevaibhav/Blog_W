import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { homePageElements } = pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;
const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if Auth user is able to edit post from dashboard.", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    globalLoading();
    articlesLoading();
    cy.wait(800);
    dashboardPageNavTest();

    updatePostTest();
  });
});
