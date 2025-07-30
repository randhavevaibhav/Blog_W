import { pageElements } from "@cypress/e2e/utils";
import {
  signinPageNavTest,
  signupPageNavTest,
  homePageNavTest,
  individualPostNavTest,
  globalLoading,
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
    homePageNavTest();
    cy.getBySel(article).first().click();
    globalLoading();
    individualPostNavTest();
  });
});
