//UserInfoCardWithAnalytics not displayed for un-auth users 

import { useAuth } from "@/hooks/auth/useAuth";
import { CompUserInfoCard } from "../UserInfoCard/UserInfoCard";
import { memo } from "react";

export const UserInfoCardWithAnalytics = memo(({ queryEnable = true }) => {
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  if (!currentUserId) {
    return null;
  }
  return (
    <CompUserInfoCard userId={currentUserId} queryEnable={queryEnable}>
      <CompUserInfoCard.CardWrapper className={"block"}>
        <CompUserInfoCard.Header>
          <CompUserInfoCard.UserAvatarContainer
            className={""}
          />
          <CompUserInfoCard.EditUserLink/>
        </CompUserInfoCard.Header>
        <CompUserInfoCard.ContentWrapper>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
           
            <CompUserInfoCard.JoinedOn className={"lg:block hidden"}/>
            <CompUserInfoCard.TotalFollowers />
            <CompUserInfoCard.TotalFollowingUsers />
            <CompUserInfoCard.TotalPosts />
            <CompUserInfoCard.TotalComments />
            <CompUserInfoCard.Location className={"lg:block hidden"}/>
          </div>
        </CompUserInfoCard.ContentWrapper>
      </CompUserInfoCard.CardWrapper>
    </CompUserInfoCard>
  );
});
