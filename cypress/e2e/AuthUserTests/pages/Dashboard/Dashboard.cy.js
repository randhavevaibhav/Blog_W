import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import { dashBoardAnalyticsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";
import { updatePostTest } from "@cypress/e2e/AuthUserTests/pages/Dashboard/common";
import { dashboardNavBaseTest } from "@cypress/e2e/AuthUserTests/authNavTests";
import { dashboardMultiSelectArchivePostsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardMultiSelectPosts/dashboardMultiSelectArchivePostsTests";
import { dashboardMultiSelectDeletePostsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardMultiSelectPosts/dashboardMultiSelectDeletePostsTests";
import { pageElements } from "@cypress/e2e/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

const { homePageElements } = pageElements;

const { deskTopMenuItems, userAvatar } = homePageElements;
const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if dashboard correctly displays post analytics", () => {
    dashboardNavBaseTest();
    dashBoardAnalyticsTests({ testType: "all" });
  });

  it("test if Auth user is able to update post from dashboard", () => {
    dashboardNavBaseTest();
    updatePostTest();
  });
  it("test if Auth user is able to perform multi select post article feature.", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    cy.wait(800);
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    dashboardMultiSelectArchivePostsTests();
    dashboardMultiSelectDeletePostsTests();
  });
});
