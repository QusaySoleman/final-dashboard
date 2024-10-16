import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ModuleModifyMember from "./ModuleModifyMember";
import { Row, Col } from "react-bootstrap";
import AboutUsPagination from "./AboutUsPagination.js";
import axios from "axios";

function Members({ membersArray, refreshOnDeleteMember }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const handleSelectedMember = (member) => {
    setSelectedMember(member);
    setModalShow(true);
  };
  ////////////
  ////pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  ///////////////
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsMember = membersArray.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  ///////////
  ////////////
  // delete spicific member by id
  const deleteMember = async (id) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.delete(
        `https://tproject.techpundits.net/api/council-members/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((response.data.status = 200)) {
        console.log(response.data.message);
        refreshOnDeleteMember();
      } else {
        console.log("delete member failes");
      }
    } catch (error) {
      console.error("delete member failed :", error);
    }
  };
  return (
    <Row>
      {currentItemsMember.map((member) => (
        <Col sm={4} className="g-4" key={member.id}>
          <Card
            className="back-card margin-responsive-top p-3 border-none rounded-meduim h-100 w-100"
            key={member.id}
          >
            <Card.Img
              className="rounded-meduim image-shadow"
              src={member.photo}
            />
            <Card.Body className="text-center">
              <Card.Title className="color-main fw-bold">
                {member.name}
              </Card.Title>
              <Card.Text>
                <div className="text-center fw-bold fs-6">
                  {member.job_title}
                </div>
                <div className="fs-14px">{member.description}</div>
              </Card.Text>
            </Card.Body>
            <Row>
              <Col xs={6} className="flex justify-content-center">
                <button
                  className="modify-button-about main-shadow-about"
                  onClick={() => handleSelectedMember(member)}
                >
                  تعديل
                </button>
              </Col>
              <Col xs={6} className="flex justify-content-center">
                <button
                  className="delete-button-about main-shadow-about"
                  onClick={() => deleteMember(member.id)}
                >
                  حذف
                </button>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
      <AboutUsPagination
        itemsPerPage={itemsPerPage}
        totalItems={membersArray.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <ModuleModifyMember
        show={modalShow}
        onHide={() => setModalShow(false)}
        member={selectedMember}
        refreshOnModifyMember={refreshOnDeleteMember}
      />
    </Row>
  );
}

export default Members;
