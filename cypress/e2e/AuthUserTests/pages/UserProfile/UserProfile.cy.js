import {
  terminateSessionAndMakeUserSigninWithPersistLogin,
  userProfilePageNavTest,
} from "@cypress/e2e/AuthUserTests/utils";
import {
  articlesLoading,
  globalLoading,
} from "@cypress/e2e/UnAuthUserTests/utils";
import { pageElements } from "@cypress/e2e/utils";
import {
  dashboardNavBaseTest,
  userProfileNavBaseTest,
} from "@cypress/e2e/AuthUserTests/authNavTests";

const {
  followButton,
  homePageElements,
  postArticle,
  userProfilePageElements,
  dashBoardPageElements,
} = pageElements;
const { followingPostsPageBtn } = homePageElements;
const {
  dashboardTotalPostComments,
  dashboardTotalPosts,
  dashboardTotalFollowers,
  dashboardTotalFollowingUsers,
} = dashBoardPageElements;
const { userProfileLink } = postArticle;
const { totalFollowers, totalFollowingUsers, totalComments, totalPosts } =
  userProfilePageElements;

const followUserTest = ({ type = "negative" }) => {
  cy.wait(500);
  cy.getBySel(totalFollowers)
    .invoke("attr", "data-value")
    .then((count) => {
      const totalFollowersBefore = parseInt(count);
      cy.getBySel(followButton).click();
      cy.wait(500);
      cy.getBySel(totalFollowers)
        .invoke("attr", "data-value")
        .then((count) => {
          const totalFollowersAfter = parseInt(count);
          if (type === "negative") {
            expect(totalFollowersAfter).to.lessThan(totalFollowersBefore);
            cy.reload();
            globalLoading();
            cy.wait(800);
            expect(totalFollowersAfter).to.lessThan(totalFollowersBefore);
          } else {
            expect(totalFollowersBefore).to.lessThan(totalFollowersAfter);
            cy.reload();
            globalLoading();
            cy.wait(800);
            expect(totalFollowersBefore).to.lessThan(totalFollowersAfter);
          }
        });
    });
};

const statTest = ({
  userProfileStatSelector = "",
  dashboardStatSelector = "",
}) => {
  userProfileNavBaseTest();
  cy.getBySel(userProfileStatSelector)
    .invoke("attr", "data-value")
    .then((count) => {
      const totalCountOnUserProfile = parseInt(count);
      dashboardNavBaseTest();
      cy.getBySel(dashboardStatSelector)
        .invoke("attr", "data-value")
        .then((count) => {
          const totalCountOnDashBoard = parseInt(count);
          expect(totalCountOnUserProfile).to.be.eq(totalCountOnDashBoard);
        });
    });
};

describe("Test dashboard features", () => {
  beforeEach(() => {
    terminateSessionAndMakeUserSigninWithPersistLogin();
  });

  it("test if Auth user is able follow/un-follow other user from user profile page.", () => {
    globalLoading();
    articlesLoading();
    cy.getBySel(followingPostsPageBtn).click();
    articlesLoading();
    cy.getBySel(userProfileLink).first().click();
    cy.wait(500);
    userProfilePageNavTest();

    followUserTest({ type: "negative" });
    followUserTest({ type: "positive" });
  
  });

  it("test stats displayed on user profile page is matching with dashboard stats.", () => {
    statTest({
      userProfileStatSelector: totalFollowers,
      dashboardStatSelector: dashboardTotalFollowers,
    });
    statTest({
      userProfileStatSelector: totalFollowingUsers,
      dashboardStatSelector: dashboardTotalFollowingUsers,
    });
    statTest({
      userProfileStatSelector: totalPosts,
      dashboardStatSelector: dashboardTotalPosts,
    });
    statTest({
      userProfileStatSelector: totalComments,
      dashboardStatSelector: dashboardTotalPostComments,
    });
  });
});
