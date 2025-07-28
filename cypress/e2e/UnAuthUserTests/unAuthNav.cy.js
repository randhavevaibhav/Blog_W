describe("Un-Auth navigation test", () => {
  beforeEach(() => {
    //temp
    cy.visit("http://localhost:5173/");
  });
  it("checks navigation for un-auth user", () => {
    cy.getBySel("create_account").click();
    cy.location("pathname").should("eq", "/signup");
    cy.getBySel(`signin`).click();
    cy.location("pathname").should("eq", "/signin");
    cy.getBySel("signup").click();
    cy.location("pathname").should("eq", "/signup");
    cy.getBySel("site-logo").click();
    cy.location("pathname").should("eq", "/");
  });

})