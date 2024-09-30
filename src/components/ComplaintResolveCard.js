//by nour
import "../CssFolder/complaints.css"
import React, { useState } from "react";
import { Button, Modal, Image, Row, Col } from "react-bootstrap";
import complaintsTypes from "../data/complaintsTypes";

function ComplaintResolveCard({ show, onHide, complaint }) {
  const [activeType, setActiveType] = useState(complaintsTypes[0].name);
  const handlTypeClick = (type) => {
    setActiveType(type);
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <div className="fw-bold">
              <span className="card-title-color">الاسم:</span> {complaint.name}{" "}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color">رقم الهاتف :</span>{" "}
              {complaint.phoneNumber}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color"> تاريخ التقديم :</span>{" "}
              {complaint.date}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color"> نص الشكوى :</span>{" "}
              {complaint.details.text}
            </div>
          </Col>
          <Col>
            <div>الصورة:</div>
            <Image className="mt-2" src={complaint.details.img} fluid rounded />
          </Col>
        </Row>
        <Row>
          <div className="fw-bold">الرجاء اختيار الحالة:</div>
          <Row className="mt-3">
            {complaintsTypes.map((type) => (
              <Col
                className="flex justify-content-center"
                xs={3}
                lg={3}
                key={type.id}
              >
                <button
                  className={
                    activeType === type.name
                      ? "Choose-button main-shadow font-tab"
                      : "disabled-button main-shadow font-tab"
                  }
                  onClick={() => handlTypeClick(type.name)}
                >
                  {type.name}
                </button>
              </Col>
            ))}
          </Row>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Col className="flex justify-content-center">
          <button className="save-button main-shadow">حفظ التعديلات</button>
        </Col>
        <Col className="flex justify-content-center">
          <button className="cancel-button main-shadow" hover>الغاء</button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
}
export default ComplaintResolveCard;
