import {
  createPostPageNavTest,
  dashboardPageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { createPostPageElements, homePageElements, toastMsg, postArticle } =
  pageElements;
const { createPostBtn } = homePageElements;

const { error } = toastMsg;
const { createPostErr } = error;
const { titleContentErrMsg, showPreviewPostErrMsg, maxPostTitleLenErrMsg } =
  createPostErr;
const { article, title } = postArticle;

const {
  createPostSubmitBtn,
  showPreviewBtn,
  editPostBtn,
  postContentTxtArea,
  postTitleTxtArea,
  hashtagError,
  hashtagInput,
  hashtagLink,
  hashtagList,
  hashtagListElement,
  hashtagWarning,
  removeHashtagBtn,
  backBtn,
} = createPostPageElements;

export const createPostNegativeTest = ({
  postTitleNegativeTxt,
  postContentTxt,
  hashtagNegativeTxt,
}) => {
  createPostPageNavTest();
  cy.getBySel(backBtn).delayedClick();
  globalLoading();
  cy.getBySel(createPostBtn).delayedClick();
  cy.getBySel(createPostSubmitBtn).delayedClick();
  cy.checkToastMessage({ message: titleContentErrMsg });
  cy.getBySel(showPreviewBtn).delayedClick();
  cy.checkToastMessage({ message: showPreviewPostErrMsg });
  cy.getBySel(postTitleTxtArea).clear().type(postTitleNegativeTxt);
  cy.getBySel(postContentTxtArea).clear().type(postContentTxt);
  cy.getBySel(createPostSubmitBtn).delayedClick();
  cy.checkToastMessage({ message: maxPostTitleLenErrMsg });
  cy.getBySel(hashtagLink).delayedClick();
  cy.getBySel(hashtagInput).clear().type(hashtagNegativeTxt);
  cy.getBySel(hashtagError).should("be.visible");
};

const postHashtagTest = () => {
  cy.getBySel(hashtagLink).delayedClick();
  cy.getBySel(hashtagListElement).first().delayedClick();
  cy.getBySel(hashtagListElement).first().delayedClick();
  cy.getBySel(hashtagListElement).first().delayedClick();
  cy.getBySel(hashtagListElement).first().delayedClick();
  cy.getBySel(hashtagWarning).should("be.visible");
  cy.getBySel(hashtagInput).should("not.be.visible");
  cy.getBySel(hashtagList).should("not.exist");
  cy.getBySel(removeHashtagBtn).first().delayedClick();
  cy.getBySel(hashtagInput).should("be.visible");
  cy.getBySel(hashtagInput).delayedClick();
  cy.getBySel(hashtagList).should("exist");
  cy.getBySel(hashtagLink).should("not.exist");
  cy.getBySel(postTitleTxtArea).delayedClick();
  cy.getBySel(hashtagList).should("not.exist");
  cy.getBySel(hashtagLink).should("exist");
  cy.getBySel(showPreviewBtn).delayedClick();
  cy.getBySel(hashtagListElement).should("exist");
  cy.getBySel(editPostBtn).delayedClick();
};

export const createPostPositiveTest = ({
  postTitlePositiveTxt,
  postContentTxt,
}) => {
  cy.getBySel(postTitleTxtArea).clear().type(postTitlePositiveTxt);
  cy.getBySel(postContentTxtArea).clear().type(postContentTxt);
  cy.getBySel(showPreviewBtn).delayedClick();
  cy.getBySel(editPostBtn).delayedClick();
  createPostPageNavTest();
  postHashtagTest();
  cy.getBySel(createPostSubmitBtn).delayedClick();
  globalLoading();
  dashboardPageNavTest();
  cy.getBySel(article)
    .first()
    .find(`[data-test="${title}"]`)
    .should("have.text", postTitlePositiveTxt);
};
