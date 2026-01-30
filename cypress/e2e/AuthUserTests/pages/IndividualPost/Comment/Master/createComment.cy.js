import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { createCommentPositiveTest } from "@cypress/e2e/AuthUserTests/pages/IndividualPost/Comment/common";

const { postArticle } = pageElements;

const { article } = postArticle;

describe("Test create comment feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to create comment on a post", () => {
    cy.wait(800);
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
    createCommentPositiveTest();
  });
});
