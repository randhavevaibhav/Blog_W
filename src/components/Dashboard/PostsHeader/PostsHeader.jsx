import { SortPosts } from "./SortPosts/SortPosts";

export const PostsHeader = ({ handleSortByChange, totalPostsCount ,sortBy}) => {
  return (
    <header className="flex justify-between md:mb-3 my-3">
      <h2 className="text-fs_3xl font-semibold">Posts</h2>
      {totalPostsCount > 1 ? (
        <SortPosts handleSortByChange={handleSortByChange} sortBy={sortBy}/>
      ) : null}
    </header>
  );
};
