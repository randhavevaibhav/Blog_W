import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import {
  commentsLoading,
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {
  createCommentPositiveTest,
  deleteCommentNegativeTest,
  deleteCommentPositiveTest,
  editCommentNegativeTest,
  editCommentPositiveTest,
  likeDislikeCommentTest,
  replyCommentNegativeTest,
  replyCommentPositiveTest,
} from "@cypress/e2e/AuthUserTests/pages/IndividualPost/Comment/common";

const { postArticle } = pageElements;

const { article } = postArticle;

describe("Test create/edit/delete/like/dislike comment and add reply feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to create/edit/delete/like/dislike comment on a post and also able to reply to comment", () => {
    cy.wait(800);
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();

    //DO NOT Change the ORDER of tests

    createCommentPositiveTest();
    cy.wait(800);
    commentsLoading();
    //keep reply tests after craete comment test and before any delete test
    replyCommentNegativeTest();
    replyCommentPositiveTest();
    editCommentNegativeTest();
    editCommentPositiveTest();
    likeDislikeCommentTest();
    deleteCommentNegativeTest();
    deleteCommentPositiveTest();
  });
});
