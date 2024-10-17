import React, { useState } from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";
import complaintsOptions from "../data/complaintsOptions";
import axios from "axios";
import "../CssFolder/complaints.css";
function ComplaintResolveCard({
  show,
  onHide,
  complaint,
  onChange,
  onChangeDelete,
  fetchCountOfUnResolved,
  fetchCountOfInProgress,
  fetchCountOfResolved,
  fetchCountOfDeleted,
}) {
  const [choosenType, setChoosenType] = useState(complaintsOptions[0].status);
  ///////////
  const handlTypeClick = (type) => {
    setChoosenType(type);
  };
  //////////

  if (!complaint) {
    return null; // or handle the case when complaint is null
  }
  //save data and send it
  const handleSaveChanges = async (id) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.put(
        `https://tproject.techpundits.net/api/complaint/${id}`,
        { status: choosenType },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((response.data.status = 200)) {
        // Update the UI or show a success message
        complaint.status = choosenType;
        onChange();
        //refresh the count of items when the status change
        fetchCountOfUnResolved();
        fetchCountOfInProgress();
        fetchCountOfResolved();
        fetchCountOfDeleted();
        console.log("Complaint changed successfully!");
      } else {
        // Handle any errors or show an error message
        console.error("Error: Complaint restoration failed.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  //delete the complaint
  const handleDeleteComplaint = async (id) => {
    try {
      const isConfirmed = window.confirm("هل أنت متأكد من الحذف؟");
      const token = localStorage.getItem("admin_token");
      if (isConfirmed) {
        const response = await axios.delete(
          `https://tproject.techpundits.net/api/complaint/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if ((response.data.status = 200)) {
          onChange();
          onChangeDelete();
          //refresh the count of items when the status change
          fetchCountOfUnResolved();
          fetchCountOfInProgress();
          fetchCountOfResolved();
          fetchCountOfDeleted();
          console.log("Complaint delete successfully!");
        } else {
          // Handle any errors or show an error message
          console.error("Error: Complaint delete failed.");
        }
      }
    } catch (error) {
      console.error("Error delete data:", error);
    }
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
              {complaint.number}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color"> تاريخ التقديم :</span>{" "}
              {complaint.created_at}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color"> نص الشكوى :</span>{" "}
              {complaint.description}
            </div>
          </Col>
          <Col>
            <div>الصورة:</div>
            <Image
              className="mt-2"
              src={complaint.photos.photo_url}
              fluid
              rounded
            />
          </Col>
        </Row>
        <Row className="mt-3 flex justify-content-center">
          <div className="fw-bold">الرجاء اختيار الحالة:</div>
          <Row className="mt-3">
            {complaintsOptions.map((type) => (
              <Col className="flex justify-content-center" key={type.id}>
                <button
                  className={
                    choosenType === type.status
                      ? "Choose-button main-shadow font-tab"
                      : "disabled-button main-shadow font-tab"
                  }
                  onClick={() => handlTypeClick(type.status)}
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
          <button
            className="save-button main-shadow"
            onClick={() => {
              handleSaveChanges(complaint.id);
              onHide();
            }}
          >
            حفظ التعديلات
          </button>
        </Col>
        <Col className="flex justify-content-center">
          <button
            className="delete-button main-shadow"
            onClick={() => {
              handleDeleteComplaint(complaint.id);
              onHide();
            }}
          >
            حذف
          </button>
        </Col>
        <Col className="flex justify-content-center">
          <button className="cancel-button main-shadow" onClick={onHide}>
            الغاء
          </button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
}
export default ComplaintResolveCard;
