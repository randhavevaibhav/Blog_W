import { homePageNavTest } from "@cypress/e2e/AuthUserTests/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
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
  globalLoading();
  nonBookmarkArticle = cy
    .get(typeOfArticles)
    .first()
    .as("firstSelectedArticle");
  cy.get("@firstSelectedArticle")
    .invoke("attr", "id")
    .as("bookmarkedArticleId");
  cy.get("@firstSelectedArticle").find(`#${bookmark}`).trigger("mouseover");
  //adding wait because hover over bookmark cause background fetch which re-render the component and cause test to fail
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
