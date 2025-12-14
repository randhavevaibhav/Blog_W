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
  cy.wait(3000);
  cy.get("@firstSelectedArticle")
    .find(`#${bookmark}`)
    .click({ scrollBehavior: false });
  cy.wait(3000);
  cy.getBySel(userAvatar).click();
  cy.wait(3000);
  cy.getBySel(bookmarkLink).click();
  cy.wait(3000);
  globalLoading();
  articlesLoading();
  bookmarkPageNavTest();

  cy.window()
    .its("localStorage")
    .invoke("getItem", "nonBookmarkedArticleId")
    .then((bookmarkedId) => {
      cy.getBySel(article).find(`#${bookmarkedId}`).should("not.exist");
    });

  cy.window()
    .its("localStorage")
    .invoke("getItem", "nonBookmarkedArticleId")
    .then((bookmarkedId) => {
      cy.wait(3000);
      cy.getBySel(siteLogo).click();
      cy.wait(3000);
      homePageNavTest();
      cy.get(`#${bookmarkedId.trim()}`).should(
        "have.attr",
        "data-bookmark",
        "false"
      );
    });
};
