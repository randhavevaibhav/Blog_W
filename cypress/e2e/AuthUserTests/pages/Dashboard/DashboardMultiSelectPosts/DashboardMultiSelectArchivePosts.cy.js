import {
  dashboardPageNavTest,
  terminateSessionAndMakeUserSigninWithPersistLogin,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import { dashboardMultiSelectArchivePostsTests } from "@cypress/e2e/AuthUserTests/pages/Dashboard/DashboardMultiSelectPosts/dashboardMultiSelectArchivePostsTests";

const { homePageElements } = pageElements;

const { deskTopMenuItems, userAvatar } = homePageElements;

const { dashboardLink } = deskTopMenuItems;

describe("Test dashboard multiselect posts features - archive", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if user is able to archive/un-archive multiple posts", () => {
    cy.getBySel(userAvatar).click();
    cy.getBySel(dashboardLink).click();
    cy.wait(800);
    globalLoading();
    articlesLoading();
    dashboardPageNavTest();
    dashboardMultiSelectArchivePostsTests();
  });
});
