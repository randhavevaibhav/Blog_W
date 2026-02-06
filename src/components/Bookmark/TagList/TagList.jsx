import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { TagListItem } from "./TagListItem";

export const TagList = ({ hashtags = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="max-w-52 lg:block hidden">
      <header className="font-semibold tracking-wide text-lg mb-2 mt-4">
        Filter by tags
      </header>

      <ul className="space-y-3">
        <li
          className={`flex items-center  md:px-2 px-1 rounded-md gap-2 text-fs_xs border border-transparent  hover:border-text-primary duration-200`}
        >
          <Button
            variant={`ghost`}
            className={`gap-1 hover:bg-inherit p-0  cursor-pointer h-7 w-full justify-start`}
            type={"button"}
            onClick={(e) => {
              setSearchParams({
                sort: "desc",
              });
            }}
          >
            <span className="font-semibold text-fs_lg">#</span>
            All tags
          </Button>
        </li>
        {hashtags.map((tag, idx) => {
          return (
            <li key={`${tag.id}_${idx}`}>
              <TagListItem id={tag.id} name={tag.name} color={tag.color} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
