import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { individualPostLikeDisLikeTest } from "@cypress/e2e/AuthUserTests/pages/IndividualPost/ActionBar/LikeDislikePost/common";

const { postArticle } = pageElements;
const { article } = postArticle;

describe("Test like/dislike post feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to like/dislike post", () => {
    cy.getBySel(article).first().delayedClick();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
    individualPostLikeDisLikeTest();
  });
});
