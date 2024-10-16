import React from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../CssFolder/complaints.css";
function ComplaintDeletedCard({
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
  //////////
  if (!complaint) {
    return null; // or handle the case when complaint is null
  }
  // function to return the complaint from deleted array
  const handleRestoreComplaint = async (id) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.post(
        `https://tproject.techpundits.net/api/complaints/${id}/restore`,
        complaint,
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
        console.log("Complaint restored successfully!");
      } else {
        console.error("Error: Complaint restore failed.");
      }
    } catch (error) {
      console.error("Error restore data :", error);
    }
  };
  /////////
  //function to delete complaints finally from database
  const handleDeleteFinallyComplaint = async (id) => {
    try {
      const isConfirmed = window.confirm(
        "هل أنت متأكد من الحذف؟"
      );
      const token = localStorage.getItem("admin_token");
      if (isConfirmed) {
        const response = await axios.delete(
          `https://tproject.techpundits.net/api/complaints/${id}/force`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if ((response.data.status = 200)) {
          onChangeDelete();
          //refresh the count of items when the status change
          fetchCountOfDeleted();
          console.log("Complaints delete finally successfully!");
        } else {
          console.error("Error: Complaint delete finally failed.");
        }
      }
    } catch (error) {
      console.error("Error delete data :", error);
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
              <span className="card-title-color">الاسم:</span> {complaint.name}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color">رقم الهاتف :</span>
              {complaint.number}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color"> تاريخ التقديم :</span>
              {complaint.created_at}
            </div>
            <div className="mt-2 fw-bold">
              <span className="card-title-color"> نص الشكوى :</span>
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
      </Modal.Body>
      <Modal.Footer>
        <Col className="flex justify-content-center">
          <button
            className="save-button main-shadow"
            onClick={() => {
              handleRestoreComplaint(complaint.id);
              onHide();
            }}
          >
            استرجاع
          </button>
        </Col>
        <Col className="flex justify-content-center">
          <button
            className="delete-button main-shadow"
            onClick={() => {
              handleDeleteFinallyComplaint(complaint.id);
              onHide();
            }}
          >
            حذف نهائي
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
export default ComplaintDeletedCard;
