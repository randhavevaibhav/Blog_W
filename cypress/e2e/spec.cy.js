describe("Un-Auth navigation", () => {
  before(() => {
    //temp
    cy.visit("http://localhost:5173/");
  });
  it("clicks on create account button and check redirects of Sign up and Sign in page", () => {
    cy.getBySel("create_account").click();
    cy.contains("Sign up");
    cy.getBySel(`signin`).click();
    cy.contains("Sign in");
  });
});
