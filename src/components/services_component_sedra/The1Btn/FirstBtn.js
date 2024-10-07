// by sedra
import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import "./style1.css";

function FirstBtn() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handlePublish = () => {};

  return (
    <>
      <button className="services-Btn1" onClick={handleShowModal}>
        <span className="services-Btn1Text">
          إضافة فئة جديدة
          <svg
            className="services-Btn1Photo"
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 10.5H20.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M11 1.5L11 19.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </button>

      <Modal
        size="xl"
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="services-custom-modal"
        centered
      >
        <header className="services-modalHeader">إضافة فئة خدمة جديدة</header>
        <ModalBody>
          <div className="services-Group5">
            <div className="row mb-3">
              <div className="col-md-1">
                <label for="inputTitle" className="services-Group5Title">
                  اسم الفئة:
                </label>
              </div>
              <div className="col-md-11">
                <input
                  type="text"
                  className="services-form-control"
                  id="inputTitle"
                  placeholder="يجب ألا يتجاوز العنوان 50 حرف"
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <div className="services-Group30">
          <div className="row">
            <div className="col-md-6">
              <button onClick={handlePublish} className="services-Frame10">
                <span className="services-Frame10Text">نشر الفئة</span>
              </button>
            </div>
            <div className="col-md-6">
              <button className="services-Frame11" onClick={handleCloseModal}>
                <span className="services-Frame11Text">إلغاء</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default FirstBtn;
