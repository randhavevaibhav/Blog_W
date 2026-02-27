import {
  articlesLoading,
  globalLoading,
  individualPostLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements, paths } from "@cypress/e2e/utils";
import {
  createPostPageNavTest,
  dashboardPageNavTest,
  deletePostPageNavTest,
  editPostPageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";

import { commonCreatePostNegativeTest, commonCreatePostPositiveTest } from "@cypress/e2e/AuthUserTests/pages/CreatePost/common";

const {
  postArticle,
  dashBoardPageElements,
  individualPostPageElements,
  homePageElements,
  deletePostPageElements,
  editPostPageElements,
  createPostPageElements
  
} = pageElements;

const { getUserPostsPath, getUserStatsPath, deletePostPage } = paths;
const { like } = individualPostPageElements;
const { createPostBtn } = homePageElements;
const {createPostSubmitBtn} = createPostPageElements;
const {editPostSubmitBtn,backBtn} = editPostPageElements;
const { title } = postArticle;
const {
  dashboardTotalPosts,
  dashboardTotalPostLikes,
  dashboardTotalPostComments,
  deletePostBtn,
  editPostBtn
} = dashBoardPageElements;

const { deletePostSubmitBtn } = deletePostPageElements;

const dashboardDislikeCountTest = ({ redirect }) => {
  if (redirect) {
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", "data-value")
      .as("totalLikes");
    cy.get("@totalLikes").then((totalLikes) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "totalLikes", totalLikes);
    });
    cy.getBySel(title).first().click();
    individualPostLoading();
  }
  cy.getBySel(like).click();
  cy.go("back");
  globalLoading();
  dashboardPageNavTest();

  cy.wait("@getUserPosts").then(() => {
    articlesLoading();
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", "data-value")
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
};

const  dashboardLikeCountTest = ({ redirect }) => {
  if (redirect) {
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", "data-value")
      .as("totalLikes");
    cy.get("@totalLikes").then((totalLikes) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "totalLikes", totalLikes);
    });
    cy.getBySel(title).first().click();
    individualPostLoading();
  }
  cy.getBySel(like).click();
  cy.go("back");
  globalLoading();
  dashboardPageNavTest();

  cy.wait("@getUserPosts").then(() => {
    articlesLoading();
    cy.getBySel(dashboardTotalPostLikes)
      .invoke("attr", "data-value")
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
};

export const dashboardTotalPostsAnalyticPositiveTest = () => {
  cy.getBySel(createPostBtn).click();
  globalLoading();
  createPostPageNavTest();
  commonCreatePostPositiveTest({
    backFromPreviewPageNavTest:dashboardPageNavTest,
    submitPostBtn:createPostSubmitBtn
  });

  cy.wait("@getUserPosts").then(() => {
    articlesLoading();
    cy.getBySel(dashboardTotalPosts)
      .invoke("attr", "data-value")
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
  console.log("url ==> ", Cypress.env("apiURL") + deletePostPage + "/*");

  cy.getBySel(deletePostSubmitBtn).click();
  cy.wait("@deletePost");
};

const dashboardTotalPostsAnalyticNegativeTest = () => {
  deleteUserPostTest();
  globalLoading();
  articlesLoading();

  cy.wait("@getUserPosts").then(() => {
    articlesLoading();
    cy.getBySel(dashboardTotalPosts)
      .invoke("attr", "data-value")
      .then((totalPostsAfter) => {
        cy.window()
          .its("localStorage")
          .invoke("getItem", "totalPosts")
          .then((totalPostsBefore) => {
            expect(parseInt(totalPostsAfter)).to.be.equal(
              parseInt(totalPostsBefore)
            );
          });
      });
  });
};

export const dashboardPostsLikesAnalyticTest = () => {
  cy.getBySel(dashboardTotalPostLikes)
    .invoke("attr", "data-value")
    .as("totalLikes");
  cy.get("@totalLikes").then((totalLikes) => {
    cy.window().its("localStorage").invoke("setItem", "totalLikes", totalLikes);
  });

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

export const dashboardTotalPostsAnalyticTest = () => {
  dashboardTotalPostsAnalyticPositiveTest();
  dashboardTotalPostsAnalyticNegativeTest();
};

export const dashBoardAnalyticsTests = ({ test = "all" }) => {
  cy.intercept("GET", Cypress.env("apiURL") + getUserPostsPath + "/*").as(
    "getUserPosts"
  );
  cy.intercept("GET", Cypress.env("apiURL") + getUserStatsPath + "/*").as(
    "getUserStats"
  );

  cy.intercept("DELETE", Cypress.env("apiURL") + deletePostPage + "/**").as(
    "deletePost"
  );

  cy.getBySel(dashboardTotalPostLikes)
    .invoke("attr", "data-value")
    .as("totalLikes");
  cy.getBySel(dashboardTotalPostComments)
    .invoke("attr", "data-value")
    .as("totalComments");
  cy.getBySel(dashboardTotalPosts)
    .invoke("attr", "data-value")
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

  switch (test) {
    case "dashboardPostsLikesAnalyticTest":
      {
        dashboardPostsLikesAnalyticTest();
      }
      break;
    case "dashboardTotalPostsAnalyticTest":
      {
        dashboardTotalPostsAnalyticTest();
      }
      break;
    case "all":
      {
        dashboardPostsLikesAnalyticTest();
        dashboardTotalPostsAnalyticTest();
      }
      break;
    default:
      throw new Error(`invalid value for dashboard tests`);
  }
};



export const updatePostNegativeTest = () => {
  cy.getBySel(backBtn).click();
  globalLoading();
  articlesLoading();
  cy.wait(800);
  dashboardPageNavTest();

  cy.getBySel(editPostBtn).first().click();
  globalLoading();
  cy.wait(800);
  commonCreatePostNegativeTest({
    submitPostBtn:editPostSubmitBtn
  });
};

export const updatePostPositiveTest = () => {
  commonCreatePostPositiveTest({
    backFromPreviewPageNavTest:editPostPageNavTest,
    submitPostBtn:editPostSubmitBtn
  });
};

export const updatePostTest = () => {
  cy.getBySel(editPostBtn).first().click();
  globalLoading();
  cy.wait(800);

  updatePostNegativeTest();
  updatePostPositiveTest();
};

