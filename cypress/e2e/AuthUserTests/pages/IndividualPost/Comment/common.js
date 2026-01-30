import {
  deleteCommentPageNavTest,
  editCommentPageNavTest,
  getInterceptors,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  commentsLoading,
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const {
  individualPostPageElements,
  editCommentPageElements,
  deleteCommentPageElements,
  toastMsg,
} = pageElements;
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
  likeCommentBtn,
  totalComments,
} = individualPostPageElements;
const { success } = toastMsg;
const { editCmtSuccessMsg } = success;
const { editCmtDismissBtn, editCmtSubmitBtn, editCmtTxtArea } =
  editCommentPageElements;
const { deleteCommentBtn, cancelDeleteCommentBtn } = deleteCommentPageElements;
const { interceptCreateComment, getInterceptorAlias } = getInterceptors();
const { createCommentRequestAlias } = getInterceptorAlias();

export const createCommentPositiveTest = () => {
  let beforeTotalComments = null;
  cy.getBySel(totalComments)
    .invoke("attr", "data-total-comments")
    .then((totalComments) => {
      beforeTotalComments = parseInt(totalComments);
    });
  const createCommentTxt = `test comment ${
    Math.floor(Math.random() * 100) + 1
  }`;
  cy.wait(1500);
  cy.getBySel(comment).delayedClick();
  cy.wait(1500);
  cy.getBySel(createCmtTxtArea).type(createCommentTxt);
  cy.wait(1500);
  cy.getBySel(createCmtSubmitBtn).delayedClick();
  cy.wait(1500);
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-content")
    .should("have.text", createCommentTxt);
  cy.getBySel(totalComments)
    .invoke("attr", "data-total-comments")
    .then((afterTotalComments) => {
      expect(parseInt(afterTotalComments)).to.be.greaterThan(
        parseInt(beforeTotalComments)
      );
    });
};

const likeCommentTest = () => {
  cy.getBySel(commentFooter)
    .first()
    .find(`[data-test="${likeCommentBtn}"]`)
    .as("likeCmtBtn");

  let beforeLikes = null;
  cy.get("@likeCmtBtn")
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.wait(1500);
      cy.get("@likeCmtBtn").delayedClick();
      cy.wait(1500);
      cy.get("@likeCmtBtn").should("have.attr", "data-is-liked", "true");
      cy.get("@likeCmtBtn")
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("be.greaterThan", parseInt(beforeLikes));
    });

  //check the state of app after reloading page
  cy.get("@likeCmtBtn")
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.reload();
      cy.wait(1000);
      globalLoading();
      individualPostLoading();
      commentsLoading();
      cy.get("@likeCmtBtn")
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("equal", parseInt(beforeLikes));
      cy.get("@likeCmtBtn").should("have.attr", "data-is-liked", "true");
    });
};

const disLikeCommentTest = () => {
  cy.getBySel(commentFooter)
    .first()
    .find(`[data-test="${likeCommentBtn}"]`)
    .as("likeCmtBtn");

  let beforeLikes = null;
  cy.get("@likeCmtBtn")
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.wait(1500);
      cy.get("@likeCmtBtn").delayedClick();
      cy.wait(1500);
      cy.get("@likeCmtBtn").should("have.attr", "data-is-liked", "false");
      cy.get("@likeCmtBtn")
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("be.lessThan", parseInt(beforeLikes));
    });
  //check the state of app after reloading page
  cy.get("@likeCmtBtn")
    .invoke("attr", "data-total-likes")
    .then((likes) => {
      beforeLikes = likes;
      cy.reload();
      cy.wait(1000);
      globalLoading();
      individualPostLoading();
      commentsLoading();

      cy.get("@likeCmtBtn")
        .invoke("attr", "data-total-likes")
        .then(parseInt)
        .should("equal", parseInt(beforeLikes));
      cy.get("@likeCmtBtn").should("have.attr", "data-is-liked", "false");
    });
};

export const likeDislikeCommentTest = () => {
  cy.getBySel(commentFooter)
    .first()
    .find(`[data-test="${likeCommentBtn}"]`)
    .invoke("attr", "data-is-liked")
    .as("isLiked");
  cy.get("@isLiked").then((isLiked) => {
    if (isLiked === "true") {
      disLikeCommentTest();
      likeCommentTest();
    } else if (isLiked === "false") {
      likeCommentTest();
      disLikeCommentTest();
    }
  });
};
export const editCommentNegativeTest = () => {
  cy.wait(1500);
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-menu-trigger")
    .delayedClick();
  cy.wait(1500);
  cy.getBySel(editCmtMenuBtn).delayedClick();
  cy.wait(1500);
  globalLoading();
  editCommentPageNavTest();
  cy.wait(1500);
  cy.getBySel(editCmtDismissBtn).delayedClick();
  cy.wait(1500);
  individualPostNavTest();
};

