import { formatNumber } from "../../../utils/utils";

const DashboardPills = ({ count, text }) => {
  return (
    <div className="flex  flex-col md:p-5 p-3 bg-card-bg rounded-md">
      <strong className="text-text-primary text-fs_3xl">{count}</strong>
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
    <div className="header md:mb-0 mb-10">
      {/* header with pills */}

      <header className="text-text-primary text-3xl tracking-wide font-bold" data-test={`dashboard-header-title`}>
        Dashboard
      </header>
      {/* Dashboard pills container*/}
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 pt-3">
        <DashboardPills
          count={formatNumber(parseInt(totalLikesCount))}
          text={"Total posts likes"}
        />
        <DashboardPills
          count={formatNumber(parseInt(totalPostsCount))}
          text={"Total posts"}
        />
        <DashboardPills
          count={formatNumber(parseInt(totalCommentsCount))}
          text={"Total post comments"}
        />
      </div>
    </div>
  );
};
