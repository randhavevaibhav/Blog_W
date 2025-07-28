import { pageElements } from "../utils";
import { terminateSession, userSignin } from "./utils";
const { singinFormElements, homePageElements } =
  pageElements;
const { signinBtn } =
  singinFormElements;
const { userAvatar, deskTopMenuItems } = homePageElements;
const {
  userProfileLink,
  editProfileLink,
  bookmarkLink,
  createPostLink,
  homeLink,
  dashboardLink,
} = deskTopMenuItems;



const navigateDesktopMenu = () => {
  cy.getBySel(userAvatar);
  cy.reload();
  cy.getBySel(userAvatar).click();
  cy.getBySel(userProfileLink).click();
  cy.wait(800);
  cy.location("pathname").should("include", "userprofile");
  cy.getBySel(userAvatar).click();
  cy.getBySel(homeLink).click();
  cy.wait(800);
  cy.location("pathname").should("eq", "/");
  cy.getBySel(userAvatar).click();
  cy.getBySel(dashboardLink).click();
  cy.wait(800);
  cy.location("pathname").should("eq", "/dashboard");
  cy.getBySel(userAvatar).click();
  cy.getBySel(createPostLink).click();
  cy.wait(800);
  cy.location("pathname").should("eq", "/new");
  cy.getBySel(userAvatar).click();
  cy.getBySel(editProfileLink).click();
  cy.wait(800);
  cy.location("pathname").should("include", "/userprofile/edit");
  cy.getBySel(userAvatar).click();
  cy.getBySel(bookmarkLink).click();
  cy.wait(800);
  cy.location("pathname").should("eq", "/bookmark");
};

describe("Auth navigation test", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("rootURL") + "/signin");
  });

  it("checks If user is able to signin with persist option enable and able to navigate desktop routes", () => {
    userSignin({ isPersist: true });
    cy.wait(4000);
    cy.url().then((url) => {
      if (!url.includes("/terminate")) {
        navigateDesktopMenu();
      } else if (url.includes("/terminate")) {
        terminateSession();
        cy.location("pathname").should("eq", "/signin");
        cy.getBySel(signinBtn).wait(4000);
        userSignin({ isPersist: true });
        navigateDesktopMenu();
      }
    });
  });
});
