import "../../../assets/styles/code-dark.css";

import { getLocalStorageItem } from "../../../utils/browser";

import "./Preview.css";

import {
  localPost,
  localPostTitle,
  localPostTitleImgURL,
} from "../../../utils/constants";
import { MarkDown } from "../../common/MarkDown/MarkDown";

export const Preview = ({}) => {
  let title = getLocalStorageItem(localPostTitle);
  let img = getLocalStorageItem(localPostTitleImgURL);
  let content = getLocalStorageItem(localPost);

  return (
    <>
      <main>
        {img ? <img src={img} alt="title img" /> : null}
        {title ? (
          <h1 className="font-bold text-6xl tracking-wide">{title}</h1>
        ) : null}

        <MarkDown>{content}</MarkDown>
      </main>
    </>
  );
};
