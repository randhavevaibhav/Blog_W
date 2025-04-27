import "../../../assets/styles/code-dark.css";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { Button } from "../../common/Button/Button";
import { getLocalStorageItem } from "../../../utils/browser";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";

export const Preview = ({ hidePreview }) => {
  const { title, content, imgURL } = getLocalStorageItem("PostData");

  return (
    <>
      <main>
        <Button className={`boder border-[#e5e7eb] mb-4`} onClick={hidePreview}>
          Edit
        </Button>
        {imgURL ? (
          <img
            src={imgURL}
            alt="title img"
            className="w-full max-h-[400px] object-contain my-4"
          />
        ) : null}
        {title ? (
          <h1 className="text-fs_4xl font-bold mb-2 my-2 tracking-[-0.011em]">
            {title}
          </h1>
        ) : null}

        <MarkDown>{content}</MarkDown>
        <ScrollToTop />
      </main>
    </>
  );
};
