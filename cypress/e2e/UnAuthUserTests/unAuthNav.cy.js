import { pageElements } from "@cypress/e2e/utils";
import {
  signinPageNavTest,
  signupPageNavTest,
  homePageNavTest,
  individualPostNavTest,
  globalLoading,
  articlesLoading,
  individualPostLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
const {
  homePageElements,
  signupPageElements,
  singinPageElements,
  postArticle,
} = pageElements;

const { createAccount, siteLogo } = homePageElements;
const { article } = postArticle;
const { signinLink } = signupPageElements;
const { signupLink } = singinPageElements;
describe("Un-Auth navigation test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("rootURL"));
  });
  it("checks navigation for un-auth user", () => {
    globalLoading();
    articlesLoading();
    cy.getBySel(createAccount).click();
    globalLoading();
    signupPageNavTest();
    cy.getBySel(signinLink).click();
    globalLoading();
    signinPageNavTest();
    cy.getBySel(signupLink).click();
    globalLoading();
    signupPageNavTest();
    cy.getBySel(siteLogo).click();
    globalLoading();
    articlesLoading();
    homePageNavTest();
    cy.getBySel(article).first().click();
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
  });
});
