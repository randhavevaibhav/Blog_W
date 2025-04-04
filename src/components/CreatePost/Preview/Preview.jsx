import "../../../assets/styles/code-dark.css";
import "./Preview.css";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { Button } from "../../common/Button/Button";
import { getLocalStorageItem } from "../../../utils/browser";

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
            className="w-full max-h-[400px] object-contain"
          />
        ) : null}
        {title ? (
          <h1 className="font-bold text-6xl tracking-wide">{title}</h1>
        ) : null}

        <MarkDown>{content}</MarkDown>
      </main>
    </>
  );
};
