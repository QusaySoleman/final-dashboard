// by sedra
import React, { useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import "./style2.css";

function SecondBtn() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSave = () => {};

  return (
    <>
      <button className="services-headerBtnTwo" onClick={handleShowModal}>
        <span className="services-headerBtnTwoText">تعديل الفئات الحالية</span>
      </button>

      <Modal
        size="md"
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="services-custom-modal2"
        centered
      >
        <header className="services-modalHeader2">تعديل الفئات الحالية</header>

        <div className="services-modalBody">
          <form className="services-modalForm">
            <div className="services-form-group row align-items-center mb-3 category-row">
              <div className="col-md-2 ">
                <button type="button" className="services-deleteBtn">
                  حذف
                </button>
              </div>
              <div className="col-md-10 services-inputCol">
                <input
                  type="text"
                  className="services-form-control2"
                  defaultValue="بيئية"
                />
              </div>
            </div>

            <div className="services-form-group row align-items-center mb-3 category-row">
              <div className="col-md-2 ">
                <button type="button" className="services-deleteBtn">
                  حذف
                </button>
              </div>
              <div className="col-md-10 services-inputCol">
                <input
                  type="text"
                  className="services-form-control2"
                  defaultValue="إدارية"
                />
              </div>
            </div>

            <div className="services-form-group row align-items-center mb-3 category-row">
              <div className="col-md-2 ">
                <button type="button" className="services-deleteBtn">
                  حذف
                </button>
              </div>
              <div className="col-md-10 services-inputCol">
                <input
                  type="text"
                  className="services-form-control2"
                  defaultValue="صحية"
                />
              </div>
            </div>

            <div className="services-lastForm-group row align-items-center mb-3 category-row">
              <div className="col-md-2 ">
                <button type="button" className="services-deleteBtn">
                  حذف
                </button>
              </div>
              <div className="col-md-10 services-inputCol">
                <input
                  type="text"
                  className="services-form-control2"
                  defaultValue="فنية"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="services-SecGroup30">
          <div className="row ">
            <div className="col-md-6">
              <button onClick={handleSave} className="services-SecFrame10">
                <span className="services-SecFrame10Text">حفظ التعديلات</span>
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="services-SecFrame11"
                onClick={handleCloseModal}
              >
                <span className="services-SecFrame11Text">إلغاء</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SecondBtn;
