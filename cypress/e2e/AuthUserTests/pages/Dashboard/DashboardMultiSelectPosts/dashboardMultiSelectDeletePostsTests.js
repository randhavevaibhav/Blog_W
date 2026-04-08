import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { dashBoardPageElements, postArticle } = pageElements;
const {
  deleteMultiplePostsBtn,
  deleteMultiplePostsCancelBtn,
  deleteMultiplePostsSubmitBtn,
  selectPost,
  deleteMultiplePostsModal,
} = dashBoardPageElements;
const { article } = postArticle;
export const dashboardMultiSelectDeletePostsTests = () => {
  cy.getBySel(article)
    .filter("[data-checked='false']")
    .filter(":lt(2)")
    .then(($elements) => {
      cy.wrap($elements).find(`[data-test="${selectPost}"]`).click({
        multiple: true,
      });
    });

  //click on delete multiple posts button
  cy.getBySel(deleteMultiplePostsBtn).click();
  //delete multiple post modal -ve test
  cy.getBySel(deleteMultiplePostsModal).should("be.visible");
  cy.getBySel(deleteMultiplePostsCancelBtn).click();
  cy.wait(500);
  cy.getBySel(deleteMultiplePostsModal).should("not.exist");
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

  //delete multiple post modal +ve test
  cy.wait(500);
  cy.getBySel(deleteMultiplePostsBtn).click();
  cy.wait(500);
  cy.getBySel(deleteMultiplePostsSubmitBtn).click();
  cy.wait(800);
  articlesLoading();
  globalLoading();
  cy.wait(500);
  cy.get("@firstSelectedArticleId").then((id) => {
    cy.get(`#${id}`).should("not.exist");
  });
  cy.get("@secondSelectedArticleId").then((id) => {
    cy.get(`#${id}`).should("not.exist");
  });
};
