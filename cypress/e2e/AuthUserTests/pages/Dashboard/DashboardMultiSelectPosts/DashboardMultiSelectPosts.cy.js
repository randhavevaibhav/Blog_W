import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { dashboardMultiSelectArchivePostsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardMultiSelectPosts/dashboardMultiSelectArchivePostsTests";
import { dashboardMultiSelectDeletePostsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardMultiSelectPosts/dashboardMultiSelectDeletePostsTests";

const { homePageElements, dashBoardPageElements, postArticle } = pageElements;
const {
  selectAllPosts,
  selectPost,
  deleteMultiplePostsBtn,
  archiveMultiplePostsBtn,
} = dashBoardPageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;
const { article } = postArticle;

const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard multiselect posts features - archive,delete", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to select/deselect multiple posts", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    cy.wait(800);
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    cy.getBySel(selectAllPosts).click();
    cy.wait(300);
    cy.getBySel(article).last().should("have.attr", "data-checked", "true");
    cy.getBySel(selectAllPosts).click();
    cy.wait(300);
    cy.getBySel(article).last().should("have.attr", "data-checked", "false");
  });

  it("test if archive and delete multiple posts btn shows correct no. of selected posts", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    cy.wait(800);
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    //select first 3 articles

    cy.getBySel(article)
      .filter("[data-checked='false']")
      .filter(":lt(3)")
      .then(($elements) => {
        cy.wrap($elements).find(`[data-test="${selectPost}"]`).click({
          multiple: true,
        });
      });
    cy.wait(300);
    //check no. of selected posts
    cy.getBySel(deleteMultiplePostsBtn).should(
      "have.attr",
      "data-total-selected-posts",
      "3",
    );
    cy.getBySel(archiveMultiplePostsBtn).should(
      "have.attr",
      "data-total-selected-posts",
      "3",
    );

    // //deselect first article
    cy.getBySel(article).first().find(`[data-test="${selectPost}"]`).click();

    // //check no. of selected posts
    cy.getBySel(deleteMultiplePostsBtn).should(
      "have.attr",
      "data-total-selected-posts",
      "2",
    );
    cy.getBySel(archiveMultiplePostsBtn).should(
      "have.attr",
      "data-total-selected-posts",
      "2",
    );

    // //deselect all articles one-by-one
    cy.getBySel(article)
      .filter("[data-checked='true']")
      .then(($elements) => {
        cy.wrap($elements).find(`[data-test="${selectPost}"]`).click({
          multiple: true,
        });
      });

    // //check deleteMultiplePostsBtn and archiveMultiplePostsBtn does not exist
    cy.getBySel(deleteMultiplePostsBtn).should("not.exist");
    cy.getBySel(archiveMultiplePostsBtn).should("not.exist");
  });

  it("test if user is able to archive/un-archive multiple posts", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    cy.wait(800);
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    dashboardMultiSelectArchivePostsTests();
  });

  it("test if user is able to delete multiple posts", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    cy.wait(800);
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    dashboardMultiSelectDeletePostsTests();
  });
});
