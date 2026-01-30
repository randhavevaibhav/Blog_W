import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { dashBoardAnalyticsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";
import { pageElements } from "@cypress/e2e/utils";

const { homePageElements } = pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;
const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if dashboard correctly displays post analytics", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();

    dashBoardAnalyticsTests({ testType: "all" });
  });
});
