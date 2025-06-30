import React from 'react'
import { RecentComment } from './recentComment'
import { v4 as uuidv4 } from "uuid";
export const RecentCommentsList = ({recentComments}) => {
  return (
   <div className='flex flex-col gap-2'>
   {  recentComments.map((comment)=>{
        return (<RecentComment comment={comment} key={uuidv4()}/>)
    })}
   </div>
  )
}
