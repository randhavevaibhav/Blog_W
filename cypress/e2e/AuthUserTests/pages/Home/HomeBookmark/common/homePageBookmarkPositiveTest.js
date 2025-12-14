import {
  bookmarkPageNavTest,
  homePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { homePageElements, postArticle, bookmarkPageElements } = pageElements;
const { nonBookmarkedArticles, userAvatar, deskTopMenuItems, siteLogo } =
  homePageElements;
const { bookmarkLink } = deskTopMenuItems;
const { bookmark, article } = postArticle;
const { bookmarkHeader } = bookmarkPageElements;

export const homePageBookmarkPositiveTest = () => {
  let bookmarkedArticleId = "";
  cy.wait(800);
  globalLoading();
  cy.get(nonBookmarkedArticles).first().as("firstSelectedArticle");
  cy.get("@firstSelectedArticle")
    .invoke("attr", "id")
    .as("bookmarkedArticleId");
  cy.get("@firstSelectedArticle").find(`#${bookmark}`).trigger("mouseover");
  //adding wait because hover over bookmark cause background fetch which re-render the component and cause test to fail
  cy.wait(3000);
  cy.get("@firstSelectedArticle")
    .find(`#${bookmark}`)
    .click({ scrollBehavior: false });
  cy.getBySel(userAvatar).click();
  cy.wait(3000);
  cy.getBySel(bookmarkLink).click();
  cy.wait(3000);
  cy.wait(800);
  globalLoading();
  articlesLoading();
  bookmarkPageNavTest();

  cy.getBySel(article)
    .first()
    .invoke("attr", "id")
    .then((firstBookmarkId) => {
      cy.get("@bookmarkedArticleId").then((bookmarkedId) => {
        bookmarkedArticleId = bookmarkedId;
        expect(firstBookmarkId.trim()).to.equal(bookmarkedId.trim());
        cy.wait(3000);
        cy.getBySel(siteLogo).click();
        cy.wait(3000);
        homePageNavTest();
        cy.get(`#${bookmarkedArticleId}`).should(
          "have.attr",
          "data-bookmark",
          "true"
        );
      });
    });
};
