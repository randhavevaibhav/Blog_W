import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
const ModalIcon = ({ children }) => {
  return (
    <>
      <div className="m-auto">{children}</div>
    </>
  );
};

const ModalTitle = (props) => {
  const defaultClasses = `text-fs_base text-center tracking-wide font-medium p-2`;
  const { children, className, ...rest } = props;
  const overrideClasses = twMerge(defaultClasses, className);

  return (
    <>
      <div className={overrideClasses} {...rest}>
        {children}
      </div>
    </>
  );
};

const ModalBody = (props) => {
  const defaultClasses =
    "p-4 text-text-primary bg-card-bg rounded-md w-full flex flex-col";
  const { children, isControlled = true, onClose, className, ...rest } = props;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <>
      <div
        className={overrideClasses}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        {isControlled ? (
          <button
            onClick={onClose}
            className="self-end "
            data-test={`close-modal`}
          >
            <IoClose />
          </button>
        ) : null}

        {children}
      </div>
    </>
  );
};

const Modal = (props) => {
  const { isOpen, onClose = () => {}, children = "", ...rest } = props;
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return (
    <>
      <div
        className={`inset-0 bg-gray-900 size-full start-0 bg-opacity-50 fixed ${
          isOpen ? "" : "hidden"
        } z-modal flex items-center justify-center px-4 `}
        onClick={onClose}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Icon = ModalIcon;

export default Modal;
