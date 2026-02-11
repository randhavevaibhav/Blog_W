import { pageElements } from "@cypress/e2e/utils";
import {
  signinPageNavTest,
  signupPageNavTest,
  homePageNavTest,
  individualPostNavTest,
  globalLoading,
  articlesLoading,
  individualPostLoading,
  taggedPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
const {
  homePageElements,
  signupPageElements,
  singinPageElements,
  postArticle,
  taggedPostPageElements,
} = pageElements;

const { taggedPostHeader } = taggedPostPageElements;
const {
  createAccount,
  siteLogo,
  topDiscussedArticlesCnt,
  topLikedArticlesCnt,
  tagFilterTrigger,
  tagListElement,
} = homePageElements;
const { article } = postArticle;
const { signinLink } = signupPageElements;
const { signupLink } = singinPageElements;

const homePageNavigationTest = () => {
  cy.getBySel(siteLogo).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  homePageNavTest();

  // hashtag list test
  cy.getBySel(tagFilterTrigger).click();

  cy.getBySel(tagListElement)
    .first()
    .then(($tag) => {
      const tagName = $tag.attr("data-value");
      cy.getBySel(tagListElement).first().click();
      cy.wait(500);
      taggedPostNavTest();
      cy.getBySel(taggedPostHeader)
        .invoke("attr", "data-value")
        .should("equal", tagName);
    });
  // top liked and top discussed post tests
  cy.getBySel(siteLogo).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  cy.getBySel(topLikedArticlesCnt).find(`[data-test="${article}"]`).first();
  cy.getBySel(topDiscussedArticlesCnt).find(`[data-test="${article}"]`).first();
};

describe("Un-Auth navigation test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("clientURL"));
  });
  it("checks navigation for un-auth user", () => {
    cy.wait(800);
    globalLoading();
    articlesLoading();
    cy.getBySel(createAccount).click();
    cy.wait(800);
    globalLoading();
    signupPageNavTest();
    cy.getBySel(signinLink).click();
    cy.wait(800);
    globalLoading();
    signinPageNavTest();
    cy.getBySel(signupLink).click();
    cy.wait(800);
    globalLoading();
    signupPageNavTest();

    homePageNavigationTest();

    cy.getBySel(siteLogo).click();
    cy.wait(800);
    globalLoading();
    articlesLoading();
    cy.wait(800);
    cy.getBySel(article).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
  });
});
