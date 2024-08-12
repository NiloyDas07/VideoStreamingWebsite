import React from "react";

const Modal = ({ isVisible, onClose, children, className }) => {
  return (
    isVisible && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
        onClick={onClose}
      >
        <div
          className="relative max-h-[80vh] w-full max-w-xs overflow-y-auto rounded bg-white p-4 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
