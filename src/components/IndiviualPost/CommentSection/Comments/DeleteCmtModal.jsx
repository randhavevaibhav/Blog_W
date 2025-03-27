import React from "react";
import Modal from "../../../common/Modal/Modal";
import { FaTrash } from "react-icons/fa";
import { Button } from "../../../common/Button/Button";

export const DeleteCmtModal = ({isDeleteCmtPending,isDeleteCmtModalOpen,handleDeleteCmt,closeDeleteCmtModal}) => {
  return (
    <>
      <Modal
        isOpen={isDeleteCmtModalOpen}
        onClose={closeDeleteCmtModal}
      >
        <>
          <Modal.Body onClose={closeDeleteCmtModal}>
            <Modal.Icon>
              <FaTrash className="text-red-500 text-4xl" />
            </Modal.Icon>

            {isDeleteCmtPending ? (
              <Modal.Title>Deleting comment ....</Modal.Title>
            ) : (
              <>
                <Modal.Title>{`Are you sure want to delete this comment ?`}</Modal.Title>

                <div className="flex gap-2 justify-center flex-col sm:flex-row  ">
                  <Button
                    onClick={closeDeleteCmtModal}
                    varient="primary"
                  >
                    Cancel
                  </Button>
                  <Button varient="danger" onClick={handleDeleteCmt}>
                    Delete
                  </Button>
                </div>
              </>
            )}
          </Modal.Body>
        </>
      </Modal>
    </>
  );
};
