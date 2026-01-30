import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {
  editCommentNegativeTest,
  editCommentPositiveTest,
} from "@cypress/e2e/AuthUserTests/pages/IndividualPost/Comment/common";

const { postArticle } = pageElements;

const { article } = postArticle;

describe("Test edit comment feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to edit comment on a post", () => {
    cy.getBySel(article).first().delayedClick();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();

    cy.wait(800);

    editCommentNegativeTest();
    editCommentPositiveTest();
  });
});
