import { createPortal } from "react-dom";
import Modal from "../../../common/Modal/Modal";

import { FaTrash } from "react-icons/fa";
import { Button } from "../../../common/Button/Button";

export const DeletePostModal = ({modalState,handleCloseModal,handleDeletePost,isDeletePostPending}) => {
  
  return createPortal(
    <Modal
      isOpen={modalState.isOpen}
      onClose={handleCloseModal}
    >
      <>
        <Modal.Body
          onClose={handleCloseModal}
        >
          <Modal.Icon>
            <FaTrash className="text-red-500 text-4xl" />
          </Modal.Icon>

          {isDeletePostPending ? (
            <Modal.Title>Deleting post ....</Modal.Title>
          ) : (
            <>
              <Modal.Title>{`Are you sure want to delete post titled ${modalState.postTitle} ?`}</Modal.Title>

              <div className="flex gap-2 justify-center flex-col sm:flex-row  ">
                <Button
                  onClick={handleCloseModal}
                  varient="primary"
                >
                  Cancel
                </Button>
                <Button varient="danger" onClick={handleDeletePost}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </>
    </Modal>,
    document.body
  );
};
