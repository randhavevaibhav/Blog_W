import { userSignin } from "@cypress/e2e/AuthUserTests/utils";
import { paths } from "@cypress/e2e/utils";
const {signinPage} = paths;
describe("Wrong password test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("rootURL") + signinPage);
  });

  it("checks If wrong pass error is shown when user try to login with wrong pass ", () => {
    userSignin({ isPersist: false, wrongPass: true });
  });
});
