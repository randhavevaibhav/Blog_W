import { terminateSessionAndMakeUserSigninWithPersistLogin } from "@cypress/e2e/AuthUserTests/utils";
import { globalLoading } from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {createPostPositiveTest,createPostNegativeTest} from "@cypress/e2e/AuthUserTests/pages/CreatePost/tests"
const { homePageElements } = pageElements;
const { createPostBtn } = homePageElements;

describe("Test create post feature", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if authenticated user is able to create post", () => {
    const postTitleNegativeTxt =
      "asadsasdasdasasadsasdasdasasadsasdasdasasadsasdasdasasadsasdasdasasadsasdasdasasadsasdasda";
    const postTitlePositiveTxt = `test post title ${
      Math.floor(Math.random() * 100) + 1
    }`;
    const postContentTxt = `test post content ${
      Math.floor(Math.random() * 100) + 1
    }`;
    const hashtagNegativeTxt = "dasdasd@#$45";
    cy.getBySel(createPostBtn).click();
    globalLoading();
    createPostNegativeTest({
      postTitleNegativeTxt,
      postContentTxt,
      hashtagNegativeTxt,
    });

    createPostPositiveTest({
      postTitlePositiveTxt,
      postContentTxt,
    });
  });
});
