import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {
  replyCommentNegativeTest,
  replyCommentPositiveTest,
} from "@cypress/e2e/AuthUserTests/pages/IndividualPost/Comment/common";

const { postArticle } = pageElements;
const { title } = postArticle;

describe("Test add reply to comment feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to reply to comment on a post.", () => {
    cy.wait(800);
    cy.getBySel(title).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();

    replyCommentNegativeTest();
    replyCommentPositiveTest();
  });
});
