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
const { title } = postArticle;

const { dashboardTotalPostComments } = dashBoardPageElements;

const { interceptGetUserPosts, getInterceptorAlias } = getInterceptors();
const { getUserPostsRequestAlias } = getInterceptorAlias();

const goToDashboard = () => {
  cy.getBySel(userAvatar).click();
  cy.getBySel(dashboardLink).click();
  dashboardPageNavTest();
};

const dashboardTotalCommentsAnalyticPositiveTest = () => {
  cy.getBySel(title).first().click();
  individualPostLoading();
  createCommentPositiveTest();
  goToDashboard();
  globalLoading();
  cy.wait(getUserPostsRequestAlias).then(() => {
    articlesLoading();
    cy.wait(800);
    cy.getBySel(dashboardTotalPostComments)
      .invoke("attr", `data-value`)
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
};

const dashboardTotalCommentsAnalyticNegativeTest = () => {
  updateLocalPostAnalytics();
  cy.getBySel(title).first().click();
  individualPostLoading();

  deleteCommentPositiveTest();
  goToDashboard();
  globalLoading();
  cy.wait(getUserPostsRequestAlias).then(() => {
    articlesLoading();
    cy.wait(1000);
    cy.getBySel(dashboardTotalPostComments)
      .invoke("attr", `data-value`)
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
};
export const dashboardTotalCommentsAnalyticsTest = () => {
  updateLocalPostAnalytics();
  interceptGetUserPosts();
  dashboardTotalCommentsAnalyticPositiveTest();
  dashboardTotalCommentsAnalyticNegativeTest();
};
