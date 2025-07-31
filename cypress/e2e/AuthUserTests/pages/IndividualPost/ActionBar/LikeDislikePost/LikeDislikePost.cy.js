import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { postArticle, individualPostPageElements } = pageElements;
const { like } = individualPostPageElements;
const { article } = postArticle;

const dislikePostTest = () => {
  let beforeLikes = null;
  cy.getBySel(like)
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.getBySel(like).click();
      cy.getBySel(like).should("have.attr", "data-is-liked", "false");
      cy.getBySel(like)
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("be.lessThan", parseInt(beforeLikes));
    });
  //check the state of app after reloading page
  cy.getBySel(like)
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.reload();
      cy.wait(1000)
      globalLoading();
      individualPostLoading();
      
      cy.getBySel(like)
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("equal", parseInt(beforeLikes));
      cy.getBySel(like).should("have.attr", "data-is-liked", "false");
    });
};

const likePostTest = () => {
  let beforeLikes = null;
  cy.getBySel(like)
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.getBySel(like).click();
      cy.getBySel(like).should("have.attr", "data-is-liked", "true");
      cy.getBySel(like)
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("be.greaterThan", parseInt(beforeLikes));
    });

  //check the state of app after reloading page
  cy.getBySel(like)
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.reload();
     cy.wait(1000)
      globalLoading();
      individualPostLoading();
      cy.getBySel(like)
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("equal", parseInt(beforeLikes));
      cy.getBySel(like).should("have.attr", "data-is-liked", "true");
    });
};

describe("Test like/dislike post feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to like/dislike post", () => {
    cy.getBySel(article).first().click();
    cy.wait(800)
    globalLoading();
    individualPostLoading();
    individualPostNavTest();

    cy.getBySel(like).invoke("attr", "data-is-liked").as("isLiked");
    cy.getBySel(like).invoke("attr", "data-total-likes").as("totalLikes");

    cy.get("@isLiked").then((isLiked) => {
      if (isLiked === "true") {
        dislikePostTest();
        likePostTest();
      } else if (isLiked === "false") {
        likePostTest();
        dislikePostTest();
      }
    });
  });
});
