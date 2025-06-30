import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'
import { FaSort } from 'react-icons/fa'

export const SortPosts = ({handleSortByChange,sortBy}) => {
  return (
     <Select
          onValueChange={(value) => handleSortByChange({ option: value })}
          defaultValue="desc"
          value={sortBy}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SelectTrigger className=" w-[35px] h-[30px] focus:outline-none p-0 outline-none focus:ring-0 ring-0 items-center justify-center rounded-md">
                  <FaSort className="w-[35px] h-[30px] hover:bg-action-color rounded-md hover:text-white duration-100" />
                </SelectTrigger>
              </TooltipTrigger>
              <TooltipContent className="md:block hidden">Sort posts</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <SelectContent className={`!min-w-[200px]`}>
            <SelectItem
              value="name"
              className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
            >
              <div className="ml-4">
                <h4 className="font-semibold !text-fs_lg">Title</h4>
                <span className="text-fs_xs">A to Z</span>
              </div>
            </SelectItem>
            <SelectItem
              value="desc"
              className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
            >
              <div className="ml-4">
                <h4 className="font-semibold !text-fs_lg">Latest</h4>
                <span className="text-fs_xs ">Latest posts will be first</span>
              </div>
            </SelectItem>
            <SelectItem
              value="asc"
              className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
            >
              <div className="ml-4">
                <h4 className="font-semibold !text-fs_lg">Oldest</h4>
                <span className="text-fs_xs">oldest posts will be first</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
  )
}
