//by nour
import React from "react";
import { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import "../CssFolder/complaints.css";
import complaintsTypes from "../data/complaintsTypes";
import ComplaintsTable from "../components/ComplaintsTable";
import complaintsArray from "../data/complaintsArray";
import PaginationComp from "./PaginationComp";

function Complaints() {
  const [activeType, setActiveType] = useState(complaintsTypes[0].name);
  const handlTypeClick = (type) => {
    setActiveType(type);
  };
  return (
    <Container>
      <div className="font-header fw-bold text-align color-main mt-3">
        صندوق الشكاوي الواردة:
      </div>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col className= "flex align-items-center" xs={1}>
            <div className="fw-500 fs-6">عرض:</div>
          </Col>
          {complaintsTypes.map((type) => (
            <Col
              className="flex justify-content-center "
              xs={3}
              lg={2}
              key={type.id}
            >
              <button
                className={
                  activeType === type.name
                    ? "active-button main-shadow font-tab py-3 px-2"
                    : "disabled-button main-shadow font-tab py-3 px-2"
                }
                onClick={() => handlTypeClick(type.name)}
              >
                {type.name} ({type.count})
              </button>
            </Col>
          ))}
        </Row>
      </Container>
      <div>
        <ComplaintsTable typeOfComplaints={activeType} TypeArray={complaintsArray} />
      </div>
      <div>
        <PaginationComp />
      </div>
    </Container>
  );
}
export default Complaints;
