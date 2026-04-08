import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { dashBoardPageElements, postArticle } = pageElements;
const {
  archiveMultiplePostsBtn,
  archiveMultiplePostsSubmitBtn,
  archiveMultiplePostsCancelBtn,
  selectPost,
  archiveMultiplePostsModal,
  viewAllPostsBtn,
  viewArchivePostsBtn,
} = dashBoardPageElements;

const { article } = postArticle;

export const dashboardMultiSelectArchivePostsTests = () => {
  //select first 2 articles

  cy.getBySel(article)
    .filter("[data-checked='false']")
    .filter(":lt(2)")
    .then(($elements) => {
      cy.wrap($elements).find(`[data-test="${selectPost}"]`).click({
        multiple: true,
      });
    });
  //click on archive multiple posts button
  cy.getBySel(archiveMultiplePostsBtn).click();
  //archive multiple post modal -ve test
  cy.getBySel(archiveMultiplePostsModal).should("be.visible");
  cy.getBySel(archiveMultiplePostsCancelBtn).click();
  cy.wait(500);
  cy.getBySel(archiveMultiplePostsModal).should("not.exist");
  //re-select articles
  cy.getBySel(article)
    .filter("[data-checked='false']")
    .filter(":lt(2)")
    .then(($elements) => {
      cy.wrap($elements).find(`[data-test="${selectPost}"]`).click({
        multiple: true,
      });
      cy.wait(500);
      cy.wrap($elements).each(($ele, idx) => {
        if (idx === 0) {
          cy.wrap($ele).invoke("attr", "id").as("firstSelectedArticleId");
        } else if (idx === 1) {
          cy.wrap($ele).invoke("attr", "id").as("secondSelectedArticleId");
        }
      });
    });

  //archive multiple post modal +ve test
  cy.wait(500);
  cy.getBySel(archiveMultiplePostsBtn).click();
  cy.wait(500);
  cy.getBySel(archiveMultiplePostsSubmitBtn).click();
  articlesLoading();
  globalLoading();
  cy.wait(500);
  cy.getBySel(viewArchivePostsBtn).click();
  globalLoading();
  articlesLoading();
  cy.get("@firstSelectedArticleId").then((id) => {
    cy.get(`#${id}`).should("exist");
  });
  cy.get("@secondSelectedArticleId").then((id) => {
    cy.get(`#${id}`).should("exist");
  });

  //un-archive selected posts

  cy.get("@firstSelectedArticleId").then((id) => {
    cy.get(`#${id}`).find(`[data-test="${selectPost}"]`).click();
  });

  cy.get("@secondSelectedArticleId").then((id) => {
    cy.get(`#${id}`).find(`[data-test="${selectPost}"]`).click();
  });

  cy.wait(500);
  cy.getBySel(archiveMultiplePostsBtn).click();
  cy.wait(500);
  cy.getBySel(archiveMultiplePostsSubmitBtn).click();
  articlesLoading();
  globalLoading();
  cy.wait(500);
  cy.getBySel(viewAllPostsBtn).click();
  globalLoading();
  articlesLoading();
  cy.get("@firstSelectedArticleId").then((id) => {
    cy.get(`#${id}`).should("exist");
  });
  cy.get("@secondSelectedArticleId").then((id) => {
    cy.get(`#${id}`).should("exist");
  });
};
