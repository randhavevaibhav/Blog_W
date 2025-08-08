import { requireLoginModalTest } from "@cypress/e2e/UnAuthUserTests/utils";
import { getInterceptors } from "@cypress/e2e/AuthUserTests/utils";

const { interceptHome, getInterceptorAlias } = getInterceptors();

const { homeRequestAlias } = getInterceptorAlias();

describe("Require login test", () => {
  beforeEach(() => {
    //temp
    interceptHome();
    cy.visit(Cypress.env("clientURL"));
    cy.wait(homeRequestAlias);
  });
  it("checks if require login modal shows up if user attempts to do action which requires login.", () => {
    requireLoginModalTest();
  });
});
