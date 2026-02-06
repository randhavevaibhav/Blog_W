import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

export const TagListItem = ({ id, name, color }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  return (
    <div
      className={`flex items-center  md:px-2 px-1 rounded-md gap-2 text-fs_xs border border-transparent  hover:border-tag-bg-hover duration-200 w-full`}
      style={{ "--tag-bg-hover": color }}
      data-test={`hashtag-list-element`}
      data-value={name}
    >
      <Button
        variant={`ghost`}
        className={`gap-1 hover:bg-inherit p-0  cursor-pointer h-7 w-full justify-start`}
        type={"button"}
        onClick={(e) => {
          setSearchParams({
            hashtagId: id,
            sort: sortBy,
          });
         
        }}
      
      >
        
        <span style={{ color: color }} className="font-semibold text-fs_lg">
          #
        </span>
        {name}
      </Button>
    </div>
  );
};