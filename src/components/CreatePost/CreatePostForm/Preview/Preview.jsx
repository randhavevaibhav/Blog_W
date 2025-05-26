
import { MarkDown } from "../../../common/MarkDown/MarkDown";
import { Button } from "../../../common/Button/Button";
import { getLocalStorageItem } from "../../../../utils/browser";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";

export const Preview = ({ hidePreview }) => {
  const { title, content, imgURL } = getLocalStorageItem("PostData");

  return (
    <>
      <main >
        <Button className={`boder border-[#e5e7eb] mb-4`} onClick={hidePreview}>
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

        <MarkDown>{content}</MarkDown>
        <ScrollToTop />
      </main>
    </>
  );
};
