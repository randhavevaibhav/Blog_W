import {
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";
import { homePageBookmarkTestComm } from "@cypress/e2e/AuthUserTests/pages/Home/HomeBookmark/common/homePageBookmarkTestComm";
const {homePageElements} = pageElements;
const {followingPostsPageBtn} = homePageElements;

describe("Test bookmark feature of following page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if post bookmarked from following posts page is appear first in bookmark page", () => {
    cy.getBySel(followingPostsPageBtn).click();
    homePageBookmarkTestComm({
      type:'positive'
    })
  });
});
