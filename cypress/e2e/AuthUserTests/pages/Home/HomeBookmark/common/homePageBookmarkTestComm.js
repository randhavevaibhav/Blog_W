import { homePageNavTest } from "@cypress/e2e/AuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { homePageElements, postArticle, bookmarkPageElements } = pageElements;
const {
  nonBookmarkedArticles,
  userAvatar,
  deskTopMenuItems,
  siteLogo,
  bookmarkedArticles,
} = homePageElements;
const { bookmarkLink } = deskTopMenuItems;
const { bookmark, article } = postArticle;
const { bookmarkHeader } = bookmarkPageElements;

export const homePageBookmarkTestComm = ({ type = "positive" }) => {
  let typeOfArticles = null;

  if (type === "positive") {
    typeOfArticles = nonBookmarkedArticles;
  } else if (type === "negative") {
    typeOfArticles = bookmarkedArticles;
  }

  let bookmarkedArticleId = "";
  let nonBookmarkArticle = null;
  cy.wait(800);
  nonBookmarkArticle = cy
    .get(typeOfArticles)
    .first()
    .as("firstSelectedArticle");
  cy.get("@firstSelectedArticle")
    .invoke("attr", "id")
    .as("bookmarkedArticleId");
  cy.get("@firstSelectedArticle").find(`#${bookmark}`).trigger("mouseover");
  cy.wait(1000);
  cy.get("@firstSelectedArticle")
    .find(`#${bookmark}`)
    .click({ scrollBehavior: false });
  cy.getBySel(userAvatar).click();
  cy.getBySel(bookmarkLink).click();
  cy.getBySel(bookmarkHeader);
  if (type === "positive") {
    cy.getBySel(article)
      .first()
      .invoke("attr", "id")
      .then((firstBookmarkId) => {
        cy.get("@bookmarkedArticleId").then((bookmarkedId) => {
          bookmarkedArticleId = bookmarkedId;
          expect(firstBookmarkId.trim()).to.equal(bookmarkedId.trim());
          cy.getBySel(siteLogo).click();
          homePageNavTest();
          cy.get(`#${bookmarkedArticleId}`).should(
            "have.attr",
            "data-bookmark",
            "true"
          );
        });
      });
  } else if (type === "negative") {
    //check negative
    // cy.get("@firstSelectedArticle");
  }
};
