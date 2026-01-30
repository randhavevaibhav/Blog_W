import {
  terminateSessionAndMakeUserSigninWithPersistLogin,
  userProfilePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { postArticle, individualPostPageElements } = pageElements;
const { userInfoCardHeader } = individualPostPageElements;
const { article } = postArticle;

describe("Test navigation to user-info page by clicking on user-info card feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to navigate to user-info page by clicking on user-info card ", () => {
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
    cy.getBySel(userInfoCardHeader).click();
    userProfilePageNavTest();
  });
});
