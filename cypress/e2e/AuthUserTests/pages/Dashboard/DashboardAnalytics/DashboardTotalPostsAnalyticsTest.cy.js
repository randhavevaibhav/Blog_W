import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";
import { dashBoardAnalyticsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";

const { homePageElements } = pageElements;

const { userAvatar, deskTopMenuItems } = homePageElements;
const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard total posts feature", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if dashboard correctly displays  total posts analytics", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    dashBoardAnalyticsTests({testType:"dashboardTotalPostsAnalyticTest"});
  });
});
