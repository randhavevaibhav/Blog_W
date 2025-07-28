import { pageElements } from "../utils";
const { singinFormElements, homePageElements, TerminateSessionPageElements } =
  pageElements;
const { signinBtn, emailInput, passInput, persistLoginCheck } =
  singinFormElements;
const { userAvatar } = homePageElements;

const { terminateEmailInput, terminatePassInput, terminateSessionBtn } =
  TerminateSessionPageElements;

const userSignin = ({ isPersist = false }) => {
  cy.getBySel(emailInput).clear().type(Cypress.env("userEmail"));
  cy.getBySel(passInput).clear().type(Cypress.env("password"));
  if (isPersist) {
    cy.getBySel(persistLoginCheck).click();
  }
  cy.getBySel(signinBtn).click();
};

const terminateSession = () => {
  cy.getBySel(terminateEmailInput).wait(4000).should("be.visible");
  cy.getBySel(terminateEmailInput).clear().type(Cypress.env("userEmail"));
  cy.getBySel(terminatePassInput).clear().type(Cypress.env("password"));
  cy.getBySel(terminateSessionBtn).click();
};

describe("Terminate session test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("rootURL") + "/signin");
  });
  it("checks If user is able to signin and redirected to terminate session window If the session is terminated and able to signin by terminating the session", () => {
    userSignin({ isPersist: false });
    cy.wait(4000);
    cy.url().then((url) => {
      if (!url.includes("/terminate")) {
        cy.getBySel(userAvatar);
        cy.reload();
        cy.location("pathname").should("eq", "/");
      } else if (url.includes("/terminate")) {
        terminateSession();
        cy.location("pathname").should("eq", "/signin");
        cy.getBySel(signinBtn).wait(4000);
        userSignin({ isPersist: false });
        cy.getBySel(userAvatar);
      }
    });
  });
});
