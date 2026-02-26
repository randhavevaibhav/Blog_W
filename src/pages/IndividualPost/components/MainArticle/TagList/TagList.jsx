import { Button } from '@/components/ui/button'
import { getTaggedPostsPageLink } from '@/utils/getLinks';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
export const TagList = ({tagList}) => {

  const navigate = useNavigate()
   
  return (
     <ul className="flex gap-2 mb-4">
      {tagList.map((hashtag, i) => (
        <li
          key={uuidv4()}
          className="flex items-center bg-card-bg hover:bg-card-bg-hover px-2 rounded-md gap-2"
        >
          <Button
            variant={`ghost`}
            className={`gap-1 hover:bg-inherit p-0  cursor-pointer`}
            type={"button"}
            onClick={()=>navigate(getTaggedPostsPageLink({
              hashtagId:hashtag.id,
              hashtagName:hashtag.name
            }))}
          >
            <span
              style={{ color:hashtag.color}}
              className="font-semibold text-fs_lg"
            >
              #
            </span>
            {hashtag.name}
          </Button>
         
        </li>
      ))}
    </ul>
  )
}
