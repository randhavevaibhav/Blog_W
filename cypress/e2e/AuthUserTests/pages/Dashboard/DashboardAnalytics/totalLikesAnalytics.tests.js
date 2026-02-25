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

const { title } = postArticle;
const { dashboardTotalPostLikes } = dashBoardPageElements;

const { interceptGetUserPosts, getInterceptorAlias } = getInterceptors();
const { getUserPostsRequestAlias } = getInterceptorAlias();

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
    cy.getBySel(title).first().click();
    individualPostLoading();
  }
  cy.wait(800);
  cy.getBySel(like).click();
  cy.go("back");
  cy.wait(800);
  globalLoading();
  dashboardPageNavTest();

  cy.wait(getUserPostsRequestAlias).then(() => {
    articlesLoading();
    cy.wait(800);
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", `data-${dashboardTotalPostLikes}`)
      .then((totalLikesAfter) => {
        cy.window()
          .its("localStorage")
          .invoke("getItem", "totalLikes")
          .then((totalLikesBefore) => {
            expect(parseInt(totalLikesAfter)).to.be.lessThan(
              parseInt(totalLikesBefore),
            );
          });
      });
  });
};

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
    cy.getBySel(title).first().click();
    individualPostLoading();
  }
  cy.wait(800);
  cy.getBySel(like).click();
  cy.wait(800);
  cy.go("back");
  globalLoading();
  dashboardPageNavTest();

  cy.wait(getUserPostsRequestAlias).then(() => {
    articlesLoading();
    cy.wait(800);
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", `data-${dashboardTotalPostLikes}`)
      .then((totalLikesAfter) => {
        cy.window()
          .its("localStorage")
          .invoke("getItem", "totalLikes")
          .then((totalLikesBefore) => {
            expect(parseInt(totalLikesAfter)).to.be.greaterThan(
              parseInt(totalLikesBefore),
            );
          });
      });
  });
};

export const dashboardTotalPostsLikesAnalyticTest = () => {
  interceptGetUserPosts();

  updateLocalPostAnalytics();
  cy.getBySel(title).first().click();
  individualPostLoading();
  cy.getBySel(like).invoke("attr", "data-is-liked").as("isLiked");
  cy.get("@isLiked").then((isLiked) => {
    if (isLiked === "true") {
      dashboardDislikeCountTest({ redirect: false });
      dashboardLikeCountTest({ redirect: true });
    } else if (isLiked === "false") {
      dashboardLikeCountTest({ redirect: false });
      dashboardDislikeCountTest({ redirect: true });
    }
  });
};
