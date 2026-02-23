/* 
////
NOTE - for followers test user should have ample amount of followers 
////
*/ 



import {
  followingUsersPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { sortFollowersTest } from "@cypress/e2e/AuthUserTests/pages/Followers/common";

const {
  homePageElements,
} = pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;


const { followingUsersLink } = deskTopMenuItems;



describe("Test Followers page features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to sort  following users", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(followingUsersLink).click();
    globalLoading();
    articlesLoading();
    followingUsersPageNavTest();

    sortFollowersTest();
   
  });
});
