import { Post } from "./Post/Post";
import { Header } from "./Header/Header";

import { sortPostBy } from "../../../utils/constants";


import _ from "lodash";
import { useEffect, useState } from "react";

export const PostsContainer = ({ postData = null, lastElement }) => {
  const [data, setData] = useState();

  const sortByTitle = (postData) => {
    const newPostData = postData.sort((a, b) => {
      return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
    });

    setData(() => [...newPostData]);
  };

  const sortByDate = (postData) => {
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

        {data ? (
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
          <p className="text-fs_lg font-medium">No posts</p>
        )}
      </div>
    </>
  );
};
