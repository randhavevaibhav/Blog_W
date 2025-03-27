import { sortPostBy } from "../../../../utils/constants";
export const Header = ({handleSortByChange}) => {

  return (
    <header className="flex justify-between">
      <h2>Posts</h2>
      <div>
        <span>Sort By:</span>
        <select className="bg-bg-primary text-text-primary p-1 m-2" onChange={handleSortByChange}>
          <option value={sortPostBy.DATE}>Latest</option>
          <option value={sortPostBy.TITLE}>Title</option>
        </select>
      </div>
    </header>
  );
};
