import React, { useState, useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './decisions-events.css';
import DateDropdown from './datedropdown';
import PhotoUploader from './photouploader';
import axios from 'axios';

function Editdecision({ decision, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    decision_id: '',
    decision_date: '',
    description: '',
    photos: []
  });

  const dateDropdownRef = useRef();
  const photoUploaderRef = useRef();

  useEffect(() => {
    if (decision) {
      setFormData({
        id: decision.id,
        title: decision.title,
        decision_id: decision.decision_id,
        decision_date: decision.decision_date,
        description: decision.description,
        photos: decision.photos || []
      });
      dateDropdownRef.current.setDate(new Date(decision. decision_date));
      photoUploaderRef.current.setImages(decision.photos || []);
    }
  }, [decision]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      decision_date: date
    });
  };

  const handlePhotosChange = (photos) => {
    setFormData({
      ...formData,
      photos: photos
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.decision_id || !formData.decision_date || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // const token = '25|tfhhQ6VJXfdAyC43Xpd5VvIO5Ws35tFfjpLHxHqnfebc2381'; 
      const token = localStorage.getItem('admin_token');
      const response = await axios.put(`https://tproject.techpundits.net/api/decision/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.message);
      alert('Decision updated successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('There was an error updating the decision!', error);
      alert('Failed to update the decision. Please try again.');
    }
  };

  return (
    <Container className="form Auto-layout shadow">
      <div className="text-center">
        <h1 className="head">تعديل القرار</h1>
      </div>
      <Form className="Frame">
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className='bord' column sm="2">
            العنوان:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="title"
              placeholder="عنوان القرار"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className='bord' column sm="2">
            الرقم:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="decision_id"
              placeholder="رقم القرار"
              value={formData.decision_id}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className="bord" column sm="2">
            التاريخ:
          </Form.Label>
          <Col sm="10">
          <DateDropdown ref={dateDropdownRef} onDateChange={handleDateChange} />

          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label className='bord' column sm="2">
            النص:
          </Form.Label>
          <Col sm="10">
            <FloatingLabel controlId="floatingTextarea2" label="نص القرار">
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                value={formData.description}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Col>
        </Form.Group>

        <PhotoUploader ref={photoUploaderRef} onPhotosChange={handlePhotosChange} />
        <Col>
          <div className="d-flex justify-content-center  mt-4 ">
            <Button
              className='col-md-3 mx-2 botton1'
              variant="secondary"
             
              onClick={handleSubmit}
            >
              تعديل القرار
            </Button>
            <Button
              className='col-md-3 mx-2 botton2'
              variant="outline-danger"
             
              onClick={onClose}
            >
         إلغاء 
            </Button>
          </div>
        </Col>
      </Form>
    </Container>
  );
}

export default Editdecision;
