import {
  createPostPageNavTest,
  dashboardPageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";

const { createPostPageElements, homePageElements, toastMsg, postArticle,hashtagListElement } =
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
  cy.getBySel(backBtn).click();
  globalLoading();
  cy.getBySel(createPostBtn).click();
  cy.getBySel(createPostSubmitBtn).click();
  cy.checkToastMessage({ message: titleContentErrMsg });
  cy.getBySel(showPreviewBtn).click();
  cy.checkToastMessage({ message: showPreviewPostErrMsg });
  cy.getBySel(postTitleTxtArea).clear().type(postTitleNegativeTxt);
  cy.getBySel(postContentTxtArea).clear().type(postContentTxt);
  cy.getBySel(createPostSubmitBtn).click();
  cy.checkToastMessage({ message: maxPostTitleLenErrMsg });
  cy.getBySel(hashtagLink).click();
  cy.getBySel(hashtagInput).clear().type(hashtagNegativeTxt);
  cy.getBySel(hashtagError).should("be.visible");
};

const postHashtagTest = () => {
  cy.getBySel(hashtagLink).click();
  cy.getBySel(hashtagListElement).first().click();
  cy.getBySel(hashtagListElement).first().click();
  cy.getBySel(hashtagListElement).first().click();
  cy.getBySel(hashtagListElement).first().click();
  cy.getBySel(hashtagWarning).should("be.visible");
  cy.getBySel(hashtagInput).should("not.be.visible");
  cy.getBySel(hashtagList).should("not.exist");
  cy.getBySel(removeHashtagBtn).first().click();
  cy.getBySel(hashtagInput).should("be.visible");
  cy.getBySel(hashtagInput).click();
  cy.getBySel(hashtagList).should("exist");
  cy.getBySel(hashtagLink).should("not.exist");
  cy.getBySel(postTitleTxtArea).click();
  cy.getBySel(hashtagList).should("not.exist");
  cy.getBySel(hashtagLink).should("exist");
  cy.getBySel(showPreviewBtn).click();
  cy.getBySel(hashtagListElement).should("exist");
  cy.getBySel(editPostBtn).click();
};

export const createPostPositiveTest = ({
  postTitlePositiveTxt,
  postContentTxt,
}) => {
  cy.getBySel(postTitleTxtArea).clear().type(postTitlePositiveTxt);
  cy.getBySel(postContentTxtArea).clear().type(postContentTxt);
  cy.getBySel(showPreviewBtn).click();
  cy.getBySel(editPostBtn).click();
  createPostPageNavTest();
  postHashtagTest();
  cy.getBySel(createPostSubmitBtn).click();
  globalLoading();
  dashboardPageNavTest();
  cy.getBySel(article)
    .first()
    .find(`[data-test="${title}"]`)
    .should("have.text", postTitlePositiveTxt);
};
