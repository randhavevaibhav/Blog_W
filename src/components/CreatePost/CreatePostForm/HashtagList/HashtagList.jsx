import React, { useRef, useState } from "react";
import { Hashtag } from "./Hashtag/Hashtag";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import useOutsideClick from "@/hooks/utils/useOutsideClick";
import { SelectedHTList } from "./SelectedHTList/SelectedHTList";
import { getLocalPostData, saveLocalPostData } from "@/utils/browser";
import { usePostContext } from "@/hooks/posts/usePostContext";
import { Link } from "react-router-dom";

export const HashtagList = ({ hashtags }) => {
  const [showHashtagList, setShowHashtagList] = useState(false);
  const { postDataRef } = usePostContext();
  const localPostData = getLocalPostData();
  const localTagList = localPostData.tagList ? localPostData.tagList : null;
  const [selectedHashtagList, setSelectedHashtagList] = useState(
    localTagList ? localTagList : []
  );

  let filteredHashtagList = null;

  if (selectedHashtagList.length > 0) {
    filteredHashtagList = selectedHashtagList.reduce((acc, selectedHashtag) => {
      acc = acc.filter((hashtag) => {
        return hashtag.name != selectedHashtag.name;
      });

      return acc;
    }, hashtags);
  }

  const [hashtagList, setHashtagList] = useState(
    filteredHashtagList ? filteredHashtagList : hashtags
  );

  const hashtagDivRef = useRef(null);
  useOutsideClick(hashtagDivRef, () => {
    setShowHashtagList(false);
  });

  const handleHashtagSelect = ({ hashtag }) => {
    if (selectedHashtagList.length >= 3) {
      setShowHashtagList(false);
    }
    const filteredList = hashtagList.filter((val) => {
      return val.name != hashtag.name;
    });
    setHashtagList(filteredList);
    postDataRef.current.tagList = [...selectedHashtagList, hashtag];

    saveLocalPostData({
      tagList: [...selectedHashtagList, hashtag],
    });

    setSelectedHashtagList([...selectedHashtagList, hashtag]);
  };
  const handleHashtagRemove = ({ hashtag }) => {
    setHashtagList([hashtag, ...hashtagList]);
    const filteredList = selectedHashtagList.filter((val) => {
      return val.name != hashtag.name;
    });

    postDataRef.current.tagList = filteredList;
    saveLocalPostData({
      tagList: filteredList,
    });
    setSelectedHashtagList(filteredList);
  };

  return (
    <>
      <div ref={hashtagDivRef}>
        {selectedHashtagList.length > 0 ? (
          <SelectedHTList
            selectedHashtagList={selectedHashtagList}
            handleHashtagRemove={handleHashtagRemove}
          />
        ) : null}
        <div>
          {!showHashtagList && selectedHashtagList.length < 4 ? (
            <Link onClick={() => setShowHashtagList(true)} type="button" className="underline tracking-wide text-fs_base md:hover:text-action-color">
            Hashtags
            </Link>
          ) : selectedHashtagList.length >= 4 ? (
            <span>Only 4 hashtags can be selected !</span>
          ) : null}
        </div>

        {showHashtagList ? (
          <ul className="max-h-[9rem] overflow-auto flex flex-col gap-2 ">
            {hashtagList.map((hashtag, i) => {
              return (
                <li key={uuidv4()}>
                  <Hashtag
                    name={hashtag.name}
                    id={hashtag.id}
                    color={hashtag.color}
                    handleHashtagSelect={handleHashtagSelect}
                  />
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
};
