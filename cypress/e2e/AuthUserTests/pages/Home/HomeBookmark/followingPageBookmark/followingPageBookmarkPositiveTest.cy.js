import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";
import { homePageBookmarkPositiveTest } from "@cypress/e2e/AuthUserTests/pages/Home/HomeBookmark/common/homePageBookmarkPositiveTest";
const { homePageElements } = pageElements;
const { followingPostsPageBtn } = homePageElements;

describe("Test add bookmark feature of following page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if post bookmarked from following posts page is appear first in bookmark page", () => {
    cy.getBySel(followingPostsPageBtn).click();
    homePageBookmarkPositiveTest();
  });
});
