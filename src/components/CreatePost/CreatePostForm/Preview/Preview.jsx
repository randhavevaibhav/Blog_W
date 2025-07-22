
import { MarkDown } from "../../../common/MarkDown/MarkDown";

import { getLocalStorageItem } from "../../../../utils/browser";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import { Button } from "@/components/ui/button";
import { PostTags } from "@/components/common/PostTags/PostTags";

export const Preview = ({ hidePreview }) => {
  const { title, content, imgURL,tagList } = getLocalStorageItem("PostData");

  return (
    <>
      <main >
        <Button className={`mb-4 px-6 `} onClick={hidePreview} variant="action">
          Edit
        </Button>
        {imgURL ? (
          <img
            src={imgURL}
            alt="title img"
            className="w-full md:h-[400px] md:object-cover object-contain"
          />
        ) : null}
        {title ? (
          <h1 className="text-fs_5xl font-extrabold my-2 tracking-[-0.011em] capitalize">
            {title}
          </h1>
        ) : null}
        <PostTags tagList={tagList}/>
        <MarkDown>{content}</MarkDown>
        <ScrollToTop />
      </main>
    </>
  );
};
