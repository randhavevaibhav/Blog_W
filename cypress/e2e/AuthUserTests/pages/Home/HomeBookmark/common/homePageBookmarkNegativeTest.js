import {
  bookmarkPageNavTest,
  homePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  articlesLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { homePageElements, postArticle, bookmarkPageElements } = pageElements;
const { bookmarkedArticles, userAvatar, deskTopMenuItems, siteLogo } =
  homePageElements;
const { bookmarkLink } = deskTopMenuItems;
const { bookmark, article } = postArticle;
const { bookmarkHeader } = bookmarkPageElements;

export const homePageBookmarkNegativeTest = () => {
  cy.wait(800);
  globalLoading();
  cy.get(bookmarkedArticles).first().as("firstSelectedArticle");
  cy.get("@firstSelectedArticle")
    .invoke("attr", "id")
    .as("nonBookmarkedArticleId");

  cy.get("@nonBookmarkedArticleId").then((bookmarkedId) => {
    cy.window()
      .its("localStorage")
      .invoke("setItem", "nonBookmarkedArticleId", bookmarkedId);
  });
  cy.get("@firstSelectedArticle").find(`#${bookmark}`).trigger("mouseover");
  //adding wait because hover over bookmark cause background fetch which re-render the component and cause test to fail
  cy.wait(1500);
  cy.get("@firstSelectedArticle")
    .find(`#${bookmark}`)
    .click({ scrollBehavior: false });
  cy.wait(1500);
  cy.getBySel(userAvatar).delayedClick();
  cy.wait(1500);
  cy.getBySel(bookmarkLink).delayedClick();
  cy.wait(1500);
  globalLoading();
  articlesLoading();
  bookmarkPageNavTest();

  cy.window()
    .its("localStorage")
    .invoke("getItem", "nonBookmarkedArticleId")
    .then((bookmarkedId) => {
      cy.get("body").then(($body) => {
        if ($body.find(article).length) {
          cy.wrap($body)
            .find(article)
            .find(`#${bookmarkedId}`)
            .should("not.exist");
        } else {
          // article does not exist → test passes
          cy.log("Article not present");
        }
      });
    });

  cy.window()
    .its("localStorage")
    .invoke("getItem", "nonBookmarkedArticleId")
    .then((bookmarkedId) => {
      cy.wait(1500);
      cy.getBySel(siteLogo).delayedClick();
      cy.wait(1500);
      homePageNavTest();
      cy.get(`#${bookmarkedId.trim()}`).should(
        "have.attr",
        "data-bookmark",
        "false"
      );
    });
};
