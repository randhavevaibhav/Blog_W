import { requireLoginModalTest } from "@cypress/e2e/UnAuthUserTests/utils";

describe("Require login test", () => {
  beforeEach(() => {
    //temp
    cy.intercept(Cypress.env("clientURL")).as("home");
    cy.visit(Cypress.env("clientURL"));
    cy.wait("@home");
  });
  it("checks if require login modal shows up if user attempts to do action which requires login.", () => {
    requireLoginModalTest();
  });
});
