
const DashboardPills = ({ count, text }) => {
    return (
      <div className="flex  flex-col md:p-5 p-3 dark:bg-[#212020] bg-[#efefef] rounded-md">
        <strong className="text-text-primary md:text-3xl text-2xl">{count}</strong>
        <span className="text-text-primary text-base text-gray-400">{text}</span>
      </div>
    );
  };
  
export const Header = ({totoalPostsCount,totalCommentsCount}) => {
  return (
    <div className="header">
      {/* header with pills */}

      <header className="text-text-primary text-3xl tracking-wide font-bold">
        Dashboard
      </header>
      {/* Dashboard pills container*/}
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 pt-3">
        <DashboardPills count={0} text={"Total post reactions"} />
        <DashboardPills count={totoalPostsCount} text={"Total posts"} />
        <DashboardPills count={totalCommentsCount} text={"Total post comments"} />
      </div>
    </div>
  );
};
