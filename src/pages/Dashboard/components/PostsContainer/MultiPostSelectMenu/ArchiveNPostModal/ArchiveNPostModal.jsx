import Modal from "@/components/common/Modal/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiArchiveBox, HiArchiveBoxXMark } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

export const ArchiveNPostModal = ({
  archivePost,
  totalSelectedPosts,
  deSelectAllPosts,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paramArchive = parseInt(searchParams.get("archive"));
  const isArchive = paramArchive ? true : false;
  const archiveText = isArchive ? "Un-Archive" : "Archive";

  const savedSelectedPosts = getLocalStorageItem("selectedPosts");
  const selectedPosts = new Set(JSON.parse(savedSelectedPosts));

  const handleNArchivePost = () => {
    archivePost({
      postIds: [...selectedPosts],
      archive: isArchive ? 0 : 1, //if on archive tab {i.e., archive=1} un-archive posts vice versa.
    });
    setIsModalOpen(false);
    setLocalStorageItem("selectedPosts", null);
    setLocalStorageItem("selectAllPosts", null);
    deSelectAllPosts();
  };

  const archiveIcon = isArchive ? (
    <HiArchiveBoxXMark className="flex-none flex !size-5" />
  ) : (
    <HiArchiveBox className="flex-none flex !size-5" />
  );

  return (
    <div>
      <Button
        className={"p-2 md:hover:bg-orange-500 max-md:bg-orange-500 md:text-primary md:hover:text-white max-md:hover:bg-orange-500 max-md:h-8"}
        variant={"ghost"}
        onClick={() => setIsModalOpen(true)}
         data-test={"archive-multiple-posts-btn"}
        data-total-selected-posts={totalSelectedPosts}
      >
        {archiveIcon}
        <span className="text-base max-md:text-sm tracking-wider">
          {archiveText}&nbsp;{totalSelectedPosts}
        </span>
      </Button>
      {createPortal(
        <Modal isOpen={isModalOpen} data-test={`archive-multiple-posts-modal`}>
          <Modal.Body
            isControlled={false}
            className={`min-w-[200px] max-w-[600px] gap-4`}
          >
            <div className="flex items-center p-4">
              <Modal.Icon>{archiveIcon}</Modal.Icon>
            </div>

            <Modal.Title>
              {`Are you sure want to ${archiveText} all ${totalSelectedPosts} posts?`}
            </Modal.Title>

            <div className="flex gap-2 justify-between  flex-col sm:flex-row min-w-[200px] mx-auto">
              <Button
                className={cn(
                  "bg-orange-500 text-white disabled:cursor-not-allowed hover:bg-orange-500",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNArchivePost();
                }}
                data-test={`archive-multiple-posts-submit-btn`}
                variant={"ghost"}
              >
                {archiveText}
              </Button>
              <Button
                className={cn("px-8")}
                onClick={() => {
                  setLocalStorageItem("selectAllPosts", false);
                  setLocalStorageItem("selectedPosts", null);
                  setIsModalOpen(false);
                  deSelectAllPosts()
                }}
                 data-test={`archive-multiple-posts-cancel-btn`}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>,
        document.body,
      )}
    </div>
  );
};
