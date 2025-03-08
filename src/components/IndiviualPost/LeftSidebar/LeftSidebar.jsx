import { Reactions } from "../../Dashboard/PostContainer/Reactions/Reactions";

export const LeftSidebar = ({ commentsCount }) => {
  return (
    <aside>
      <Reactions
        className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
        iconsSize={`1.6rem`}
        totalComments={commentsCount}
      />
    </aside>
  );
};
