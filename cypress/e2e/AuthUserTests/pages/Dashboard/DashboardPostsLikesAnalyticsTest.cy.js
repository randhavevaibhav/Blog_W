import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";
import { dashBoardAnalyticsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/common";

const { homePageElements } = pageElements;

const { userAvatar, deskTopMenuItems } = homePageElements;
const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard total likes feature", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if dashboard correctly displays post likes analytics", () => {
    cy.getBySel(userAvatar).delayedClick();
    cy.getBySel(dashboardLink).delayedClick();
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    dashBoardAnalyticsTests({ type: "dashboardPostsLikesAnalyticTest" });
  });
});
