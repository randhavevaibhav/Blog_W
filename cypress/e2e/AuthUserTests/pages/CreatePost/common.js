import {
  createPostPageNavTest,
  dashboardPageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
import { clickUntilGone, pageElements } from "@cypress/e2e/utils";

const {
  createPostPageElements,
  previewPostPageElements,
  toastMsg,
  postArticle,
  hashtagListElement,
  homePageElements,
} = pageElements;

const { error } = toastMsg;
const { createPostErr } = error;
const { titleContentErrMsg, showPreviewPostErrMsg, maxPostTitleLenErrMsg } =
  createPostErr;
const { article, title } = postArticle;

const {
  showPreviewBtn,
  postContentTxtArea,
  postTitleTxtArea,
  hashtagError,
  hashtagInput,
  hashtagLink,
  hashtagList,
  hashtagWarning,
  removeHashtagBtn,
  createPostSubmitBtn,
  backBtn,
} = createPostPageElements;
const { createPostBtn } = homePageElements;

const { editPostBtn, previewPostTitle, previewPostContent } =
  previewPostPageElements;

export const commonCreatePostNegativeTest = ({ submitPostBtn }) => {
  const postTitleNegativeTxt =
    "asadsasdasdasasadsasdasdasasadsasdasdasasadsasdasdasasadsasdasdasasadsasdasdasasadsasdasda";

  const postContentTxt = `test post content ${
    Math.floor(Math.random() * 100) + 1
  }`;

  const hashtagNegativeTxt = "dasdasd@#$45";
  cy.getBySel(postTitleTxtArea).clear();
  cy.getBySel(postContentTxtArea).clear();
  cy.getBySel(submitPostBtn).click();
  cy.wait(800);
  cy.checkToastMessage({ message: titleContentErrMsg });
  cy.getBySel(showPreviewBtn).click();
  cy.wait(800);
  cy.checkToastMessage({ message: showPreviewPostErrMsg });
  cy.getBySel(postTitleTxtArea).clear().type(postTitleNegativeTxt);
  cy.getBySel(postContentTxtArea).clear().type(postContentTxt);
  cy.getBySel(submitPostBtn).click();
  cy.wait(800);
  cy.checkToastMessage({ message: maxPostTitleLenErrMsg });
  cy.getBySel(hashtagLink).click();
  cy.getBySel(hashtagInput).clear().type(hashtagNegativeTxt);
  cy.getBySel(hashtagError).should("be.visible");
};

export const commonCreatePostPositiveTest = ({
  backFromPreviewPageNavTest = () => {},
  submitPostBtn = "default",
}) => {
  const postTitlePositiveTxt = `test post title ${
    Math.floor(Math.random() * 100) + 1
  }`;
  const postContentTxt = `test post content ${
    Math.floor(Math.random() * 100) + 1
  }`;

  cy.getBySel(postTitleTxtArea).clear().type(postTitlePositiveTxt);
  cy.getBySel(postContentTxtArea).clear().type(postContentTxt);
  cy.getBySel(showPreviewBtn).click();
  cy.getBySel(previewPostTitle).should(
    "have.attr",
    "data-value",
    postTitlePositiveTxt
  );
  cy.getBySel(previewPostContent).should(
    "have.attr",
    "data-value",
    postContentTxt
  );
  cy.getBySel(editPostBtn).click();
  backFromPreviewPageNavTest();
  postHashtagTest({
    postTitlePositiveTxt,
    postContentTxt,
  });
  cy.wait(500);
  cy.getBySel(submitPostBtn).click();
  cy.wait(500);
  globalLoading();
  dashboardPageNavTest();
  cy.getBySel(article)
    .first()
    .find(`[data-test="${title}"]`)
    .should("have.text", postTitlePositiveTxt);
};

export const createPostNegativeTest = () => {
  createPostPageNavTest();
  cy.getBySel(backBtn).click();
  globalLoading();
  cy.getBySel(createPostBtn).click();
  commonCreatePostNegativeTest({
    submitPostBtn: createPostSubmitBtn,
  });
};

export const createPostPositiveTest = () => {
  commonCreatePostPositiveTest({
    backFromPreviewPageNavTest: createPostPageNavTest,
    submitPostBtn: createPostSubmitBtn,
  });
};

const postHashtagTest = ({ postTitlePositiveTxt, postContentTxt }) => {
  clickUntilGone(`[data-test=${removeHashtagBtn}]`);
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
  cy.wait(500);
  cy.getBySel(showPreviewBtn).click();
  cy.getBySel(previewPostTitle).should(
    "have.attr",
    "data-value",
    postTitlePositiveTxt
  );
  cy.getBySel(previewPostContent).should(
    "have.attr",
    "data-value",
    postContentTxt
  );
  cy.getBySel(hashtagListElement).should("exist");
  cy.getBySel(editPostBtn).click();
};
