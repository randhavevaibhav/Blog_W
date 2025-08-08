import { pageElements } from "@cypress/e2e/utils";

import { dashboardTotalPostsAnalyticTest } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/totalPostAnalytics.tests";
import { dashboardTotalPostsLikesAnalyticTest } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/totalLikesAnalytics.tests";
import { dashboardTotalCommentsAnalyticsTest } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/totalCommentsAnalytics.tests";

const { dashBoardPageElements } = pageElements;

const {
  dashboardTotalPosts,
  dashboardTotalPostLikes,
  dashboardTotalPostComments,
} = dashBoardPageElements;

export const updateLocalPostAnalytics = () => {
  cy.getBySel(dashboardTotalPostLikes)
    .invoke("attr", "data-dashboard-total-likes")
    .as("totalLikes");
  cy.getBySel(dashboardTotalPostComments)
    .invoke("attr", "data-dashboard-total-comments")
    .as("totalComments");
  cy.getBySel(dashboardTotalPosts)
    .invoke("attr", "data-dashboard-total-posts")
    .as("totalPosts");

  cy.get("@totalLikes").then((totalLikes) => {
    cy.window().its("localStorage").invoke("setItem", "totalLikes", totalLikes);
  });
  cy.get("@totalComments").then((totalComments) => {
    cy.window()
      .its("localStorage")
      .invoke("setItem", "totalComments", totalComments);
  });
  cy.get("@totalPosts").then((totalPosts) => {
    cy.window().its("localStorage").invoke("setItem", "totalPosts", totalPosts);
  });
};

export const dashBoardAnalyticsTests = ({ testType = "all" }) => {
  updateLocalPostAnalytics();

  switch (testType) {
    case "dashboardTotalPostsLikesAnalyticTest":
      {
        dashboardTotalPostsLikesAnalyticTest();
      }
      break;
    case "dashboardTotalPostsAnalyticTest":
      {
        dashboardTotalPostsAnalyticTest();
      }
      break;

       case "dashboardTotalCommentsAnalyticsTest":
      {
        dashboardTotalCommentsAnalyticsTest();
      }
      break;
    case "all":
      {
        dashboardTotalPostsLikesAnalyticTest();
        dashboardTotalPostsAnalyticTest();
        dashboardTotalCommentsAnalyticsTest();
      }
      break;
    default:
      throw new Error(`invalid value for dashboard tests`);
  }
};
