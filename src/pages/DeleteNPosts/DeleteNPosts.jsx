import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import Modal from "@/components/common/Modal/Modal";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { getDashboardPageLink } from "@/utils/getLinks";
import { sleep } from "@/utils/utils";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser";
import { useDeleteNPosts } from "@/hooks/posts/useDeleteNPosts";


const DeletePost = () => {
  const savedSelectedPosts = getLocalStorageItem("selectedItems");
  const selectedPosts = new Set(JSON.parse(savedSelectedPosts))

  const { isPending, deleteNPosts, isError, isSuccess, error } = useDeleteNPosts();
  const navigate = useNavigate();

  const handleNPostsDelete = async () => {
    deleteNPosts({
      postIds: [...selectedPosts],
    });
    setLocalStorageItem("selectedItems",null)
    await sleep(1000);

    navigate(getDashboardPageLink(), { replace: true });
  };

  if(selectedPosts.size<=0)
  {
    return  <MainLayout className={`mb-0`}>
      <Modal isOpen={true} data-test={`delete-posts-modal`}>
        <Modal.Body
          isControlled={false}
          className={`min-w-[200px] max-w-[600px] gap-4`}
        >
          <div className="flex items-center p-4">
            <Modal.Icon>
              <FaTrash className="text-red-500 text-4xl" />
            </Modal.Icon>
          </div>

          <Modal.Title>
            {`Please select some posts to delete !`}
          </Modal.Title>

          <div className="flex gap-2 justify-between  flex-col sm:flex-row min-w-[200px] mx-auto">
            <Button
              onClick={() => navigate(getDashboardPageLink())}
              className="px-8"
            >
              Return to Dashboard
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </MainLayout>;
  }

  if (isPending) {
    return <Loading>Deleting post ...</Loading>;
  }

  if (isError) {
    console.error(error);
    return <Error>Error while deleting post !</Error>;
  }

  if (isSuccess) {
    return <Loading>Redirecting ....</Loading>;
  }

  return (
    <MainLayout className={`mb-0`}>
      <Modal isOpen={true} data-test={`delete-posts-modal`}>
        <Modal.Body
          isControlled={false}
          className={`min-w-[200px] max-w-[600px] gap-4`}
        >
          <div className="flex items-center p-4">
            <Modal.Icon>
              <FaTrash className="text-red-500 text-4xl" />
            </Modal.Icon>
          </div>

          <Modal.Title>
            {`Are you sure want to delete all ${selectedPosts.size} posts?`}
          </Modal.Title>

          <div className="flex gap-2 justify-between  flex-col sm:flex-row min-w-[200px] mx-auto">
            <Button
              className="bg-red-500 text-white hover:bg-red-600 px-8"
              onClick={handleNPostsDelete}
              data-test={`delete-post-submit-btn`}
            >
              Delete
            </Button>
            <Button
              onClick={() => navigate(getDashboardPageLink())}
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </MainLayout>
  );
};

export default DeletePost;
