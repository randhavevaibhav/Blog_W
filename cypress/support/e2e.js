Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add("checkToastMessage", ({ message }, ...args) => {
  cy.get(`#_rht_toaster [role='status']`, ...args).should("contain", message);
});

Cypress.Commands.add("checkPathEqTo", ({ path }, ...args) => {
  cy.location("pathname", ...args).should("eq", path);
});

Cypress.Commands.add("checkPathInc", ({ path }, ...args) => {
  cy.location("pathname", ...args).should("include", path);
});

Cypress.Commands.add(
  "delayedClick",
  { prevSubject: "element" },
  (subject, delay = 800) => {
    cy.wrap(subject).wait(delay).click().wait(delay);
  }
);
