import "../../../assets/styles/code-dark.css";



import "./Preview.css";


import { MarkDown } from "../../common/MarkDown/MarkDown";
import { getLocalPostInfo } from "../CreatePostForm/utils";

export const Preview = ({mode}) => {

  const {title,content,imgURL} = getLocalPostInfo(mode);

  return (
    <>
      <main>
        {imgURL ? <img src={imgURL} alt="title img"   className="w-full max-h-[400px] object-contain"/> : null}
        {title ? (
          <h1 className="font-bold text-6xl tracking-wide">{title}</h1>
        ) : null}

        <MarkDown>{content}</MarkDown>
      </main>
    </>
  );
};
