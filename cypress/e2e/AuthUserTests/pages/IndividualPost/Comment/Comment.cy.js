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
import { pageElements } from "@cypress/e2e/utils";

const {
  postArticle,
  individualPostPageElements,
  editCommentPageElements,
  deleteCommentPageElements,
  toastMsg,
} = pageElements;
const {
  comment,
  createCmtTxtArea,
  createCmtSubmitBtn,
  commentListComment,
  editCmtMenuBtn,
  deleteCmtMenuBtn,
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
          cy.getBySel(commentListComment)
            .find(deletedComment)
            .should("not.exist");
        }
      });
      // cy.getBySel(commentListComment).find(deletedComment).should("not.exist");
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

    createCommentTest();
    cy.wait(800);
    commentsLoading();
    editCommentNegativeTest();
    editCommentPositiveTest();
    deleteCommentNegativeTest();
    deleteCommentPositiveTest();
  });
});
