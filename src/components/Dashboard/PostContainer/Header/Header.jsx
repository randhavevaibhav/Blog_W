export const Header = () => {
  return (
    <header className="flex justify-between">
      <h2>Posts</h2>
      {/* sorting */}
      <div>
        <select className="bg-bg-primary text-text-primary p-2">
          <option value={"asc"}>ASC</option>
          <option value={"dsc"}>DSC</option>
        </select>
      </div>
    </header>
  );
};
