/* 
////
NOTE - for followers test user should have ample amount of followers 
////
*/ 



import {
  followersPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";

const {
  homePageElements,
  followedAt,
  selectItemASC,
  followersPageElements,
  selectItemDESC
} = pageElements;
const { deskTopMenuItems, userAvatar } = homePageElements;

const {customSelectFollowerTrigger} = followersPageElements;
const { followersLink } = deskTopMenuItems;

const triggerASCSort = () => {
  cy.getBySel(customSelectFollowerTrigger).click();
  cy.wait(500);
  cy.getBySel(selectItemASC).click();
  articlesLoading();
  cy.wait(500);
};

const triggerDESCSort = () => {
  cy.getBySel(customSelectFollowerTrigger).click();
  cy.wait(500);
  cy.getBySel(selectItemDESC).click();
  articlesLoading();
  cy.wait(500);
};

const sortFollowersASCTest = () => {
  //ensure all posts are in DESC order first
  triggerASCSort();
  triggerDESCSort();

  cy.getBySel(followedAt).then(($dates) => {
    const timestamps = [...$dates].map((el) => {
      return new Date(el.innerText).getTime();
    });

    const sortedAsc = [...timestamps].sort((a, b) => a - b);

    triggerASCSort();

    cy.getBySel(followedAt).then(($dates) => {
      const newTimestamps = [...$dates].map((el) => {
        return new Date(el.innerText).getTime();
      });

      expect(newTimestamps).to.deep.equal(sortedAsc);
    });
  });
};

const sortFollowersDESCTest = () => {
  //ensure all posts are in ASC order first

  triggerDESCSort();
  triggerASCSort();

  cy.getBySel(followedAt).then(($dates) => {
    const timestamps = [...$dates].map((el) =>
      new Date(el.innerText).getTime(),
    );

    const sortedDesc = [...timestamps].sort((a, b) => b - a);

    triggerDESCSort();

    cy.getBySel(followedAt).then(($dates) => {
      const newTimestamps = [...$dates].map((el) =>
        new Date(el.innerText).getTime(),
      );

      expect(newTimestamps).to.deep.equal(sortedDesc);
    });
  });
};

const sortFollowersTest = () => {
  sortFollowersASCTest();
  sortFollowersDESCTest();
};


describe("Test Followers page features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to sort  followers", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(followersLink).click();
    globalLoading();
    articlesLoading();
    followersPageNavTest();

    sortFollowersTest();
   
  });
});
