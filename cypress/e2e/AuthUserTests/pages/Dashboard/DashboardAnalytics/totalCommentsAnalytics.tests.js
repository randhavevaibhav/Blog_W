import {
  articlesLoading,
  globalLoading,
  individualPostLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {
  dashboardPageNavTest,
  getInterceptors,
} from "@cypress/e2e/AuthUserTests/utils";

import { updateLocalPostAnalytics } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";
import {
  createCommentPositiveTest,
  deleteCommentPositiveTest,
} from "@cypress/e2e/AuthUserTests/pages/IndividualPost/Comment/common";

const { dashBoardPageElements, postArticle, homePageElements } = pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;
const { dashboardLink } = deskTopMenuItems;
const { article } = postArticle;

const { dashboardTotalPostComments } = dashBoardPageElements;

const { interceptGetUserPosts, interceptGetUserStats, getInterceptorAlias } =
  getInterceptors();
const { getUserPostsRequestAlias, getUserStatsRequestAlias } =
  getInterceptorAlias();

const goToDashboard = () => {
  cy.getBySel(userAvatar).delayedClick();
  cy.getBySel(dashboardLink).delayedClick();
  dashboardPageNavTest();
};

const dashboardTotalCommentsAnalyticPositiveTest = () => {
  cy.getBySel(article).first().delayedClick();
  individualPostLoading();
  createCommentPositiveTest();
  goToDashboard();
  globalLoading();
  cy.wait(getUserPostsRequestAlias).then(() => {
    cy.wait(getUserStatsRequestAlias).then(() => {
      articlesLoading();
      cy.getBySel(dashboardTotalPostComments)
        .invoke("attr", `data-${dashboardTotalPostComments}`)
        .then((totalCommentsAfter) => {
          cy.window()
            .its("localStorage")
            .invoke("getItem", "totalComments")
            .then((totalCommentsBefore) => {
              expect(parseInt(totalCommentsBefore)).to.be.lessThan(
                parseInt(totalCommentsAfter)
              );
            });
        });
    });
  });
};

const dashboardTotalCommentsAnalyticNegativeTest = () => {
  cy.getBySel(article).first().delayedClick();
  individualPostLoading();
  updateLocalPostAnalytics();
  deleteCommentPositiveTest();
  goToDashboard();
  globalLoading();
  cy.wait(getUserPostsRequestAlias).then(() => {
    cy.wait(getUserStatsRequestAlias).then(() => {
      articlesLoading();
      cy.getBySel(dashboardTotalPostComments)
        .invoke("attr", `data-${dashboardTotalPostComments}`)
        .then((totalCommentsAfter) => {
          cy.window()
            .its("localStorage")
            .invoke("getItem", "totalComments")
            .then((totalCommentsBefore) => {
              expect(parseInt(totalCommentsAfter)).to.be.lessThan(
                parseInt(totalCommentsBefore)
              );
            });
        });
    });
  });
};
export const dashboardTotalCommentsAnalyticsTest = () => {
  updateLocalPostAnalytics();
  interceptGetUserPosts();
  interceptGetUserStats();
  dashboardTotalCommentsAnalyticPositiveTest();
  dashboardTotalCommentsAnalyticNegativeTest();
};
