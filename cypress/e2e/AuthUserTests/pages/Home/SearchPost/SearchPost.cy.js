import {
  searchPostPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
  individualPostNavTest,
  searchSuggestionsLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";

const {
  postArticle,
  searchPostInput,
  searchSuggestionItem,
  homePageElements,
  searchPostBtn,
  noSearchPostFound,
} = pageElements;
const { siteLogo } = homePageElements;

const searchPostSuggestionTest = ({ type }) => {
  if (!(type === "negative")) {
    cy.getBySel(postArticle.title)
      .first()
      .then(($title) => {
        const postTitle = $title.attr("data-value");
        cy.getBySel(searchPostInput).should("be.visible");
        cy.getBySel(searchPostInput).filter(":visible").clear().type(postTitle);
        cy.wait(500);
        searchSuggestionsLoading();

        cy.getBySel(searchSuggestionItem)
          .first()
          .then(($item) => {
            const suggestionPostTitle = $item.attr("data-value");
            expect(suggestionPostTitle).to.equal(postTitle);
          });
      });
  } else {
    cy.getBySel(searchPostInput).should("be.visible");
    cy.getBySel(searchPostInput)
      .filter(":visible")
      .clear()
      .type("sdfs sfsad adas  sd12312 dsadas  @#213qe qwqw");
    cy.wait(500);
    searchSuggestionsLoading();
    cy.getBySel(noSearchPostFound).should("be.visible");
    cy.getBySel(searchPostBtn).filter(":visible").click();
    globalLoading();
    articlesLoading();
    searchPostPageNavTest();
    cy.getBySel(noSearchPostFound).should("be.visible");
  }
};

describe("Test user is able to search posts", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if auth user is able to search post and able to see search suggestions and able to navigate to search posts page", () => {
    globalLoading();
    articlesLoading();

    searchPostSuggestionTest({
      type: "positive",
    });
    cy.getBySel(searchSuggestionItem).first().click();
    globalLoading();
    articlesLoading();
    individualPostNavTest();

    cy.getBySel(siteLogo).click();
    globalLoading();
    articlesLoading();
    searchPostSuggestionTest({
      type: "positive",
    });
    cy.getBySel(searchPostBtn).filter(":visible").click();
    globalLoading();
    articlesLoading();
    searchPostPageNavTest();

    searchPostSuggestionTest({
      type: "negative",
    });
  });
});
