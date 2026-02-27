import { pageElements } from "@cypress/e2e/utils";
import {
  bookmarkPageNavTest,
  createPostPageNavTest,
  dashboardPageNavTest,
  editUserProfilePageNavTest,
  followersPageNavTest,
  followingUsersPageNavTest,
  userProfilePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import { homePageNavTest } from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  articlesLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";


const { homePageElements } = pageElements;
const { userAvatar, deskTopMenuItems } = homePageElements;



const {
  currentUserProfileLink,
  editProfileLink,
  bookmarkLink,
  createPostLink,
  homeLink,
  dashboardLink,
  followersLink,
  followingUsersLink,
} = deskTopMenuItems;


export const userProfileNavBaseTest = () => {
  cy.getBySel(userAvatar).click();
  cy.getBySel(currentUserProfileLink).click();
  cy.wait(800);
  globalLoading();
  userProfilePageNavTest();
};

export const dashboardNavBaseTest = () => {
  cy.getBySel(userAvatar).click();
  cy.getBySel(dashboardLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  dashboardPageNavTest();
};

export const homeNavBaseTest = () => {
  cy.getBySel(userAvatar).click();
  cy.getBySel(homeLink).click();
  cy.wait(800);
  globalLoading();
  articlesLoading();
  homePageNavTest();
};

export const createPostNavBaseTest=()=>{
     cy.getBySel(userAvatar).click();
      cy.getBySel(createPostLink).click();
      cy.wait(800);
      globalLoading();
      createPostPageNavTest();
}

export const editUserProfileNavBaseTest =()=>{
     cy.getBySel(userAvatar).click();
      cy.getBySel(editProfileLink).click();
      cy.wait(800);
      globalLoading();
      editUserProfilePageNavTest();
}

export const bookmarkNavBaseTest=()=>{
     cy.getBySel(userAvatar).click();
      cy.getBySel(bookmarkLink).click();
      cy.wait(800);
      globalLoading();
      articlesLoading();
      bookmarkPageNavTest();
}

export const followersNavBaseTest = ()=>{
      cy.getBySel(userAvatar).click();
      cy.getBySel(followersLink).click();
      cy.wait(800);
      globalLoading();
      articlesLoading();
      followersPageNavTest();
}

export const followingUsersNavBaseTest=()=>{
      cy.getBySel(userAvatar).click();
      cy.getBySel(followingUsersLink).click();
      cy.wait(800);
      globalLoading();
      articlesLoading();
      followingUsersPageNavTest();
}