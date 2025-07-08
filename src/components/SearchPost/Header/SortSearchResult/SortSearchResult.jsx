import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import { LuChevronsRightLeft } from 'react-icons/lu'

export const SortSearchResult = ({handleSearchSort,sortBy}) => {

  return (
    <>
      {/* <Select
            onValueChange={(value) => {handleSearchSort({type:value})}}
          
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SelectTrigger className=" size-8 focus:outline-none p-0 outline-none focus:ring-0 ring-0 items-center justify-center rounded-md">
                    <LuChevronsRightLeft className=" size-8 hover:bg-action-color rounded-md hover:text-white duration-100" />
                  </SelectTrigger>
                </TooltipTrigger>
                <TooltipContent side={`bottom`}>Sort Result</TooltipContent>
              </Tooltip>
            </TooltipProvider>
    
            <SelectContent className={`!min-w-[250px]`}>
              <SelectItem
                value="desc"
                className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
              >
                <div className="ml-4">
                  <h4 className="font-semibold !text-fs_lg">New</h4>
                  <span className="text-fs_xs">
                    New posts will be first
                  </span>
                </div>
              </SelectItem>
              <SelectItem
                value="asc"
                className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
            
              >
                <div className="ml-4">
                  <h4 className="font-semibold !text-fs_lg">Old</h4>
                  <span className="text-fs_xs">Old posts will be first</span>
                </div>
              </SelectItem>
            
            </SelectContent>
          </Select> */}

            <div className="flex items-center gap-4">
                  <Select
                    onValueChange={(value) => handleSearchSort({ type: value })}
                    defaultValue="desc"
                    value={sortBy}
                  >
                    <SelectTrigger className="focus:outline-none px-2 py-2 outline-none focus:ring-0 ring-0 items-center justify-center rounded-md  md:hover:bg-action-color md:hover:text-white duration-200">
                      <BiSortAlt2 size={"24px"} />
                      <span className="font-semibold text-fs_base tracking-wide">
                        Sort
                      </span>
                    </SelectTrigger>
          
                    <SelectContent className={`!min-w-[200px]`}>
                     
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
                </div>
    
    </>
  
  )
}
