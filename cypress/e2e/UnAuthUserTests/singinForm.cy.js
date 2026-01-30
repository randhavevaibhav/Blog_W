import { pageElements } from "@cypress/e2e/utils";
import { paths } from "@cypress/e2e/utils";
const { singinPageElements } = pageElements;
const { signinPage } = paths;
describe("Signin form test", () => {
  const { signinBtn, emailInput, emailErr, passInput, passErr } =
    singinPageElements;
  beforeEach(() => {
    //temp
    cy.visit(Cypress.env("clientURL") + signinPage);
  });
  it("goes to signin page and check form validations.", () => {
    //testing All inputs error msg
    cy.getBySel(signinBtn).click();
    cy.getBySel(emailErr).should("be.visible");
    cy.getBySel(passErr).should("be.visible");
    //testing individual inputs
    cy.getBySel(emailInput).type("test123@gmail.com");
    cy.getBySel(emailErr).should("not.be.visible");
    cy.getBySel(passInput).type("dxfgvsdfv345sd");
    cy.getBySel(passErr).should("not.be.visible");
    //testing max input validation
    cy.getBySel(emailInput).type("test123@.com");
    cy.getBySel(emailErr).should("be.visible");
    cy.getBySel(passInput).type("sdfsdf45dfsdfsdf4234sdfsdfsdfs");
    cy.getBySel(passErr).should("be.visible");
    // testing by correcting errors err msg should be disappear
    cy.getBySel(emailInput).clear().type("test123@gmail.com");
    cy.getBySel(emailErr).should("not.be.visible");
    cy.getBySel(passInput).clear().type("dxfgvsdfv345sd");
    cy.getBySel(passErr).should("not.be.visible");
  });
});
