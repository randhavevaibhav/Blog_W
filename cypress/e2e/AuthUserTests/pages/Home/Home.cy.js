import { pageElements } from "../../../utils";
import { terminateSession, userSignin } from "../../utils";


const {homePageElements} = pageElements;
const {discoverPostsPage,discoverPostsPageBtn,followingPostsPage,followingPostsPageBtn} = homePageElements;

describe("Test features from home page", () => {
  before(() => {
    //temp
    cy.visit(Cypress.env("rootURL")+'/signin');
    userSignin({isPersist:true});
     cy.wait(4000);
      cy.url().then((url) => {
        if (!url.includes("/terminate")) {
        cy.location("pathname").should("eq", "/");
         cy.getBySel(userAvatar)
        } else if (url.includes("/terminate")) {
          terminateSession();
          userSignin({ isPersist: true });
        }
      });
  });
  it("Test features from home page", () => {
    cy.wait(800);
    cy.getBySel(discoverPostsPageBtn).click();
    cy.getBySel(discoverPostsPage).should("be.visible");
     cy.getBySel(followingPostsPageBtn).click();
    cy.getBySel(followingPostsPage).should("be.visible")
  });
});
