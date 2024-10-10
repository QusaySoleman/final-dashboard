import React, { useState, useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import DateDropdown from './datedropdown';
import PhotoUploader from './photouploader';
import './decisions-events.css';

function Editevent({ service: event, onClose }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    activity_type_id: '',
    activity_date: '',
    photos: []
  });

  const dateDropdownRef = useRef();
  const photoUploaderRef = useRef();

  useEffect(() => {
    if (event) {
      setFormData({
        id: event.id,
        title: event.title,
        description: event.description,
        activity_type_id: event.activity_type_id,
        activity_date: event.activity_date,
        photos: event.photos
      });
      dateDropdownRef.current.setDate(new Date(event.activity_date));
      photoUploaderRef.current.setImages(event.photos);
    }
  }, [event]);

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
      activity_date: date
    });
  };

  const handlePhotosChange = (photos) => {
    setFormData({
      ...formData,
      photos: photos
    });
  };

  const handleActivityTypeChange = (typeId) => {
    setFormData({
      ...formData,
      activity_type_id: typeId
    });
  };

  const handleSubmit = async () => {
    console.log('Form data:', formData);
    try {
      const token = localStorage.getItem('admin_token');
      const formDataToSend = new FormData();
  
      formDataToSend.append('id', formData.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('activity_type_id', formData.activity_type_id);
      formDataToSend.append('activity_date', formData.activity_date);
  
      formData.photos.forEach((photo, index) => {
        console.log(`Appending photo ${index}:`, photo);
        formDataToSend.append(`photos[${index}]`, photo.file);
      });
  
      const response = await axios.put(`https://tproject.techpundits.net/api/activity/${formData.id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response.data.message);
      alert('Event updated successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Network error. Please try again.');
      } else {
        console.error('Error message:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    <Container className="form Auto-layout shadow">
      <div className="text-center">
        <h1 className="head">تعديل الفعالية</h1>
      </div>
      <Form className="Frame">
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className='bord' column sm="2">
            النوع :
          </Form.Label>
          <div className="col">
            <button
              className={`btn btn-outline-secondary ${formData.activity_type_id === '1' ? 'active' : ''}`}
              style={{ marginBottom: '10px', marginLeft: '10px' }}
              onClick={(e) => {
                e.preventDefault();
                handleActivityTypeChange('1');
              }}
            >
              نشاطات
            </button>
            <button
              className={`btn btn-outline-secondary ${formData.activity_type_id === '2' ? 'active' : ''}`}
              style={{ marginBottom: '10px', marginLeft: '10px' }}
              onClick={(e) => {
                e.preventDefault();
                handleActivityTypeChange('2');
              }}
            >
              أعمال
            </button>
            <button
              className={`btn btn-outline-secondary ${formData.activity_type_id === '3' ? 'active' : ''}`}
              style={{ marginBottom: '10px' }}
              onClick={(e) => {
                e.preventDefault();
                handleActivityTypeChange('3');
              }}
            >
              فعاليات
            </button>
          </div>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className='bord' column sm="2">
            العنوان:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="title"
              placeholder="يجب أن لا يتجاوز العنوان 50 حرف"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className='bord' column sm="2">
            التاريخ:
          </Form.Label>
          <Col sm="10">
            <DateDropdown ref={dateDropdownRef} onDateChange={handleDateChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label className='bord' column sm="2">
            النص :
          </Form.Label>
          <Col sm="10">
            <FloatingLabel controlId="floatingTextarea2" label="يجب أن لا يتجاوز النص 200 حرف">
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
          <div className="d-flex justify-content-center mt-4">
            <Button
              className='col-md-3 mx-2 botton1'
              variant="secondary"

              onClick={handleSubmit}
            >
            تعديل الفعالية
            </Button>
            <Button
              className='col-md-3 mx-2 botton2'
              variant="outline-danger"
              onClick={onClose}
            >
            إلغاء التعديلات
            </Button>
          </div>
        </Col>
      </Form>
    </Container>
  );
}

export default Editevent;
