import React, { memo } from "react";
import { usePostContext } from "../../../hooks/posts/usePostContext";
import { saveLocalPostData } from "../../../utils/browser";
import { Button } from "@/components/ui/button";

export const FormatButtons = memo(() => {
  const { postDataRef } = usePostContext();

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

    const contentVal = newText;
    saveLocalPostData({
      content: contentVal,
    });
    postDataRef.current.content.value = newText;

    return newText;
  };

  const getSelectedText = ({ textarea }) => {
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = textarea.value.substring(selectionStart, selectionEnd);

    return { selectedText, selectionEnd, selectionStart };
  };

  const makeTextBold = () => {
    const { selectionStart, selectionEnd, selectedText } = getSelectedText({
      textarea: postDataRef.current.content,
    });

    const boldText = ` **${selectedText}** `;

    replaceWithFormattedText({
      originalText: postDataRef.current.content.value,
      formattedText: boldText,
      selectionStart,
      selectionEnd,
    });
  };

  const makeTextItalic = () => {
    const { selectedText, selectionEnd, selectionStart } = getSelectedText({
      textarea: postDataRef.current.content,
    });

    const italicText = ` _${selectedText}_ `;
    replaceWithFormattedText({
      originalText: postDataRef.current.content.value,
      formattedText: italicText,
      selectionStart,
      selectionEnd,
    });
  };

  const addCodeBlock = () => {
    const content = postDataRef.current.content.value;
    const codeBlock = "\n```js\n\n```";
    const { selectionEnd, selectionStart } = getSelectedText({
      textarea: postDataRef.current.content,
    });

    replaceWithFormattedText({
      originalText: content,
      formattedText: codeBlock,
      selectionStart,
      selectionEnd,
    });
  };

  const addHeading = () => {
    const content = postDataRef.current.content.value;
    const headingMarkDown = "\n## ";
    const { selectionEnd, selectionStart } = getSelectedText({
      textarea: postDataRef.current.content,
    });

    replaceWithFormattedText({
      originalText: content,
      formattedText: headingMarkDown,
      selectionStart,
      selectionEnd,
    });
  };

  return (
    <div className="flex gap-2 helpers  flex-wrap">
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
