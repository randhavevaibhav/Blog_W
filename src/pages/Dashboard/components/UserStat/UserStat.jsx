
const DashboardPills = (props) => {
  const { count, text, ...rest } = props;
  return (
    <div className="flex  md:flex-col md:p-5 p-3 bg-card-bg rounded-md md:items-start items-baseline md:gap-2 gap-2 " {...rest}>
      <strong className="text-text-primary md:text-3xl text-fs_2xl">
        {/* <CountUp to={count} /> */}
        {count}
      </strong>
      <span className="text-text-primary text-fs_base text-gray-400">
        {text}
      </span>
    </div>
  );
};

export const UserStat = ({
  totalLikesCount = 0,
  totalPostsCount = 0,
  totalCommentsCount = 0,
}) => {
  return (
    <div className="header md:mb-0 mb-6">
      {/* header with pills */}

      <header
        className="text-text-primary text-3xl tracking-wide font-bold"
        data-test={`dashboard-header-title`}
      >
        Dashboard
      </header>
      {/* Dashboard pills container*/}
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 pt-3">
        <DashboardPills
          count={parseInt(totalLikesCount)}
          text={"Posts likes"}
          data-test={`dashboard-total-likes`}
          data-value={totalLikesCount}
        />
        <DashboardPills
          count={parseInt(totalPostsCount)}
          text={"Total posts"}
          data-test={`dashboard-total-posts`}
          data-value={totalPostsCount}
        />
        <DashboardPills
          count={parseInt(totalCommentsCount)}
          text={"Post comments"}
          data-test={`dashboard-total-comments`}
          data-value={totalCommentsCount}
        />
      </div>
    </div>
  );
};
