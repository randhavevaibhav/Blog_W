import { useAuth } from "@/hooks/auth/useAuth";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getFollowersPageLink, getFollowingsPageLink } from "@/utils/getLinks";
import { formatNumber } from "@/utils/utils";
import React from "react";
import { Link } from "react-router-dom";

const SideBarListItem = ({ children }) => {
  return (
    <li className="text-base font-semibold flex items-center md:hover:bg-action-color cursor-pointer md:hover:text-white bg-card-bg px-4 py-1 rounded-md h-10 flex-1 md:py-2 ">
      {children}
    </li>
  );
};

export const Sidebar = ({ totalFollowers, totalFollowings }) => {
  const { auth } = useAuth();
  const { userId } = auth;
  const { preFetchUserFollowers, preFetchUserFollowings } = usePrefetch();
  return (
    <div>
      <nav>
        <ul className="flex md:flex-col gap-3">
          <Link
            to={getFollowersPageLink()}
            onMouseOver={() => {
              preFetchUserFollowers({ userId });
            }}
          >
            <SideBarListItem>
              Followers:&nbsp;
              <span
                data-test={"dashboard-total-followers"}
                data-value={totalFollowers}
              >
                {formatNumber(parseInt(totalFollowers))}
              </span>
            </SideBarListItem>
          </Link>

          <Link
            to={getFollowingsPageLink()}
            onMouseOver={() => {
              preFetchUserFollowings({ userId });
            }}
          >
            <SideBarListItem>
              Following:&nbsp;
              <span
                data-test={"dashboard-total-following-users"}
                data-value={totalFollowings}
              >
                {formatNumber(parseInt(totalFollowings))}
              </span>
            </SideBarListItem>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
