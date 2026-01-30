import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";
import { homePageBookmarkPositiveTest } from "@cypress/e2e/AuthUserTests/pages/Home/HomeBookmark/common/homePageBookmarkPositiveTest";

const { homePageElements } = pageElements;

const { discoverPostsPageBtn } = homePageElements;

describe("Test add bookmark feature of discover page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if post bookmarked from discover posts page is appear first in bookmark page", () => {
    cy.getBySel(discoverPostsPageBtn).delayedClick();
    homePageBookmarkPositiveTest();
  });
});
