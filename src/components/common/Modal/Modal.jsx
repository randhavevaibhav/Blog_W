import { IoClose } from "react-icons/io5";

const ModalIcon = ({ children }) => {
  return (
    <>
      <div className="m-auto">{children}</div>
    </>
  );
};

const ModalTitle = ({ children }) => {
  return (
    <>
      <p className="text-lg  text-center tracking-wide font-bold p-2">
        {children}
      </p>
    </>
  );
};

const ModalBody = ({ children, onClose }) => {
  return (
    <>
      <div
        className="flex flex-col min-w-[16rem] max-w-[400px]  p-4 text-text-primary bg-bg-shade rounded-md mx-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="self-end">
          <IoClose />
        </button>

        {children}
      </div>
    </>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={`inset-0 bg-gray-900 size-full start-0 bg-opacity-30 fixed ${
          isOpen ? "" : "hidden"
        } z-modal`}
        onClick={onClose}
      >
        <div className="h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Icon = ModalIcon;

export default Modal;
