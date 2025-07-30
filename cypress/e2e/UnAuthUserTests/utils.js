import { pageElements, paths } from "@cypress/e2e/utils";

const {
  postArticle,
  modal,
  individualPostPageElements,
  followButton,
  homePageElements,
  signupPageElements,
  singinPageElements,
  loadingSpinner,
} = pageElements;
const { signupPage, signinPage, home, individualPostPage } = paths;
const { article, articlesSkeleton } = postArticle;
const { requireLoginModal, closeModal } = modal;
const {
  like,
  bookmark: individualPostBookmark,
  individualPostContainer,
  individualPostPageSkeleton,
} = individualPostPageElements;
const { bookmark, createAccount } = homePageElements;
const { signinLink } = signupPageElements;
const { signupLink } = singinPageElements;
const checkIfRequireLoginModalIsVisible = () => {
  cy.getBySel(requireLoginModal).should("be.visible");
  cy.getBySel(closeModal).click();
};

export const requireLoginModalTest = () => {
  //commenting now

  cy.getBySel(article).first().find(`#${bookmark}`).trigger("mouseover");
  //adding wait because hover over bookmark cause background fetch which re-render the component and cause test to fail
  cy.wait(1000);
  cy.getBySel(article)
    .first()
    .find(`#${bookmark}`)
    .click({ scrollBehavior: false });
  checkIfRequireLoginModalIsVisible();
  cy.getBySel(article).first().click();
  cy.location("pathname").should("include", "/post");
  globalLoading();
  cy.getBySel(like).click();
  checkIfRequireLoginModalIsVisible();
  cy.getBySel(individualPostBookmark).click();
  checkIfRequireLoginModalIsVisible();
  cy.getBySel(followButton).click();
  checkIfRequireLoginModalIsVisible();
};

export const signupPageNavTest = () => {
  cy.checkPathEqTo({ path: signupPage });
  cy.getBySel(signinLink).should("be.visible");
};

export const signinPageNavTest = () => {
  cy.checkPathEqTo({ path: signinPage });
  cy.getBySel(signupLink).should("be.visible");
};

export const homePageNavTest = () => {
  cy.checkPathEqTo({ path: home });
  cy.getBySel(createAccount).should("be.visible");
};

export const individualPostNavTest = () => {
  cy.checkPathInc({ path: individualPostPage });
  cy.getBySel(individualPostContainer).should("be.visible");
  cy.getBySel(individualPostBookmark).should("be.visible");
};

export const globalLoading = () => {
  cy.getBySel(loadingSpinner, { timeout: 8000 }).should("not.exist");
};

export const individualPostLoading = () => {
  cy.getBySel(individualPostPageSkeleton, { timeout: 8000 }).should(
    "not.exist"
  );
};

export const articlesLoading = () => {
  cy.getBySel(articlesSkeleton, { timeout: 8000 }).should("not.exist");
};
