import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";

import { homePageBookmarkNegativeTest } from "@cypress/e2e/AuthUserTests/pages/Home/HomeBookmark/common/homePageBookmarkNegativeTest";

const { homePageElements } = pageElements;

const { discoverPostsPageBtn } = homePageElements;

describe("Test remove bookmark feature of discover page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if post removed as bookmarked from discover posts page is not on the bookmark page", () => {
    cy.getBySel(discoverPostsPageBtn).delayedClick();
    homePageBookmarkNegativeTest();
  });
});
