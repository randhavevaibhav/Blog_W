import { Post } from "./Post/Post";
import { Header } from "./Header/Header";

import { sortPostBy } from "../../../utils/constants";

import _ from "lodash";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";

export const PostsContainer = ({ postData = null, lastElement }) => {
  const [data, setData] = useState();

  const sortByTitle = (postData) => {
    if (postData.length <= 0) {
      return;
    }

    const newPostData = postData.sort((a, b) => {
      return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
    });

    setData(() => [...newPostData]);
  };

  const sortByDate = (postData) => {
    if (postData.length <= 0) {
      return;
    }
    const newPostData = postData.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    setData(() => [...newPostData]);
  };

  const handleSortByChange = (e) => {
    const sortByVal = e.target.value;
    let newPostData = null;
    switch (sortByVal) {
      case sortPostBy.DATE:
        newPostData = sortByDate(data);

        break;
      case sortPostBy.TITLE:
        newPostData = sortByTitle(data);

        break;
      default:
        throw new Error(`Invalid value for sort by`);
    }
  };

  useEffect(() => {
    setData(() => [...postData]);
  }, [postData]);

  return (
    <>
      <div>
        <Header handleSortByChange={handleSortByChange} />

        {data?.length > 0 ? (
          <div className="posts_container flex flex-col gap-4">
            {data.map((post, i) => {
              return (
                <Post
                  postData={post}
                  key={post.id}
                  totalComments={post.totalComments}
                  likes={post.likes}
                  imgURL={post.imgURL}
                  ref={postData.length === i + 1 ? lastElement : null}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-fs_lg font-medium flex justify-between items-center">
            <p>No posts found !</p>
            <Link to={`/new`}>
              <Button className={`cursor-pointer md:hidden`} variant="action">
                <IoCreate className="text-fs_lg" />
                Create post
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
