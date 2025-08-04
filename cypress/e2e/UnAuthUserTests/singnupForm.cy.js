import { pageElements } from "@cypress/e2e/utils";
import { paths } from "@cypress/e2e/utils";
const { signupPageElements } = pageElements;
const { signupPage } = paths;
describe("Signup form test", () => {
  const {
    signupBtn,
    firstNameErr,
    emailErr,
    passErr,
    confirmPassErr,
    firstNameInput,
    emailInput,
    passInput,
    confirmPassInput,
  } = signupPageElements;
  beforeEach(() => {
    //temp
    cy.visit(Cypress.env("clientURL") + signupPage);
  });
  it("goes to signup page and check form validations.", () => {
    //testing All inputs error msg
    cy.getBySel(signupBtn).click();
    cy.getBySel(firstNameErr).should("be.visible");
    cy.getBySel(emailErr).should("be.visible");
    cy.getBySel(passErr).should("be.visible");
    cy.getBySel(confirmPassErr).should("be.visible");
    //testing individual inputs
    cy.getBySel(firstNameInput).type("Test 1");
    cy.getBySel(firstNameErr).should("not.be.visible");
    cy.getBySel(emailInput).type("test123@gmail.com");
    cy.getBySel(emailErr).should("not.be.visible");
    cy.getBySel(passInput).type("123456");
    cy.getBySel(passErr).should("not.be.visible");
    cy.getBySel(confirmPassInput).type("123456");
    cy.getBySel(confirmPassErr).should("not.be.visible");
    //testing max input validation
    cy.getBySel(firstNameInput).type("asdasdadasdadsdasqwe");
    cy.getBySel(firstNameErr).should("be.visible");
    cy.getBySel(emailInput).type("test123@.com");
    cy.getBySel(emailErr).should("be.visible");
    cy.getBySel(passInput).type("1234567891231232131231231223w312");
    cy.getBySel(passErr).should("be.visible");
    cy.getBySel(confirmPassInput).type("1234567891231232131231231223");
    cy.getBySel(confirmPassErr).should("be.visible");
    // testing by correcting errors err msg should be disappear
    cy.getBySel(firstNameInput).clear().type("asdasd");
    cy.getBySel(firstNameErr).should("not.be.visible");
    cy.getBySel(emailInput).clear().type("test123@gmail.com");
    cy.getBySel(emailErr).should("not.be.visible");
    cy.getBySel(passInput).clear().type("1234567");
    cy.getBySel(passErr).should("not.be.visible");
    cy.getBySel(confirmPassInput).clear().type("1234567");
    cy.getBySel(confirmPassErr).should("not.be.visible");
  });
});
