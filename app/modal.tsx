import React from "react";
import { TResult } from "./types";

const Modal = ({
  children,
  setShowModal,
}: {
  children: React.ReactNode;
  setShowModal: React.Dispatch<React.SetStateAction<null | TResult>>;
}) => {
  return (
    <div
      className="flex justify-center items-center top-0 left-0 w-full h-[100vh] fixed bg-[rgba(0,0,0,0.2)]"
      onClick={() => setShowModal(null)}
    >
      <div
        className="p-3 max-w-[90%] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
