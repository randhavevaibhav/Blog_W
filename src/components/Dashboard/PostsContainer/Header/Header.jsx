import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const Header = ({ handleSortByChange }) => {
  return (
    <header className="flex justify-between my-3">
      <h2 className="text-fs_3xl font-semibold">Posts</h2>
      <div>
        <Select
          onValueChange={(value) => handleSortByChange({ option: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Latest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
            <SelectItem value="name">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};
