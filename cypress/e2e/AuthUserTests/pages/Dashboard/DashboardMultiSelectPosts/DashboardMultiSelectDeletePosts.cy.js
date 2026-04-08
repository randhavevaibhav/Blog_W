import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { dashboardMultiSelectDeletePostsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardMultiSelectPosts/dashboardMultiSelectDeletePostsTests";

const { homePageElements } = pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;
const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard multiselect posts features - delete", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to delete multiple posts", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    cy.wait(800)
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    dashboardMultiSelectDeletePostsTests();

  });
});
