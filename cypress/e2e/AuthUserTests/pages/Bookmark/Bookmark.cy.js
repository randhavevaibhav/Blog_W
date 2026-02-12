import {
  bookmarkPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";

const { homePageElements, bookmarkPageElements, customSelectTrigger } =
  pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;
const { bookmarkedAtDate, sortBookmarksASCSelect, sortBookmarksDESCSelect } =
  bookmarkPageElements;
const { bookmarkLink } = deskTopMenuItems;

describe("Test Bookmarks features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to sort bookmarks", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(bookmarkLink).click();
    globalLoading();
    articlesLoading();
    bookmarkPageNavTest();

    cy.getBySel(bookmarkedAtDate).then(($dates) => {
      const timestamps = [...$dates].map((el) =>
        new Date(el.innerText).getTime(),
      );

      // For descending order (newest first)
      //   const sortedDesc = [...timestamps].sort((a, b) => b - a);
      // For ascending order (oldest first)
      const sortedAsc = [...timestamps].sort((a, b) => a - b);

      cy.getBySel(customSelectTrigger).click();
      cy.wait(500);
      cy.getBySel(sortBookmarksASCSelect).click();
      articlesLoading();
      cy.wait(800);

      cy.getBySel(bookmarkedAtDate).then(($dates) => {
        const newTimestamps = [...$dates].map((el) =>
          new Date(el.innerText).getTime(),
        );

         expect(newTimestamps).to.deep.equal(sortedAsc);
      });

     
    });
  });
});
