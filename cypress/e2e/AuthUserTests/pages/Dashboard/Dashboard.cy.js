import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
  individualPostLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements, paths } from "@cypress/e2e/utils";

const {
  homePageElements,
  postArticle,
  dashBoardPageElements,
  individualPostPageElements,
} = pageElements;

const { getUserPostsPath, getUserStatsPath } = paths;

const { deskTopMenuItems, userAvatar } = homePageElements;
const { like } = individualPostPageElements;
const { article } = postArticle;
const { dashboardLink } = deskTopMenuItems;
const {
  dashboardTotalPosts,
  dashboardTotalPostLikes,
  dashboardTotalPostComments,
} = dashBoardPageElements;

const dashboardLikeDiskCountTest = () => {
  cy.intercept("GET", Cypress.env("apiURL") + getUserPostsPath + "/*").as(
    "getUserPosts"
  );
  cy.intercept("GET", Cypress.env("apiURL") + getUserStatsPath + "/*").as(
    "getUserStats"
  );
  cy.getBySel(article).first().click();
  individualPostLoading();
  cy.getBySel(like).invoke("attr", "data-is-liked").as("isLiked");
  cy.get("@isLiked").then((isLiked) => {
    if (isLiked === "true") {
      cy.getBySel(like).click();
      cy.go("back");
      globalLoading();
      dashboardPageNavTest();
      
      cy.wait("@getUserPosts").then(() => {
        cy.wait("@getUserStats").then(() => {
            articlesLoading();
          cy.getBySel(dashboardTotalPostLikes)
            .invoke("text")
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
    } else if (isLiked === "false") {
      cy.getBySel(like).click();
      cy.go("back");
      globalLoading();
      dashboardPageNavTest();
    
      cy.wait("@getUserPosts").then(() => {
        cy.wait("@getUserStats").then(() => {
            articlesLoading();
          cy.getBySel(dashboardTotalPostLikes)
            .invoke("text")
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
    }
  });
};

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
    cy.getBySel(dashboardTotalPostLikes).invoke("text").as("totalLikes");
    cy.getBySel(dashboardTotalPostComments).invoke("text").as("totalComments");
    cy.getBySel(dashboardTotalPosts).invoke("text").as("totalPosts");

    cy.get("@totalLikes").then((totalLikes) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "totalLikes", totalLikes);
    });
    cy.get("@totalComments").then((totalComments) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "totalComments", totalComments);
    });
    cy.get("@totalPosts").then((totalPosts) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "totalPosts", totalPosts);
    });

    dashboardLikeDiskCountTest();
  });
});
