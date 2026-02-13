/* 
////
NOTE - for bookmark test user should have ample amount of bookmarks with tags
////
*/ 



import {
  bookmarkPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";

const {
  homePageElements,
  bookmarkPageElements,
  tagFilterTrigger,
  tagListElement,
  postArticle,
  hashtagListElement,
  selectItemASC,
  selectItemDESC
} = pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;
const { article } = postArticle;
const { bookmarkedAtDate,customSelectBookmarkTrigger } =
  bookmarkPageElements;
const { bookmarkLink } = deskTopMenuItems;

const triggerASCSortBookmark = () => {
  cy.getBySel(customSelectBookmarkTrigger).click();
  cy.wait(500);
  cy.getBySel(selectItemASC).click();
  articlesLoading();
  cy.wait(500);
};

const triggerDESCSortBookmark = () => {
  cy.getBySel(customSelectBookmarkTrigger).click();
  cy.wait(500);
  cy.getBySel(selectItemDESC).click();
  articlesLoading();
  cy.wait(500);
};

const sortBookmarksASCTest = () => {
  //ensure all posts are in DESC order first
  triggerASCSortBookmark();
  triggerDESCSortBookmark();

  cy.getBySel(bookmarkedAtDate).then(($dates) => {
    const timestamps = [...$dates].map((el) => {
      return new Date(el.innerText).getTime();
    });

    const sortedAsc = [...timestamps].sort((a, b) => a - b);

    triggerASCSortBookmark();

    cy.getBySel(bookmarkedAtDate).then(($dates) => {
      const newTimestamps = [...$dates].map((el) => {
        return new Date(el.innerText).getTime();
      });

      expect(newTimestamps).to.deep.equal(sortedAsc);
    });
  });
};

const sortBookmarksDESCTest = () => {
  //ensure all posts are in ASC order first

  triggerDESCSortBookmark();
  triggerASCSortBookmark();

  cy.getBySel(bookmarkedAtDate).then(($dates) => {
    const timestamps = [...$dates].map((el) =>
      new Date(el.innerText).getTime(),
    );

    const sortedDesc = [...timestamps].sort((a, b) => b - a);

    triggerDESCSortBookmark();

    cy.getBySel(bookmarkedAtDate).then(($dates) => {
      const newTimestamps = [...$dates].map((el) =>
        new Date(el.innerText).getTime(),
      );

      expect(newTimestamps).to.deep.equal(sortedDesc);
    });
  });
};

const sortBookmarksTest = () => {
  sortBookmarksASCTest();
  sortBookmarksDESCTest();
};

const filterBookmarksByTagTest = () => {
  cy.getBySel(tagFilterTrigger).click();
  cy.getBySel(tagListElement)
    .eq(1)
    .then(($el) => {
      // 1. Extract the data-value
      const expectedTagValue = $el.attr("data-value");

      cy.wrap($el).click();
      articlesLoading();
      cy.wait(500);

      cy.getBySel(article)
        .first()
        .then(($el) => {
          cy.wrap($el).find(`[data-test=${hashtagListElement}]`).then(($els) => {
            const tagValues = Array.from($els, (el) =>
              el.getAttribute("data-value"),
            );

            // Assert that the array contains your specific value
            expect(tagValues).to.include(expectedTagValue);
          });
        });
    });
};

describe("Test Bookmarks features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to sort and filter bookmarks", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(bookmarkLink).click();
    globalLoading();
    articlesLoading();
    bookmarkPageNavTest();

    sortBookmarksTest();
    filterBookmarksByTagTest();
  });
});
