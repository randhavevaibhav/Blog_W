import { pageElements } from "../utils";

const {
  homePageElements,
  modal,
  postArticle,
  individualPostPageElements,
  followButton,
} = pageElements;
const { article } = postArticle;
const { like, bookmark: individualPostBookmark } = individualPostPageElements;
const { requireLoginModal, closeModal } = modal;
const { bookmark } = homePageElements;

const requireLoginModalTest = () => {
  cy.getBySel(requireLoginModal).should("be.visible");
  cy.getBySel(closeModal).click();
};

describe("Require login test", () => {
  beforeEach(() => {
    //temp
    cy.intercept(Cypress.env("rootURL")).as("home");
    cy.visit(Cypress.env("rootURL"));
    cy.wait("@home");
  });
  it("checks if require login modal shows up if user attempts to do action which requires login.", () => {
    cy.getBySel(article).first().click();
    cy.location("pathname").should("include", "/post");
    cy.getBySel(like).click();
    requireLoginModalTest();
    cy.getBySel(individualPostBookmark).click();
    requireLoginModalTest();
    cy.getBySel(followButton).click();
    requireLoginModalTest();
  });
});
