import { pageElements } from "@cypress/e2e/utils";

import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils.js";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";

const { homePageElements } = pageElements;
const {
  discoverPostsPage,
  discoverPostsPageBtn,
  followingPostsPage,
  followingPostsPageBtn,
} = homePageElements;
describe("Test navigation on home page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });
  it("tests the navigation of discover posts and following posts page on home page", () => {
    cy.wait(800)
    globalLoading();
    cy.getBySel(discoverPostsPageBtn).click();
    cy.getBySel(discoverPostsPage).should("be.visible");
    cy.getBySel(followingPostsPageBtn).click();
    cy.getBySel(followingPostsPage).should("be.visible");
  });
});
