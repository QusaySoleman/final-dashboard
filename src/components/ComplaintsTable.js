//by nour
import "../CssFolder/complaints.css"
import React, { useState } from "react";
import { Row, Col, Table, Image } from "react-bootstrap";
import ComplaintResolveCard from "./ComplaintResolveCard";
function ComplaintsTable({ typeOfComplaints, TypeArray }) {
  const filteredComplaints = TypeArray.filter(
    (complaint) => complaint.typeOfComplaints === typeOfComplaints
  );
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="mt-4 fw-500">
      <Table striped bordered hover>
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "40%" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="text-center">الاسم</th>
            <th className="text-center">رقم الهاتف</th>
            <th className="text-center">تاريخ التقديم</th>
            <th className="text-center">التفاصيل</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((complaint) => (
            <tr key={complaint.id}>

              <td>{complaint.name}</td>
              <td>{complaint.phoneNumber}</td>
              <td>{complaint.date}</td>
              <td>
                <Row>
                  <Col xs={6}>{complaint.details.text}</Col>
                  <Col xs={6}>
                    <a
                      className="fw-500"
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      عرض المزيد
                    </a>
                    <ComplaintResolveCard
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      complaint={complaint}
                    />
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default ComplaintsTable;
