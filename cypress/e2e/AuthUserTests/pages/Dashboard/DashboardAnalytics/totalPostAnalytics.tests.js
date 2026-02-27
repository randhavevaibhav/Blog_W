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

const { interceptGetUserPosts, getInterceptorAlias, interceptDeletePost } =
  getInterceptors();
const { getUserPostsRequestAlias, deletePostRequestAlias } =
  getInterceptorAlias();
const dashboardTotalPostsAnalyticPositiveTest = () => {

  cy.getBySel(createPostBtn).click();
  globalLoading();
  createPostPageNavTest();
  createPostPositiveTest();

  cy.wait(getUserPostsRequestAlias).then(() => {
    articlesLoading();
    cy.wait(800);
    cy.getBySel(dashboardTotalPosts)
      .invoke("attr", `data-value`)
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
};

const deleteUserPostTest = () => {
  cy.getBySel(deletePostBtn).first().click();
  globalLoading();
  deletePostPageNavTest();
  cy.wait(500);
  cy.getBySel(deletePostSubmitBtn).click();
  cy.wait(deletePostRequestAlias);
  cy.wait(800);
};

const dashboardTotalPostsAnalyticNegativeTest = () => {
  updateLocalPostAnalytics();
  deleteUserPostTest();
  globalLoading();
  articlesLoading();

  cy.wait(getUserPostsRequestAlias).then(() => {
    articlesLoading();
    cy.wait(800);
    cy.getBySel(dashboardTotalPosts)
      .invoke("attr", `data-value`)
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
};

export const dashboardTotalPostsAnalyticTest = () => {
  interceptGetUserPosts();
  interceptDeletePost();

  dashboardTotalPostsAnalyticPositiveTest();
  cy.wait(1000);
  dashboardTotalPostsAnalyticNegativeTest();
};
