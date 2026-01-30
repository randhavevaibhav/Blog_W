import {
  globalLoading,
  individualPostLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { individualPostPageElements } = pageElements;
const { like } = individualPostPageElements;

const dislikePostTest = () => {
  let beforeLikes = null;
  cy.getBySel(like)
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.wait(1500);
      cy.getBySel(like).delayedClick();
      cy.wait(1500);
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
      cy.wait(1000);
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
      cy.wait(1500);
      cy.getBySel(like).delayedClick();
      cy.wait(1500);
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
      cy.wait(1000);
      globalLoading();
      individualPostLoading();
      cy.getBySel(like)
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("equal", parseInt(beforeLikes));
      cy.getBySel(like).should("have.attr", "data-is-liked", "true");
    });
};

export const individualPostLikeDisLikeTest = () => {
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
};
