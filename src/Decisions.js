//by nancy
import editbottondecision from "./editbotton(decision)";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React, { useState } from "react";
import "./index.css";
import "./decisions-events.css";
import PhotoUploader from "./photouploader";
import NothingHere from "./components/NothingHere.js";
function Decisions() {
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonClick = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setIsPressed(true);
  };

  return (
    <div>
      <Container className="form Auto-layout shadow">
        <div className="text-center">
          <h1 className="head">أضافة قرار جديد</h1>
        </div>
        <Form
          className="Frame"
          noValidate
          validated={isPressed}
          onSubmit={handleButtonClick}
        >
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label className="bord" column sm="2">
              العنوان:
            </Form.Label>
            <Col>
              <Form.Control required placeholder="عنوان القرار" />
              <Form.Control.Feedback type="invalid">
                العنوان مطلوب.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label className="bord" column sm="2">
              الرقم:
            </Form.Label>
            <Col sm="10">
              <Form.Control required placeholder="رقم القرار" />
              <Form.Control.Feedback type="invalid">
                الرقم مطلوب.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label className="bord" column sm="2">
              النص:
            </Form.Label>
            <Col sm="10">
              <FloatingLabel controlId="floatingTextarea2" label="نص القرار">
                <Form.Control
                  as="textarea"
                  required
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
                <Form.Control.Feedback type="invalid">
                  النص مطلوب.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Form.Group>

          <PhotoUploader />
          <Col>
            <div className="d-flex justify-content-center mb-3">
              <Button
                className="col-md-3 mx-2"
                variant="secondary"
                type="submit"
                style={{ backgroundColor: "#1A4870", marginBottom: "10px" }}
              >
                نشر الخبر
              </Button>
              <Button
                className="col-md-3 mx-2"
                variant="outline-danger"
                style={{ marginBottom: "10px" }}
              >
                إلغاء
              </Button>
            </div>
          </Col>
        </Form>

        <br></br>
        <br></br>
      </Container>

      <editbottondecision />
      <br></br>
      <br></br>

      <div>
   
        <NothingHere />
      </div>
    </div>
  );
}

export default Decisions;
