import { pageElements } from "@cypress/e2e/utils";
import { terminateSession, userSignin } from "@cypress/e2e/AuthUserTests/utils";
import { paths } from "@cypress/e2e/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
const { singinPageElements, homePageElements } = pageElements;
const { signinBtn } = singinPageElements;
const { userAvatar } = homePageElements;

const { signinPage } = paths;

describe("Terminate session test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("rootURL") + signinPage);
  });
  it("checks If user is able to signin and redirected to terminate session window If the session is terminated and able to signin by terminating the session", () => {
    userSignin({ isPersist: false });
    globalLoading();
    cy.url().then((url) => {
      if (!url.includes("/terminate")) {
        cy.getBySel(userAvatar);
        cy.reload();
        cy.location("pathname").should("eq", "/");
      } else if (url.includes("/terminate")) {
        terminateSession();
        cy.location("pathname").should("eq", "/signin");
        globalLoading();
        userSignin({ isPersist: false });
        cy.getBySel(userAvatar);
      }
    });
  });
});
