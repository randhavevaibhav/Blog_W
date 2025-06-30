import { SortPosts } from "./SortPosts/SortPosts";

export const PostsHeader = ({ handleSortByChange, totoalPostsCount ,sortBy}) => {
  return (
    <header className="flex justify-between my-3">
      <h2 className="text-fs_3xl font-semibold">Posts</h2>
      {totoalPostsCount > 1 ? (
        <SortPosts handleSortByChange={handleSortByChange} sortBy={sortBy}/>
      ) : null}
    </header>
  );
};