export const editCommentPositiveTest = () => {
  const editCommentTxt = `test edit comment ${
    Math.floor(Math.random() * 100) + 1
  }`;
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-content")
    .invoke("text")
    .then((text) => {
      localStorage.setItem("comment-content", text.trim());
    });
  cy.wait(1500);
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-menu-trigger")
    .delayedClick();
  cy.wait(1500);
  cy.getBySel(editCmtMenuBtn).delayedClick();
  cy.wait(1500);
  globalLoading();
  editCommentPageNavTest();
  cy.getBySel(editCmtTxtArea)
    .invoke("text")
    .then((editTxt) => {
      const previousCmtTxt = localStorage.getItem("comment-content");
      expect(previousCmtTxt.trim()).to.equal(editTxt.trim());
    });
  cy.getBySel(editCmtTxtArea).clear().type(editCommentTxt);
  cy.wait(1500);
  cy.getBySel(editCmtSubmitBtn).delayedClick();
  cy.wait(1500);
  cy.wait(800);
  globalLoading();

  cy.wait(1500);
  cy.getBySel(comment).delayedClick();
  cy.wait(1500);
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-content")
    .should("have.text", editCommentTxt);
};

export const deleteCommentPositiveTest = () => {
  cy.getBySel(commentListComment)
    .first()
    .invoke("attr", "id")
    .then((commentId) => {
      cy.window()
        .its("localStorage")
        .invoke("setItem", "comment-to-delete", commentId);
    });
  cy.wait(1500);
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-menu-trigger")
    .delayedClick();
  cy.wait(1500);
  cy.getBySel(deleteCmtMenuBtn).delayedClick();
  cy.wait(1500);
  globalLoading();
  deleteCommentPageNavTest();
  cy.wait(1500);
  cy.getBySel(deleteCommentBtn).delayedClick();
  cy.wait(1500);
  globalLoading();
  individualPostLoading();
  commentsLoading();
  cy.window()
    .its("localStorage")
    .invoke("getItem", "comment-to-delete")
    .then((deletedComment) => {
      cy.get("body").then(($body) => {
        if ($body.find(`[data-test="${commentListComment}"]`).length === 0) {
          // commentListComment does not exist — test passes
          expect(true).to.be.true;
        } else {
          // commentListComment exists — check if deleted comment is not exist if it exist then it should have text as 'comment deleted !
          cy.get("body").then(($body) => {
            if ($body.find(`#${deletedComment}`).length === 0) {
              expect(true).to.be.true;
            } else {
              cy.getBySel(commentsList)
                .find(`#${deletedComment}`)
                .should("have.text", "Comment deleted !");
            }
          });
        }
      });
    });
};

export const deleteCommentNegativeTest = () => {
  cy.wait(1500);
  cy.getBySel(commentListComment)
    .first()
    .find("#comment-menu-trigger")
    .delayedClick();
  cy.wait(1500);
  cy.getBySel(deleteCmtMenuBtn).delayedClick();
  cy.wait(1500);
  globalLoading();
  deleteCommentPageNavTest();
  cy.wait(1500);
  cy.getBySel(cancelDeleteCommentBtn).delayedClick();
  cy.wait(1500);
  individualPostNavTest();
};

export const replyCommentNegativeTest = () => {
  cy.wait(1500);
  cy.getBySel(commentFooter)
    .first()
    .find(`[data-test="${replyCmtBtn}"]`)
    .delayedClick();
  cy.wait(1500);
  cy.getBySel(replyCmtTxtArea).clear().type("test reply");
  cy.wait(1500);
  cy.getBySel(replyCmtDismissBtn).delayedClick();
  cy.wait(1500);
  cy.getBySel(replyCmtTxtArea).should("not.exist");
};

export const replyCommentPositiveTest = () => {
  const replyCommentTxt = `test reply comment ${
    Math.floor(Math.random() * 100) + 1
  }`;
  //for POST request wait on API url
  interceptCreateComment();
  cy.getBySel(commentFooter)
    .first()
    .parents(`[data-test="${commentListComment}"]`)
    .invoke("attr", "id")
    .as("parentId");
  cy.wait(1500);
  cy.getBySel(commentFooter)
    .first()
    .find(`[data-test="${replyCmtBtn}"]`)
    .delayedClick();
  cy.wait(1500);
  cy.getBySel(replyCmtTxtArea).clear().type(replyCommentTxt);
  cy.wait(1500);
  cy.getBySel(replyCmtSubmitBtn).delayedClick();
  cy.wait(createCommentRequestAlias);
  cy.wait(1500);

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
