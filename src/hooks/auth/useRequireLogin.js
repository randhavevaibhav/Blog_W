import { useState } from "react";

export const useRequireLogin = ({ accessToken = null }) => {
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);

  const checkLogin = (cb = () => {}) => {
    if (accessToken) {
      setShowRequireLoginModal(false);
      cb();
    } else {
      setShowRequireLoginModal(true);
      return;
    }
  };

  const hideLoginModal = () => {
    setShowRequireLoginModal(false);
  };
  const showLoginModal = () => {
    setShowRequireLoginModal(true);
  };

  return {
    showRequireLoginModal,
    checkLogin,
    hideLoginModal,
  };
};
