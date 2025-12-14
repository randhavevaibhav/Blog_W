import {
  bookmarkPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { postArticle, individualPostPageElements, homePageElements } =
  pageElements;
const { bookmark } = individualPostPageElements;
const { userAvatar, deskTopMenuItems } = homePageElements;
const { bookmarkLink } = deskTopMenuItems;
const { article } = postArticle;

const removeBookmarkTest = ({ postPageURL }) => {
  if (postPageURL) {
    cy.visit(postPageURL);
    cy.wait(1000);
    globalLoading();
    individualPostLoading();
  }
  cy.getBySel(bookmark).click();
  cy.getBySel(bookmark).should("have.attr", "data-is-bookmarked", "false");

  //check the state of app after reloading page
  // cy.reload();

  // globalLoading();
  // individualPostLoading();
  // cy.getBySel(bookmark).should("have.attr", "data-is-bookmarked", "false");

  cy.getBySel(bookmark).invoke("attr", "data-post-id").as("postId");

  cy.get("@postId").then((postId) => {
    cy.window().its("localStorage").invoke("setItem", "postId", postId);
  });

  //

  cy.getBySel(userAvatar).click();
  cy.getBySel(bookmarkLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  bookmarkPageNavTest();

  cy.window()
    .its("localStorage")
    .invoke("getItem", "postId")
    .then((postId) => {
      cy.getBySel(article).find(`#${postId}`).should("not.exist");
    });
};

const addBookmarkTest = ({ postPageURL }) => {
  if (postPageURL) {
    cy.visit(postPageURL);
    cy.wait(1000);
    globalLoading();
    individualPostLoading();
  }
  cy.getBySel(bookmark).click();
  cy.getBySel(bookmark).should("have.attr", "data-is-bookmarked", "true");

  //check the state of app after reloading page
  // cy.reload();
  // globalLoading();
  // individualPostLoading();
  // cy.getBySel(bookmark).should("have.attr", "data-is-bookmarked", "true");

  cy.getBySel(bookmark).invoke("attr", "data-post-id").as("postId");

  cy.get("@postId").then((postId) => {
    cy.window().its("localStorage").invoke("setItem", "postId", postId);
  });
  //check post is added in bookmark page

  cy.getBySel(userAvatar).click();
  cy.getBySel(bookmarkLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  bookmarkPageNavTest();

  cy.getBySel(article)
    .first()
    .invoke("attr", "id")
    .then((firstBookmarkedPostId) => {
      cy.window()
        .its("localStorage")
        .invoke("getItem", "postId")
        .then((postId) => {
          expect(firstBookmarkedPostId.trim()).to.equal(postId.trim());
        });
    });
};
describe("Test add/remove bookmark feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to add/remove post as bookmark", () => {
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
    cy.getBySel(bookmark)
      .invoke("attr", "data-is-bookmarked")
      .as("isBookmarked");

    cy.location("pathname").then((pathname) => {
      // Split the pathname string by '/'
      const pathSegments = pathname.split("/");

      const postPageURL = `${Cypress.env("clientURL")}/post/${
        pathSegments[2]
      }/${pathSegments[3]}`;

      cy.get("@isBookmarked").then((isBookmarked) => {
        if (isBookmarked === "true") {
          removeBookmarkTest({ postPageURL: null });
          addBookmarkTest({ postPageURL: postPageURL });
        } else if (isBookmarked === "false") {
          addBookmarkTest({ postPageURL: null });
          removeBookmarkTest({ postPageURL: postPageURL });
        }
      });
    });
  });
});
