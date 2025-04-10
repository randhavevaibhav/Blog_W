import React, { memo } from "react";
import { Button } from "../../../../common/Button/Button";
import { usePostContext } from "../../../../../hooks/posts/usePostContext";
import { saveLocalPostData } from "../../../../../utils/browser";

const addBoldMarkdownChara = (text) => {
  const formattedText = ` **${text}** `;
  return formattedText;
};

const addItalicMarkDownChara = (text) => {
  const formattedText = ` _${text}_ `;
  return formattedText;
};

const replaceWithFormattedText = ({
  originalText,
  formattedText,
  selectionStart,
  selectionEnd,
}) => {
  const newText =
    originalText.substring(0, selectionStart) +
    formattedText +
    originalText.substring(selectionEnd);

  return newText;
};

const getSelectedText = ({ textarea }) => {
  const selectionStart = textarea.selectionStart;
  const selectionEnd = textarea.selectionEnd;
  const selectedText = textarea.value.substring(selectionStart, selectionEnd);

  return { selectedText, selectionEnd, selectionStart };
};

export const FormatButtons = memo(() => {
  const { postDataRef, saveContentLocal } = usePostContext();

  const makeTextBold = () => {
    const { selectionStart, selectionEnd, selectedText } = getSelectedText({
      textarea: postDataRef.current.content,
    });
    const isAlreadyBold = selectedText.includes(`**`) ? true : false;
    if (!isAlreadyBold) {
      const boldText = addBoldMarkdownChara(selectedText);

      const newText = replaceWithFormattedText({
        originalText: postDataRef.current.content.value,
        formattedText: boldText,
        selectionStart,
        selectionEnd,
      });

      postDataRef.current.content.value = newText;
      const contentVal = newText;

      console.log("new text ===> ", contentVal);
      saveLocalPostData({
        content: contentVal,
      });
    }
  };

  const makeTextItalic = () => {
    const { selectedText, selectionEnd, selectionStart } = getSelectedText({
      textarea: postDataRef.current.content,
    });

    const isAlreadydItalic = selectedText.includes(`_`) ? true : false;
    if (!isAlreadydItalic) {
      const italicText = addItalicMarkDownChara(selectedText);
      const newText = replaceWithFormattedText({
        originalText: postDataRef.current.content.value,
        formattedText: italicText,
        selectionStart,
        selectionEnd,
      });

      postDataRef.current.content.value = newText;

      const contentVal = newText;
      saveLocalPostData({
        content: contentVal,
      });
    }
  };

  const addCodeBlock = () => {
    const content = postDataRef.current.content.value;
    const codeBlock = "```js\n\n```";
    const newText = `${content}\n${codeBlock}`;
    postDataRef.current.content.value = newText;
  };

  const addHeading = () => {
    const content = postDataRef.current.content.value;
    const headingMarkDown = `## `;
    let newText = "";
    if (content) {
      newText = `${content}\n${headingMarkDown}`;
    } else {
      newText = `${headingMarkDown}`;
    }

    postDataRef.current.content.value = newText;
  };
  return (
    <div className="flex gap-2 helpers mb-4">
      <Button type="button" className={`font-bold`} onClick={makeTextBold}>
        B
      </Button>
      <Button
        type="button"
        className={`font-bold italic`}
        onClick={makeTextItalic}
      >
        I
      </Button>
      <Button type="button" onClick={addCodeBlock}>
        JS
      </Button>
      <Button type="button" onClick={addHeading}>
        H
      </Button>
    </div>
  );
});
