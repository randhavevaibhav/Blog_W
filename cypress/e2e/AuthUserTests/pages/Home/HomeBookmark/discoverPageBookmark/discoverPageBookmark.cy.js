import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";

import { homePageBookmarkTestComm } from "@cypress/e2e/AuthUserTests/pages/Home/HomeBookmark/common/homePageBookmarkTestComm";
import { pageElements } from "@cypress/e2e/utils";

const { homePageElements } = pageElements;
const { discoverPostsPageBtn } = homePageElements;

describe("Test bookmark feature of discover page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if post bookmarked from discover posts page is appear first in bookmark page", () => {
    cy.getBySel(discoverPostsPageBtn).click();
    homePageBookmarkTestComm({
      type:'positive'
    });
  });
});
