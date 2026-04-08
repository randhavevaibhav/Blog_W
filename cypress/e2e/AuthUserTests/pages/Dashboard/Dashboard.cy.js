import {
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import { dashBoardAnalyticsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";
import { updatePostTest } from "@cypress/e2e/AuthUserTests/pages/Dashboard/common";
import {
  dashboardNavBaseTest
} from "@cypress/e2e/AuthUserTests/authNavTests";
import { dashboardMultiSelectDeletePostsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardMultiSelectPosts/DashboardMultiSelectDeletePosts.cy";
import { dashboardMultiSelectDeletePostsTests } from "./DashboardMultiSelectPosts/dashboardMultiSelectDeletePostsTests";



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
   dashboardMultiSelectDeletePostsTests();
   dashboardMultiSelectDeletePostsTests();
  });
});
