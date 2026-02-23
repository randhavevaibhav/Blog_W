
import {
  articlesLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";

const {

  followedAt,
  selectItemASC,
  followersPageElements,
  selectItemDESC
} = pageElements;

const {customSelectFollowerTrigger} = followersPageElements;


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

export const sortFollowersTest = () => {
  sortFollowersASCTest();
  sortFollowersDESCTest();
};



