import { sortPostBy } from "../../../../utils/constants";
export const Header = ({handleSortByChange}) => {

  return (
    <header className="flex justify-between">
      <h2 className="text-fs_3xl font-semibold">Posts</h2>
      <div>
        <span className="text-fs_base">Sort By:</span>
        <select className="bg-bg-primary text-text-primary p-1 m-2" onChange={handleSortByChange}>
          <option value={sortPostBy.DATE}>Latest</option>
          <option value={sortPostBy.TITLE}>Title</option>
        </select>
      </div>
    </header>
  );
};
