import React, { useRef, useState } from "react";
import { Hashtag } from "./Hashtag/Hashtag";
import { v4 as uuidv4 } from "uuid";

import useOutsideClick from "@/hooks/utils/useOutsideClick";
import { SelectedHTList } from "./SelectedHTList/SelectedHTList";
import { getLocalPostData, saveLocalPostData } from "@/utils/browser";
import { usePostContext } from "@/hooks/posts/usePostContext";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";

export const HashtagList = ({ hashtags }) => {
  const [showHashtagList, setShowHashtagList] = useState(false);
  const [filterError, setShowFilterError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const hashtagInputRef = useRef(null);

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
    if (postDataRef.current) {
      postDataRef.current.tagList = [...selectedHashtagList, hashtag];
    }

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
    if (postDataRef.current) {
      postDataRef.current.tagList = filteredList;
    }

    saveLocalPostData({
      tagList: filteredList,
    });
    setSelectedHashtagList(filteredList);
  };

  const scrollActiveElementInView = ({ activeIndex, block = "start" }) => {
    if (activeIndex >= 0) {
      const element = document.getElementById(`hashtag_${activeIndex}`);

      element.scrollIntoView({ behavior: "smooth", block });
    }
  };

  const handleArrowUpKeyPress = ({ count }) => {
    setActiveIndex((prevIndex) => {
      if (prevIndex <= 0) {
        scrollActiveElementInView({ activeIndex: count - 1, block: "start" });
      }
      return prevIndex <= 0 ? count - 1 : prevIndex - 1;
    });

    scrollActiveElementInView({ activeIndex, block: "end" });
  };
  const handleArrowDownKeyPress = ({ count }) => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === count - 1) {
        scrollActiveElementInView({ activeIndex: 0, block: "end" });
      }
      return prevIndex === count - 1 ? 0 : prevIndex + 1;
    });

    scrollActiveElementInView({ activeIndex, block: "start" });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleHashtagSelect({
        hashtag: hashtagList[activeIndex],
      });
      return;
    }
    const count = hashtagList.length;
    if (event.key === "ArrowUp" && count > 0) {
      event.preventDefault();

      handleArrowUpKeyPress({ count });
    } else if (event.key === "ArrowDown" && count > 0) {
      event.preventDefault();
      handleArrowDownKeyPress({ count });
    }
  };

  const resetActiveIndx = () => {
    setActiveIndex(-1);
  };

  const handleHashtagInputChange = () => {
    resetActiveIndx();
    setShowHashtagList(true);
    if (hashtagInputRef.current) {
      const hashtagInputVal = hashtagInputRef.current.value.toLowerCase();
      let filteredHashtagList = [];

      if (selectedHashtagList.length > 0) {
        const unSelectedHashtagList = selectedHashtagList.reduce(
          (acc, hashtag) => {
            return acc.filter((val) => {
              return val.name != hashtag.name;
            });
          },
          hashtags
        );
        // console.log("unSelectedHashtagList ==> ", unSelectedHashtagList);
        filteredHashtagList = unSelectedHashtagList.filter((hashtag) => {
          return hashtag.name.toLowerCase().includes(hashtagInputVal);
        });
      } else {
        filteredHashtagList = hashtags.filter((hashtag) => {
          // console.log(
          //   "hashtag.name.toLowerCase().includes(hashtagInputVal) ==> ",
          //   hashtag.name.toLowerCase().includes(hashtagInputVal)
          // );
          return hashtag.name.toLowerCase().includes(hashtagInputVal);
        });
      }

      // console.log(
      //   "filteredHashtagList.length ==> ",
      //   filteredHashtagList.length
      // );
      if (filteredHashtagList.length === 0) {
        setShowFilterError(true);
      } else {
        setShowFilterError(false);
      }
      setHashtagList(filteredHashtagList);
    }
  };

  return (
    <>
      <div ref={hashtagDivRef} className="">
        <Input
          placeholder="Search hashtags"
          className={`mb-4 ${selectedHashtagList.length >= 4 ? `hidden` : ``}`}
          ref={hashtagInputRef}
          onChange={handleHashtagInputChange}
          type="input"
          onKeyDown={handleKeyDown}
          onFocus={() => setShowHashtagList(true)}
        />

        {filterError ? <ErrorText>{`No match found !!`}</ErrorText> : null}
        {selectedHashtagList.length > 0 ? (
          <SelectedHTList
            selectedHashtagList={selectedHashtagList}
            handleHashtagRemove={handleHashtagRemove}
          />
        ) : null}
        <div>
          {!showHashtagList && selectedHashtagList.length < 4 ? (
            <Link
              onClick={() => setShowHashtagList(true)}
              type="button"
              className="underline tracking-wide text-fs_base md:hover:text-action-color"
            >
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
                <Hashtag
                  name={hashtag.name}
                  id={hashtag.id}
                  color={hashtag.color}
                  handleHashtagSelect={handleHashtagSelect}
                  isActive={i === activeIndex}
                  resetActiveIndx={resetActiveIndx}
                  key={uuidv4()}
                  idx={i}
                />
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
};
