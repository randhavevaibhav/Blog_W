import {
  articlesLoading,
  globalLoading,
  individualPostLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { dashboardPageNavTest } from "@cypress/e2e/AuthUserTests/utils";
import { updateLocalPostAnalytics } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";
import { getInterceptors } from "@cypress/e2e/AuthUserTests/utils";
const { postArticle, dashBoardPageElements, individualPostPageElements } =
  pageElements;

const { like } = individualPostPageElements;

const { article } = postArticle;
const { dashboardTotalPostLikes } = dashBoardPageElements;

const { interceptGetUserPosts, interceptGetUserStats, getInterceptorAlias } =
  getInterceptors();
const { getUserPostsRequestAlias, getUserStatsRequestAlias } =
  getInterceptorAlias();

const dashboardLikeCountTest = ({ redirect }) => {
  if (redirect) {
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", `data-${dashboardTotalPostLikes}`)
      .as("totalLikes");
    cy.get("@totalLikes").then((totalLikes) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "totalLikes", totalLikes);
    });
    cy.getBySel(article).first().delayedClick();
    individualPostLoading();
  }
  cy.getBySel(like).delayedClick();
  cy.go("back");
  globalLoading();
  dashboardPageNavTest();

  cy.wait(getUserPostsRequestAlias).then(() => {
    cy.wait(getUserStatsRequestAlias).then(() => {
      articlesLoading();
      cy.getBySel(dashboardTotalPostLikes)
        .invoke("attr", `data-${dashboardTotalPostLikes}`)
        .then((totalLikesAfter) => {
          cy.window()
            .its("localStorage")
            .invoke("getItem", "totalLikes")
            .then((totalLikesBefore) => {
              expect(parseInt(totalLikesAfter)).to.be.lessThan(
                parseInt(totalLikesBefore)
              );
            });
        });
    });
  });
};

const dashboardDislikeCountTest = ({ redirect }) => {
  if (redirect) {
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", `data-${dashboardTotalPostLikes}`)
      .as("totalLikes");
    cy.get("@totalLikes").then((totalLikes) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "totalLikes", totalLikes);
    });
    cy.getBySel(article).first().delayedClick();
    individualPostLoading();
  }
  cy.getBySel(like).delayedClick();
  cy.go("back");
  globalLoading();
  dashboardPageNavTest();

  cy.wait(getUserPostsRequestAlias).then(() => {
    cy.wait(getUserStatsRequestAlias).then(() => {
      articlesLoading();
      cy.getBySel(dashboardTotalPostLikes)
        .invoke("attr", `data-${dashboardTotalPostLikes}`)
        .then((totalLikesAfter) => {
          cy.window()
            .its("localStorage")
            .invoke("getItem", "totalLikes")
            .then((totalLikesBefore) => {
              expect(parseInt(totalLikesAfter)).to.be.greaterThan(
                parseInt(totalLikesBefore)
              );
            });
        });
    });
  });
};

export const dashboardTotalPostsLikesAnalyticTest = () => {
  interceptGetUserPosts();
  interceptGetUserStats();

  updateLocalPostAnalytics();
  cy.getBySel(article).first().delayedClick();
  individualPostLoading();
  cy.getBySel(like).invoke("attr", "data-is-liked").as("isLiked");
  cy.get("@isLiked").then((isLiked) => {
    if (isLiked === "true") {
      dashboardLikeCountTest({ redirect: false });
      dashboardDislikeCountTest({ redirect: true });
    } else if (isLiked === "false") {
      dashboardDislikeCountTest({ redirect: false });
      dashboardLikeCountTest({ redirect: true });
    }
  });
};
