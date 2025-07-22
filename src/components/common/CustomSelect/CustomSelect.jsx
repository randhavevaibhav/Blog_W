import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

const CustomSelectItem = ({ name, desc, value }) => {
  return (
    <SelectItem
      value={value}
      className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
    >
      <div className="ml-4">
        <h4 className="font-semibold !text-fs_lg">{name}</h4>
        <span className="text-fs_xs">{desc}</span>
      </div>
    </SelectItem>
  );
};

export const CustomSelect = ({
  handleValueChange,
  value,
  defaultValue = "desc",
  list = [ {
    name: "No value",
    desc: "No value",
    value: "NA",
  },],
}) => {
  return (
    <Select
      onValueChange={(value) => handleValueChange({ option: value })}
      defaultValue={defaultValue}
      value={value}
    >
      <SelectTrigger className="focus:outline-none px-2 py-2 outline-none focus:ring-0 ring-0 items-center justify-center rounded-md  md:hover:bg-action-color md:hover:text-white duration-200">
        <BiSortAlt2 size={"24px"} />
        <span className="font-semibold text-fs_base tracking-wide">Sort</span>
      </SelectTrigger>

      <SelectContent className={`!min-w-[200px]`}>
        {list.map((item) => {
          return (
            <CustomSelectItem
              name={item.name}
              desc={item.desc}
              value={item.value}
              key={uuidv4()}
            />
          );
        })}
      </SelectContent>
    </Select>
  );
};
