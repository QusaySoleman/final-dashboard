// by nancy
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React, { useState } from "react";
import "./index.css";
import "./decisions-events.css";
import DateDropdown from "./datedropdown";
import PhotoUploader from "./photouploader";
import NothingHere from "./components/NothingHere.js";

function Events() {
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
          <h1 className="head">إضافة فعالية جديدة</h1>
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
              النوع:
            </Form.Label>
            <div className="col">
              <button
                className="btn btn-outline-secondary"
                style={{ marginBottom: "10px", marginLeft: "10px" }}
              >
                أعمال
              </button>
              <button
                className="btn btn-outline-secondary"
                style={{ marginBottom: "10px", marginLeft: "10px" }}
              >
                فعاليات
              </button>
              <button
                className="btn btn-outline-secondary"
                style={{ marginBottom: "10px" }}
              >
                نشاطات
              </button>
            </div>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label className="bord" column sm="2">
              العنوان:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                maxLength="50"
                placeholder="يجب أن لا يتجاوز العنوان 50 حرف"
              />
              <Form.Control.Feedback type="invalid">
                العنوان مطلوب ويجب أن لا يتجاوز 50 حرف.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label className="bord" column sm="2">
              التاريخ:
            </Form.Label>
            <Col sm="10">
              <DateDropdown required />
              <Form.Control.Feedback type="invalid">
                التاريخ مطلوب.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label className="bord" column sm="2">
              النص:
            </Form.Label>
            <Col sm="10">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="يجب أن لا يتجاوز النص 200 حرف"
              >
                <Form.Control
                  as="textarea"
                  required
                  maxLength="200"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
                <Form.Control.Feedback type="invalid">
                  النص مطلوب ويجب أن لا يتجاوز 200 حرف.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Form.Group>

          <PhotoUploader />
          <Col>
            <div className="d-flex justify-content-center">
              <Button
                className="col-md-3 mx-2"
                variant="secondary"
                type="submit"
                style={{ backgroundColor: "#1A4870", marginBottom: "10px" }}
              >
                نشر الفعالية
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
      </Container>
      <NothingHere />

    </div>
  );
}

export default Events;
