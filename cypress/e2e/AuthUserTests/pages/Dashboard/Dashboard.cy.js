import {
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import { dashBoardAnalyticsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";
import { updatePostTest } from "@cypress/e2e/AuthUserTests/pages/Dashboard/common";
import {
  dashboardNavBaseTest
} from "@cypress/e2e/AuthUserTests/authNavTests";



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
});
