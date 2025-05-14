import { createPortal } from "react-dom";
import Modal from "../../../../common/Modal/Modal";

import { FaTrash } from "react-icons/fa";
import { Button } from "../../../../common/Button/Button";

export const DeletePostModal = ({
  isOpen,
  handleCloseModal,
  handleDeletePost,
  modalTitle,
  isControlled,
}) => {
  return createPortal(
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <>
        <Modal.Body onClose={handleCloseModal} isControlled={isControlled}>
          <Modal.Icon>
            <FaTrash className="text-red-500 text-4xl" />
          </Modal.Icon>

          <>
            <Modal.Title>
              {modalTitle}
            </Modal.Title>

            {isControlled ? (
              <div className="flex gap-2 justify-center flex-col sm:flex-row  ">
                <Button onClick={handleCloseModal} varient="primary">
                  Cancel
                </Button>
                <Button varient="danger" onClick={handleDeletePost}>
                  Delete
                </Button>
              </div>
            ) : null}
          </>
        </Modal.Body>
      </>
    </Modal>,
    document.body
  );
};
