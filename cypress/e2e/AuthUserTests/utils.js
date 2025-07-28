import { pageElements } from "../utils";
const { singinFormElements, homePageElements, TerminateSessionPageElements } =
  pageElements;
const { signinBtn, emailInput, passInput, persistLoginCheck } =
  singinFormElements;
const { userAvatar } = homePageElements;
const { terminateEmailInput, terminatePassInput, terminateSessionBtn } =
  TerminateSessionPageElements;

export const userSignin = ({ isPersist = false }) => {
  cy.getBySel(emailInput).clear().type(Cypress.env("userEmail"));
  cy.getBySel(passInput).clear().type(Cypress.env("password"));
  if (isPersist) {
    cy.getBySel(persistLoginCheck).then(($button) => {
      if ($button.attr("aria-checked") === "false") {
        cy.wrap($button).click();
      } else {
        cy.log("Button is already checked, skipping click.");
      }
    });
  }
  cy.getBySel(signinBtn).click();
};

export const terminateSession = () => {
  cy.getBySel(terminateEmailInput).wait(4000).should("be.visible");
  cy.getBySel(terminateEmailInput).clear().type(Cypress.env("userEmail"));
  cy.getBySel(terminatePassInput).clear().type(Cypress.env("password"));
  cy.getBySel(terminateSessionBtn).click();
};
