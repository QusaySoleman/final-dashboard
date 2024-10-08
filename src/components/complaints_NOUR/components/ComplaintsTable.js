import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import ComplaintResolveCard from "./ComplaintResolveCard";
import ComplaintDeletedCard from "./ComplaintDeletedCard";
import ComplaintPagination from "./ComplaintPagination";
import axios from "axios";
function ComplaintsTable({
  statusOfComplaints,
  fetchCountOfUnResolved,
  fetchCountOfInProgress,
  fetchCountOfResolved,
  fetchCountOfDeleted,
}) {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintsArray, setComplaintsArray] = useState([]);
  const [complaintsDeletedArray, setComplaintsDeletedArray] = useState([]);

  ////pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  let filteredComplaints = [];
  let filteredDeletedComplaints = [];
  let orginalArrayPagination = [];
  ///////////////
  //function to select the complaint i click in it
  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
    //show the modal when i click in show more button
    setModalShow(true);
  };
  //////////////
  //fetch data and put it in complaints array
  const fetchComplaintsArray = async () => {
    try {
      const response = await axios.get(
        "https://tproject.techpundits.net/api/complaint"
      );
      setComplaintsArray(response.data.data);
      console.log("ComplaintsArray loaded");
      // refresh the count of items when the status changes
      fetchCountOfUnResolved();
      fetchCountOfInProgress();
      fetchCountOfResolved();
      fetchCountOfDeleted();
    } catch (error) {
      console.error("Error fetching complaints types:", error);
    }
  };

  useEffect(() => {
    fetchComplaintsArray();
  }, []);
  //////////////

  //fetch data and put it in complaints deleted array
  const fetchComplaintsDeletedArray = async () => {
    try {
      const token = "30|UWcB5V7yhwOn86YL0x4OnZ9YlCWPRNdDU4NVFzjQ69c2f60f";
      const response = await axios.get(
        "https://tproject.techpundits.net/api/complaints/trashed",
        {
          headers: { Authorization: ` Bearer ${token}` },
        }
      );
      setComplaintsDeletedArray(response.data.data);
      console.log("ComplaintsDeletedArray changed");
      //refresh the count of items when the status change
      // fetchCountOfUnResolved();
      // fetchCountOfInProgress();
      // fetchCountOfResolved();
      // fetchCountOfDeleted();
    } catch (error) {
      console.error("Error fetching complaints types:", error);
    }
  };
  useEffect(() => {
    fetchComplaintsDeletedArray();
  }, []);
  /////////////
  //condition to compare between the arrays from complaints array and complaints deleted array
  if (statusOfComplaints != "سلة المحذوفات") {
    filteredComplaints = complaintsArray.filter(
      (complaint) => complaint.status === statusOfComplaints
    );
    orginalArrayPagination = filteredComplaints;
  } else {
    filteredDeletedComplaints = complaintsDeletedArray;
    orginalArrayPagination = filteredDeletedComplaints;
  }
  //////////////

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orginalArrayPagination.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  ///////////
  // Reset the currentPage to 1 when the category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusOfComplaints]);
  /////////////
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
          {currentItems.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.name}</td>
              <td>{complaint.number}</td>
              <td>{complaint.created_at}</td>
              <td>
                <Row>
                  <Col xs={6}>{complaint.description}</Col>
                  <Col xs={6}>
                    <a
                      className="fw-500"
                      variant="primary"
                      onClick={() => handleComplaintClick(complaint)}
                    >
                      عرض المزيد
                    </a>
                    {statusOfComplaints !== "سلة المحذوفات" ? (
                      <ComplaintResolveCard
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        complaint={selectedComplaint}
                        onChange={fetchComplaintsArray}
                        onChangeDelete={fetchComplaintsDeletedArray}
                        fetchCountOfUnResolved={fetchCountOfUnResolved}
                        fetchCountOfInProgress={fetchCountOfInProgress}
                        fetchCountOfResolved={fetchCountOfResolved}
                        fetchCountOfDeleted={fetchCountOfDeleted}
                      />
                    ) : (
                      <ComplaintDeletedCard
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        complaint={selectedComplaint}
                        onChange={fetchComplaintsArray}
                        onChangeDelete={fetchComplaintsDeletedArray}
                        fetchCountOfUnResolved={fetchCountOfUnResolved}
                        fetchCountOfInProgress={fetchCountOfInProgress}
                        fetchCountOfResolved={fetchCountOfResolved}
                        fetchCountOfDeleted={fetchCountOfDeleted}
                      />
                    )}
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {statusOfComplaints !== "سلة المحذوفات" ? (
        <ComplaintPagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredComplaints.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      ) : (
        <ComplaintPagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredDeletedComplaints.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </div>
  );
}
export default ComplaintsTable;
