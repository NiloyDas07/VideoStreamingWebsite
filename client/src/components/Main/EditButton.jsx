import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MdEdit } from "react-icons/md";

import { Input, Modal, Loading } from "../";
import { IoClose } from "react-icons/io5";

const EditButton = ({ handleClick, className, label, form, size }) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const coverImageRef = useRef();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        type="button"
        className={`${className} text-${size}`}
      >
        <span className="sr-only">{label}</span>

        <MdEdit className="h-full w-full" />
      </button>
      <Modal
        className="h-1/2"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        bgColor="bg-secondary-1 dark:bg-secondary-2 dark:opacity-95"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-8">
            <h2 className="text-lg font-bold">{label}</h2>

            <button type="button" onClick={handleCloseModal} >
              <span className="sr-only">Close modal</span>
              <IoClose className="text-2xl" />
            </button>
          </div>

          {form}
        </div>
      </Modal>
    </>
  );
};

export default EditButton;
