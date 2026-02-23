import {
  
    editPostPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  globalLoading,
  individualPostLoading,
  individualPostNavTest,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { commonCreatePostNegativeTest, commonCreatePostPositiveTest } from "@cypress/e2e/AuthUserTests/pages/CreatePost/common";

const { postArticle, individualPostPageElements,editPostPageElements } = pageElements;
const { editPostBtn } = individualPostPageElements;
const {editPostSubmitBtn,backBtn} = editPostPageElements;
const { title } = postArticle;




const editPostNegativeTest = () => {
  cy.getBySel(backBtn).click();
  globalLoading();
  individualPostLoading();
  cy.wait(800);
 individualPostNavTest();

  cy.getBySel(editPostBtn).click();
  globalLoading();
  cy.wait(800);
  commonCreatePostNegativeTest({
    submitPostBtn:editPostSubmitBtn
  });
};

const editPostPositiveTest = () => {
  commonCreatePostPositiveTest({
    backFromPreviewPageNavTest:editPostPageNavTest,
    submitPostBtn:editPostSubmitBtn
  });
};

export const editPostTest = () => {
  cy.getBySel(editPostBtn).click();
  globalLoading();
  editPostPageNavTest();
  cy.wait(800);

  editPostNegativeTest();
  editPostPositiveTest();
};

describe("Test Edit post from individual post page.", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able edit post from individual post page.", () => {
    cy.wait(800);
    cy.getBySel(title).first().click();
    cy.wait(800);
    globalLoading();
    individualPostLoading();
    individualPostNavTest();
    editPostTest()
  
  });

 
});
