import { forwardRef } from "react";

export const MarkDownTips = forwardRef((props,ref)=>{

    return(
        
      <div className="p-1 md:block hidden">
      <aside className="tips sticky top-[500px]">
        <h4 className="font-bold text-lg">Editor tips:</h4>
        <ul className="list-disc pl-5">
          <li>Use Markdown to write and format post</li>
          <li>{`Embed rich content such as Tweets, YouTube videos, etc. Use the complete URL: {% embed https://... %}.`}</li>
          <li>
            In addition to images for the post's content, you can also drag
            and drop a cover image.
          </li>
        </ul>
      </aside>
    </div>
      
      
    )
})