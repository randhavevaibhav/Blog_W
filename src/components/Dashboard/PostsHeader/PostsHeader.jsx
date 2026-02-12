export const PostsHeader = ({  totalPostsCount }) => {
  return (
    <header className="">
      <h2 className="text-2xl font-semibold">Posts&nbsp;<span className="">(&nbsp;{`${totalPostsCount}`}&nbsp;)</span></h2>
    </header>
  );
};
