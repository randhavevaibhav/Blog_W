describe("Un-Auth navigation", () => {
  before(() => {
    // Navigate to the landing page before each test
    cy.visit("http://127.0.0.1:5173/");
  });
  it("clicks on create account button and check redirects of Sign up and Sign in page", () => {
    cy.getBySel("create_account").click();
    cy.contains("Sign up");
    cy.getBySel(`signin`).click();
    cy.contains("Sign in");
  });
});
