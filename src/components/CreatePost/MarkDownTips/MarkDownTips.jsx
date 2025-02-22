import { forwardRef } from "react";

export const MarkDownTips = forwardRef((props,ref)=>{
  // absolute top-[365px] max-w-[20rem] right-[18px]
    return(
        
          <aside className="tips  sticky hidden top-[400px]" ref={ref}>
            <h4 className="font-bold text-lg">Editor tips:</h4>
            <ul className="list-disc pl-5">
              <li>Use Markdown to write and format post</li>
              <li>{`Embed rich content such as Tweets, YouTube videos, etc. Use the complete URL: {% embed https://... %}.`}</li>
              <li>
                In addition to images for the post's content, you can also
                drag and drop a cover image.
              </li>
            </ul>
          </aside>
      
      
    )
})