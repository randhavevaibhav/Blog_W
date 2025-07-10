import { useAuth } from "@/hooks/auth/useAuth";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { formatNumber } from "@/utils/utils";
import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = ({totalFollowers,totalFollowings}) => {
  const {auth} = useAuth();
  const {userId} = auth;
  const {preFetchUserFollowers,preFetchUserFollowings} = usePrefetch();
  return (
    <div>
      <nav>
        <ul className="flex flex-col md:gap-1 gap-2">
          <li className="">
            <Link className="capitalize text-fs_base font-semibold md:p-2 flex rounded-md md:hover:bg-action-color cursor-pointer md:hover:text-white" to={`/user/${userId}/followers`} onMouseOver={()=>{
              preFetchUserFollowers({userId})
            }}>
              Followers:&nbsp;
              <span className="ml-auto bg-card-bg px-4 py-1 rounded-md text-primary">
                {formatNumber(parseInt(totalFollowers))}
              </span>
            </Link>
          </li>
          <li className="">
            <Link className="text-fs_base font-semibold md:p-2 flex rounded-md md:hover:bg-action-color cursor-pointer md:hover:text-white" to={`/user/${userId}/followings`} onMouseOver={()=>{
              preFetchUserFollowings({userId})
            }}>
              Following users:&nbsp;
              <span className="ml-auto bg-card-bg px-4 py-1 rounded-md text-primary">
                {formatNumber(parseInt(totalFollowings))}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
