import React, { useState, useRef } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PhotoUploader from './photouploader';
import DateDropdown from './datedropdown';
import './decisions-events.css';
import  CardDecision from './nancy-card/carddecision';
import "./nancy-card/stylesnancycard.css";

function Decisions() {
  const [isPressed, setIsPressed] = useState(false);
  const photoUploaderRef = useRef(null);
  const dateDropdownRef = useRef(null);
  const titleRef = useRef(null);
  const decisionIdRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleButtonClick = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const decisionData = new FormData();
      decisionData.append('decision_id', Number(decisionIdRef.current.value)); // Ensure decision_id is a number
      decisionData.append('decision_date', dateDropdownRef.current.getDate()?.toISOString().split('T')[0]); // Format date to YYYY-MM-DD
      decisionData.append('title', titleRef.current.value);
      decisionData.append('description', descriptionRef.current.value);
  
      const photos = photoUploaderRef.current.getImages();
      photos.forEach((photo, index) => {
        decisionData.append(`photos[${index}]`, photo.file);
      });
  
      // const token = '25|tfhhQ6VJXfdAyC43Xpd5VvIO5Ws35tFfjpLHxHqnfebc2381';
      const token = localStorage.getItem('admin_token');
  
      try {
        const response = await axios.post('https://tproject.techpundits.net/api/decision', decisionData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        console.log('Decision posted successfully:', response.data);
        alert('Decision created successfully');
       window.location.reload();
       
      } catch (error) {
        console.error('Error posting decision:', error);
      }
    }
    setIsPressed(true);
  };
  

  const handleCancelClick = () => {
    document.querySelector('.Frame').reset();
    setIsPressed(false);
    photoUploaderRef.current.resetImages();
    dateDropdownRef.current.resetDate();
  };

  return (
    <div className=''>
    <div className="form Auto-layout shadow ">
      <div className="text-center">
        <h1 className="blue_h2">أضافة قرار جديد</h1>
      </div>
      <Form className="Frame" noValidate validated={isPressed} onSubmit={handleButtonClick}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className="bord" column sm="2">
            العنوان:
          </Form.Label>
          <Col>
            <Form.Control
              required
              placeholder="عنوان القرار"
              ref={titleRef}
            />
            <Form.Control.Feedback type="invalid">
              العنوان مطلوب.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className="bord" column sm="2">
            الرقم:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              placeholder="رقم القرار"
              ref={decisionIdRef}
            />
            <Form.Control.Feedback type="invalid">
              الرقم مطلوب.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className="bord" column sm="2">
            التاريخ:
          </Form.Label>
          <Col sm="10">
            <DateDropdown ref={dateDropdownRef} required />
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
            <FloatingLabel controlId="floatingTextarea2" label="نص القرار">
              <Form.Control
                as="textarea"
                required
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                ref={descriptionRef}
              />
              <Form.Control.Feedback type="invalid">
                النص مطلوب.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Form.Group>

        <PhotoUploader ref={photoUploaderRef} />
        <Col>
          <div className="d-flex justify-content-center  mt-4 mb-3">
            <Button className="col-md-3 mx-2 botton1" variant="secondary" type="submit" >نشر القرار</Button>
            <Button className="col-md-3 mx-2 botton2" variant="outline-danger"  onClick={handleCancelClick}>إلغاء</Button>
          </div>
        </Col>
      </Form>
    </div>

<div className="decisions-Group22">
<p className="black_bold_h2 decisions-Title2">القرارات السابقة :</p>
< CardDecision/>
</div>
</div>
    
  );
}

export default Decisions;
