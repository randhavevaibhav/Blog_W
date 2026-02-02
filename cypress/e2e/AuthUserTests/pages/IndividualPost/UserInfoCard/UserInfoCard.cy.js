import {
  editUserProfilePageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
  userProfilePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { paths } from "@cypress/e2e/utils";
const { postArticle, individualPostPageElements } = pageElements;
const { userInfoCardHeader,editUserBtn } = individualPostPageElements;
const { article } = postArticle;
const {dashboardPage} = paths;

describe("Test navigation to user-info page by clicking on user-info card feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to navigate to user-info page by clicking on user-info card ", () => {
    cy.wait(800);
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
    cy.getBySel(userInfoCardHeader).click();
    userProfilePageNavTest();
  });

    it("test if authenticated user is able to navigate to update user page by clicking on Edit user button on user-info card ", () => {
    cy.wait(800);
    cy.visit(Cypress.env("clientURL") + dashboardPage);
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
    cy.getBySel(editUserBtn).click();
    editUserProfilePageNavTest();
  });

});


