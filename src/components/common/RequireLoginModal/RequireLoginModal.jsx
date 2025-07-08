import { Button } from "@/components/ui/button";
import React from "react";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

export const RequireLoginModal = ({onClose}) => {
  return (
    createPortal(<Modal isOpen={true} >
      <Modal.Body isControlled={true} onClose={onClose}>
        <Modal.Title>Please login to continue</Modal.Title>

        <div className="flex gap-2 justify-between  flex-col sm:flex-row min-w-[200px] mx-auto">
          <Link to={`/signin`}>
            <Button variant="action"  className="w-full">Login</Button>
          </Link>

          <Link to={`/signup`}>
            <Button variant=""  className="w-full">Create account</Button>
          </Link>
        </div>
      </Modal.Body>
    </Modal>,document.body)
  );
};
