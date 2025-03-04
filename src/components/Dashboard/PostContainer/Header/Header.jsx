export const Header = ({handleSortByChange}) => {

  return (
    <header className="flex justify-between">
      <h2>Posts</h2>
      {/* sorting */}
      <div>
        <span>Sort By:</span>
        <select className="bg-bg-primary text-text-primary p-1 m-2" onChange={handleSortByChange}>
          <option value={"date"}>Latest</option>
          <option value={"title"}>Title</option>
        </select>
      </div>
    </header>
  );
};
