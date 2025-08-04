import {
  deleteCommentPageNavTest,
  editCommentPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  commentsLoading,
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements, paths } from "@cypress/e2e/utils";

const {
  postArticle,
  individualPostPageElements,
  editCommentPageElements,
  deleteCommentPageElements,
  toastMsg,
} = pageElements;
const { createCommentPath } = paths;
const {
  comment,
  createCmtTxtArea,
  createCmtSubmitBtn,
  commentsList,
  commentListComment,
  editCmtMenuBtn,
  deleteCmtMenuBtn,
  replyCmtBtn,
  replyCmtTxtArea,
  replyCmtSubmitBtn,
  replyCmtDismissBtn,
  commentFooter,
} = individualPostPageElements;
const { success } = toastMsg;
const { editCmtSuccessMsg } = success;
const { editCmtDismissBtn, editCmtSubmitBtn, editCmtTxtArea } =
  editCommentPageElements;
const { deleteCommentBtn, cancelDeleteCommentBtn } = deleteCommentPageElements;
const { article } = postArticle;

const createCommentTest = () => {
  cy.getBySel(comment).click();
  cy.getBySel(createCmtTxtArea).type("test comment");
  cy.getBySel(createCmtSubmitBtn).click();
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-content")
    .should("have.text", "test comment");
};

const editCommentNegativeTest = () => {
  cy.getBySel(commentListComment).first().find("#comment-menu-trigger").click();
  cy.getBySel(editCmtMenuBtn).click();
  cy.wait(800);
  globalLoading();
  editCommentPageNavTest();
  cy.getBySel(editCmtDismissBtn).click();
  individualPostNavTest();
};

const editCommentPositiveTest = () => {
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-content")
    .invoke("text")
    .then((text) => {
      localStorage.setItem("comment-content", text.trim());
    });
  cy.getBySel(commentListComment).first().find("#comment-menu-trigger").click();
  cy.getBySel(editCmtMenuBtn).click();
  cy.wait(800);
  globalLoading();
  editCommentPageNavTest();
  cy.getBySel(editCmtTxtArea)
    .invoke("text")
    .then((editTxt) => {
      const previousCmtTxt = localStorage.getItem("comment-content");
      expect(previousCmtTxt.trim()).to.equal(editTxt.trim());
    });
  cy.getBySel(editCmtTxtArea).clear().type(`test update comment`);
  cy.getBySel(editCmtSubmitBtn).click();
  cy.wait(800);
  globalLoading();

  cy.checkToastMessage({
    message: editCmtSuccessMsg,
  });
  cy.getBySel(comment).click();
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-content")
    .should("have.text", "test update comment");
};

const deleteCommentPositiveTest = () => {
  cy.getBySel(commentListComment)
    .first()
    .invoke("attr", "id")
    .then((commentId) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "comment-to-delete", commentId);
    });

  cy.getBySel(commentListComment).first().find("#comment-menu-trigger").click();
  cy.getBySel(deleteCmtMenuBtn).click();
  cy.wait(800);
  globalLoading();
  deleteCommentPageNavTest();
  cy.getBySel(deleteCommentBtn).click();
  cy.wait(800);
  globalLoading();
  individualPostLoading();
  commentsLoading();
  cy.window()
    .its("localStorage")
    .invoke("getItem", "comment-to-delete")
    .then((deletedComment) => {
      cy.get("body").then(($body) => {
        if ($body.find('[data-test="comment-list-comment"]').length === 0) {
          // commentListComment does not exist — test passes
          expect(true).to.be.true;
        } else {
          // commentListComment exists — check if deletedComment does NOT exist inside it
          cy.getBySel(commentsList)
            .find(`#${deletedComment}`)
            .should('have.text', 'Comment deleted !');;
        }
      });
    });
};

const deleteCommentNegativeTest = () => {
  cy.getBySel(commentListComment).first().find("#comment-menu-trigger").click();
  cy.getBySel(deleteCmtMenuBtn).click();
  cy.wait(800);
  globalLoading();
  deleteCommentPageNavTest();
  cy.getBySel(cancelDeleteCommentBtn).click();
  individualPostNavTest();
};

const replyCommentNegativeTest = () => {
  cy.getBySel(commentFooter)
    .first()
    .find(`[data-test="${replyCmtBtn}"]`)
    .click();
  cy.getBySel(replyCmtTxtArea).clear().type("test reply");
  cy.getBySel(replyCmtDismissBtn).click();
  cy.getBySel(replyCmtTxtArea).should("not.exist");
};

const replyCommentPositiveTest = () => {
  //for POST request wait on API url
  cy.intercept("POST", Cypress.env("apiURL") + createCommentPath).as(
    "createCommentPath"
  );
  cy.getBySel(commentFooter)
    .first()
    .parents(`[data-test="${commentListComment}"]`)
    .invoke("attr", "id")
    .as("parentId");
  cy.getBySel(commentFooter)
    .first()
    .find(`[data-test="${replyCmtBtn}"]`)
    .click();
  cy.getBySel(replyCmtTxtArea).clear().type("test reply");
  cy.getBySel(replyCmtSubmitBtn).click();
  cy.wait("@createCommentPath")

  cy.getBySel(replyCmtTxtArea).should("not.exist");
  cy.get("@parentId").then((parentId) => {
    
    cy.get(`#${parentId}`)
      .siblings("div")
      .children(`[data-test="${commentListComment}"]`)
      .invoke("attr", "data-parent-id")
      .then((childParentId) => {
        expect(parentId.trim()).to.equal(childParentId.trim());
      });
  });
};

describe("Test comment feature of individual post page", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to create/edit/delete comment on a post", () => {
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();

    //DO NOT Change the ORDER of tests

    createCommentTest();
    cy.wait(800);
    commentsLoading();
    //keep reply tests after craete comment test and before any delete test
    replyCommentNegativeTest();
    replyCommentPositiveTest();
    editCommentNegativeTest();
    editCommentPositiveTest();
    deleteCommentNegativeTest();
    deleteCommentPositiveTest();
    
  });
});
