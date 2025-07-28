import { Button } from "@/components/ui/button";
import React from "react";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import SiteLogo from "../SiteLogo/SiteLogo";

export const RequireLoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  return createPortal(
    <Modal isOpen={true} data-test={`require-login-modal`}>
      <Modal.Body
        isControlled={true}
        onClose={onClose}
        className={`min-w-[200px] max-w-[600px]`}
      >
        <div className="flex flex-col items-center">
          <SiteLogo />
          <Modal.Title className={`text-fs_xl font-extrabold px-8 pb-4`}>
            Login to continue
          </Modal.Title>
        </div>

        <div className="flex gap-4 flex-col items-center  px-8 pb-8">
          <Button
            variant="action"
            className="w-full tracking-wide "
            size={`lg`}
            onClick={() => {
              navigate(`/signin`);
            }}
          >
            Login
          </Button>

          <Button
            variant=""
            className="w-full tracking-wide "
            size={`lg`}
            onClick={() => {
              navigate(`/signup`);
            }}
          >
            Create account
          </Button>
        </div>
      </Modal.Body>
    </Modal>,
    document.body
  );
};
