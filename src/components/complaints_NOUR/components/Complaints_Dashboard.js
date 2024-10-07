import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../CssFolder/complaints.css";
import complaintsTypes from "../data/complaintsTypes";
import ComplaintsTable from "./ComplaintsTable";
import axios from "axios";

function Complaints() {
  const [activeType, setActiveType] = useState(complaintsTypes[0].status);
  const [unResolvedCount, setUnResolvedCount] = useState();
  const [inProgressCount, setInProgressCount] = useState();
  const [resolvedCount, setResolvedCount] = useState();
  const [deletedCount, setDeletedCount] = useState();
  const handlTypeClick = (type) => {
    setActiveType(type);
  };
  //get the count of unresolved
  const fetchCountOfUnResolved = async () => {
    try {
      const response = await axios.get(
        "https://tproject.techpundits.net/api/complaint?status=unresolved"
      );
      if ((response.data.status = 200)) {
        setUnResolvedCount(response.data.count);
        console.log("get the count of unResolved array");
      } else {
        console.log("get count failed");
      }
    } catch (error) {
      console.error("Faild to get count of unresolved :", error);
    }
  };
  //get the count of in progress
  const fetchCountOfInProgress = async () => {
    try {
      const response = await axios.get(
        "https://tproject.techpundits.net/api/complaint?status=in progress"
      );
      if ((response.data.status = 200)) {
        setInProgressCount(response.data.count);
        console.log("get the count of in progress array");
      } else {
        console.log("get count failed");
      }
    } catch (error) {
      console.error("Faild to get count of unresolved :", error);
    }
  };
  //get the count of resolved
  const fetchCountOfResolved = async () => {
    try {
      const response = await axios.get(
        "https://tproject.techpundits.net/api/complaint?status=resolved"
      );
      if ((response.data.status = 200)) {
        setResolvedCount(response.data.count);
        console.log("get the count of Resolved array");
      } else {
        console.log("get count failed");
      }
    } catch (error) {
      console.error("Faild to get count of unresolved :", error);
    }
  };
  //get the count of deleted
  const fetchCountOfDeleted = async () => {
    try {
      const token = "30|UWcB5V7yhwOn86YL0x4OnZ9YlCWPRNdDU4NVFzjQ69c2f60f";
      const response = await axios.get(
        "https://tproject.techpundits.net/api/complaints/trashed",
        {
          headers: { Authorization: ` Bearer ${token}` },
        }
      );
      if ((response.data.status = 200)) {
        setDeletedCount(response.data.data.length);
        console.log("get the count of deleted array");
      } else {
        console.log("get count failed");
      }
    } catch (error) {
      console.error("Faild to get count of unresolved :", error);
    }
  };
  useEffect(() => {
    fetchCountOfUnResolved();
    fetchCountOfInProgress();
    fetchCountOfResolved();
    fetchCountOfDeleted();
  }, []);
  return (
    <Container >
      <div className="font-header fw-bold text-align color-main">
        صندوق الشكاوي الواردة:
      </div>
      <Container className="mt-4">
        <Row className="justify-content-center g-2">
          <Col xs={1}>
            <div className="fw-500 fs-6">عرض:</div>
          </Col>
          {complaintsTypes.map((type) => (
            <Col
              className="flex justify-content-center"
              xs={3}
              lg={2}
              key={type.id}
            >
              <button
                className={
                  activeType === type.status
                    ? "active-button main-shadow font-tab"
                    : "disabled-button main-shadow font-tab"
                }
                onClick={() => handlTypeClick(type.status)}
              >
                {type.name}(
                {type.status === "unresolved"
                  ? unResolvedCount
                  : type.status === "in progress"
                  ? inProgressCount
                  : type.status === "resolved"
                  ? resolvedCount
                  : type.status === "سلة المحذوفات"
                  ? deletedCount
                  : 0}
                )
              </button>
            </Col>
          ))}
        </Row>
      </Container>
      <div>
        <ComplaintsTable
          statusOfComplaints={activeType}
          fetchCountOfUnResolved={fetchCountOfUnResolved}
          fetchCountOfInProgress={fetchCountOfInProgress}
          fetchCountOfResolved={fetchCountOfResolved}
          fetchCountOfDeleted={fetchCountOfDeleted}
        />
      </div>
    </Container>
  );
}
export default Complaints;
