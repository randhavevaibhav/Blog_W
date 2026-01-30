import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {
  createPostPageNavTest,
  deletePostPageNavTest,
  getInterceptors,
} from "@cypress/e2e/AuthUserTests/utils";
import { createPostPositiveTest } from "@cypress/e2e/AuthUserTests/pages/CreatePost/common";
import { updateLocalPostAnalytics } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardAnalytics/common.tests";

const {
  dashBoardPageElements,

  homePageElements,
  deletePostPageElements,
} = pageElements;

const { createPostBtn } = homePageElements;

const { dashboardTotalPosts, deletePostBtn } = dashBoardPageElements;

const { deletePostSubmitBtn } = deletePostPageElements;

const {
  interceptGetUserPosts,
  interceptGetUserStats,
  getInterceptorAlias,
  interceptDeletePost,
} = getInterceptors();
const {
  getUserPostsRequestAlias,
  getUserStatsRequestAlias,
  deletePostRequestAlias,
} = getInterceptorAlias();
const dashboardTotalPostsAnalyticPositiveTest = () => {
  const postTitlePositiveTxt = `test post title ${
    Math.floor(Math.random() * 100) + 1
  }`;
  const postContentTxt = `test post content ${
    Math.floor(Math.random() * 100) + 1
  }`;
  cy.getBySel(createPostBtn).delayedClick();
  globalLoading();
  createPostPageNavTest();
  createPostPositiveTest({
    postContentTxt,
    postTitlePositiveTxt,
  });

  cy.wait(getUserPostsRequestAlias).then(() => {
    cy.wait(getUserStatsRequestAlias).then(() => {
      articlesLoading();
      cy.getBySel(dashboardTotalPosts)
        .invoke("attr", `data-${dashboardTotalPosts}`)
        .then((totalPostsAfter) => {
          cy.window()
            .its("localStorage")
            .invoke("getItem", "totalPosts")
            .then((totalPostsBefore) => {
              expect(parseInt(totalPostsBefore)).to.be.lessThan(
                parseInt(totalPostsAfter)
              );
            });
        });
    });
  });
};

const deleteUserPostTest = () => {
  cy.getBySel(deletePostBtn).first().delayedClick();
  globalLoading();
  deletePostPageNavTest();
  cy.getBySel(deletePostSubmitBtn).delayedClick();
  cy.wait(deletePostRequestAlias);
};

const dashboardTotalPostsAnalyticNegativeTest = () => {
  updateLocalPostAnalytics();
  deleteUserPostTest();
  globalLoading();
  articlesLoading();

  cy.wait(getUserPostsRequestAlias).then(() => {
    cy.wait(getUserStatsRequestAlias).then(() => {
      articlesLoading();
      cy.getBySel(dashboardTotalPosts)
        .invoke("attr", `data-${dashboardTotalPosts}`)
        .then((totalPostsAfter) => {
          cy.window()
            .its("localStorage")
            .invoke("getItem", "totalPosts")
            .then((totalPostsBefore) => {
              expect(parseInt(totalPostsAfter)).to.be.lessThan(
                parseInt(totalPostsBefore)
              );
            });
        });
    });
  });
};

export const dashboardTotalPostsAnalyticTest = () => {
  interceptGetUserPosts();
  interceptGetUserStats();
  interceptDeletePost();

  dashboardTotalPostsAnalyticPositiveTest();
  dashboardTotalPostsAnalyticNegativeTest();
};
