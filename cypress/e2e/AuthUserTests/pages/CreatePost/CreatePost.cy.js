import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {
  createPostNegativeTest,
  createPostPositiveTest,
} from "@cypress/e2e/AuthUserTests/pages/CreatePost/common";
const { homePageElements } = pageElements;
const { createPostBtn } = homePageElements;

export const createPostTest = () => {
  cy.getBySel(createPostBtn).click();
  globalLoading();
  createPostNegativeTest();
  createPostPositiveTest();
};

describe("Test create post feature", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to create post", () => {
    createPostTest();
  });
});
