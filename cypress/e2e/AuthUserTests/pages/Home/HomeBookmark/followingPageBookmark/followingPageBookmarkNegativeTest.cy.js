import {
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";
import { homePageBookmarkNegativeTest } from "@cypress/e2e/AuthUserTests/pages/Home/HomeBookmark/common/homePageBookmarkNegativeTest";
const {homePageElements} = pageElements;
const {followingPostsPageBtn} = homePageElements;

describe("Test remove bookmark feature of following page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if post bookmarked from following posts page is appear first in bookmark page", () => {
    cy.getBySel(followingPostsPageBtn).click();
    homePageBookmarkNegativeTest();
  });
});
