import React, { useState, useRef } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DateDropdown from './datedropdown';
import PhotoUploader from './photouploader';
import './decisions-events.css';
import moment from 'moment';
import EventCard from './nancy-card/eventcard';

function Events() {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dateDropdownRef = useRef(null);
  const photoUploaderRef = useRef(null);

 

const handleButtonClick = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.stopPropagation();
  } else {
    const activityDate = moment(dateDropdownRef.current.getDate()).format('YYYY-MM-DD');
    const photos = photoUploaderRef.current.getImages();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('activity_type_name', selectedActivity);
    formData.append('activity_date', activityDate);
    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo.file);
    });

    // const token = '25|tfhhQ6VJXfdAyC43Xpd5VvIO5Ws35tFfjpLHxHqnfebc2381';
    const token = localStorage.getItem('admin_token');
    try {
      console.log('Sending data:', {
        title,
        description,
        selectedActivity,
        activityDate,
        photos,
      });
      const response = await axios.post('https://tproject.techpundits.net/api/activity', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      });
      console.log('Response:', response.data);
      alert('Activity created successfully');
      window.location.reload();
    } catch (error) {
      console.error('There was an error creating the activity!', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  }
  setIsPressed(true);
};

  

  const handleCancelClick = () => {
    document.querySelector('.Frame').reset();
    setIsPressed(false);
    setSelectedActivity('');
    setTitle('');
    setDescription('');
    dateDropdownRef.current.resetDate();
    photoUploaderRef.current.resetImages();
  };

  const handleActivityTypeClick = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <div>
    <div className="form Auto-layout shadow">
      <div className="text-center">
        <h1 className="blue_h2">إضافة فعالية جديدة</h1>
      </div>
      <Form className="Frame" noValidate validated={isPressed} onSubmit={handleButtonClick}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className="bord" column sm="2">
            النوع:
          </Form.Label>
          <div className="col">
            <button
              className={`btn btn-outline-secondary ${selectedActivity === 'businesses' ? 'active' : ''}`}
              style={{ marginBottom: '10px', marginLeft: '10px' }}
              onClick={() => handleActivityTypeClick('businesses')}
              type="button"
            >
              أعمال
            </button>
            <button
              className={`btn btn-outline-secondary ${selectedActivity === 'events' ? 'active' : ''}`}
              style={{ marginBottom: '10px', marginLeft: '10px' }}
              onClick={() => handleActivityTypeClick('events')}
              type="button"
            >
              فعاليات
            </button>
            <button
              className={`btn btn-outline-secondary ${selectedActivity === 'activities' ? 'active' : ''}`}
              style={{ marginBottom: '10px' }}
              onClick={() => handleActivityTypeClick('activities')}
              type="button"
            >
              نشاطات
            </button>
          </div>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label className="bord" column sm="2">
            العنوان:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              maxLength="50"
              placeholder="يجب أن لا يتجاوز العنوان 50 حرف"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              العنوان مطلوب ويجب أن لا يتجاوز 50 حرف.
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
            <FloatingLabel controlId="floatingTextarea2" label="يجب أن لا يتجاوز النص 200 حرف">
              <Form.Control
                as="textarea"
                required
                maxLength="200"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                النص مطلوب ويجب أن لا يتجاوز 200 حرف.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Form.Group>

        <PhotoUploader ref={photoUploaderRef} />
        <Col>
          <div className="d-flex justify-content-center  mt-4">
            <Button className="col-md-3 mx-2 botton1" variant="secondary" type="submit" >نشر الفعالية</Button>
            <Button className="col-md-3 mx-2 botton2" variant="outline-danger" onClick={handleCancelClick}>إلغاء</Button>
          </div>
        </Col>
      </Form>
    </div>
    <div className="decisions-Group22">
    <p className="black_bold_h2">الفعاليات السابقة :</p>
    <EventCard />
    </div>
    </div>
  );
}

export default Events;
