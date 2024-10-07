//by nancy
import Button from "react-bootstrap/Button";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";

import "./index.css";
import "./decisions-events.css";
import Editdecision from "./editdecision";
const Editbotton2 = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="d-flex justify-content-center ">
      <Button
        variant="secondary"
        style={{ backgroundColor: "#1A4870", marginBottom: "10px" }}
        onClick={handleShow}
      >
        تعديل
      </Button>
      <Modal className="custom-modal" show={show} onHide={handleClose}>
        <Modal.Body>
          <Editdecision />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
      <Button variant="outline-danger" style={{ marginBottom: "10px" }}>
        حذف
      </Button>
    </div>
  );
};

export default Editbotton2;
