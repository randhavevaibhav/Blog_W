import {
  dashboardPageNavTest,
  editPostPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";

import { pageElements } from "@cypress/e2e/utils";

import {
  commonCreatePostNegativeTest,
  commonCreatePostPositiveTest,
} from "@cypress/e2e/AuthUserTests/pages/CreatePost/common";

const { homePageElements, dashBoardPageElements,editPostPageElements } =
  pageElements;

const { deskTopMenuItems, userAvatar } = homePageElements;
const { editPostBtn } = dashBoardPageElements;
const { dashboardLink } = deskTopMenuItems;
const {editPostSubmitBtn,backBtn} = editPostPageElements;

const updatePostNegativeTest = () => {
  cy.getBySel(backBtn).click();
  globalLoading();
  articlesLoading();
  cy.wait(800);
  dashboardPageNavTest();

  cy.getBySel(editPostBtn).first().click();
  globalLoading();
  cy.wait(800);
  commonCreatePostNegativeTest({
    submitPostBtn:editPostSubmitBtn
  });
};

const updatePostPositiveTest = () => {
  commonCreatePostPositiveTest({
    backFromPreviewPageNavTest:editPostPageNavTest,
    submitPostBtn:editPostSubmitBtn
  });
};

export const updatePostTest = () => {
  cy.getBySel(editPostBtn).first().click();
  globalLoading();
  cy.wait(800);

  updatePostNegativeTest();
  updatePostPositiveTest();
};

describe("Test dashboard features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to edit post from dashboard.", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    globalLoading();
    articlesLoading();
    cy.wait(800);
    dashboardPageNavTest();
    
    updatePostTest();
  });
});
