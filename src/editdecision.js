// by nancy
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import React, { useState } from 'react';
import  './index.css';
import './decisions-events.css';

import PhotoUploader from './photouploader';




function Editdecision() {
 

 

  
  return (
    <Container className="form  shadow ">
        <div className="text-center">
  <h1 className="head">تعديل القرار </h1>
</div>
    <Form className='Frame' >
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label className='bord' column sm="2">
          العنوان:
        </Form.Label>
        <Col >
          <Form.Control   placeholder="عنوان القرار " />
        </Col>
      </Form.Group> 

      <Form.Group as={Row} className=" mb-3" controlId="formPlaintextPassword">
        <Form.Label className='bord' column sm="2">
            الرقم :

        </Form.Label>
        <Col sm="10">
          <Form.Control   placeholder="رقم القرار " />
        </Col>
      </Form.Group>
      <Form.Group  as={Row} className="mb-3">
      <Form.Label className='bord' column sm="2">
          النص :
        </Form.Label>
        <Col sm="10">
      <FloatingLabel  controlId="floatingTextarea2" label="نص القرار ">
        <Form.Control
        className="upload-box"
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      </Col>
      </Form.Group>
     

      <PhotoUploader/>
      <Col>
  <div className="d-flex justify-content-center mb-3">
    <Button className='col-md-3 mx-2' variant="secondary" style={{ backgroundColor: '#1A4870', marginBottom: '10px' }}>تعديل القرار </Button>
    <Button className='col-md-3 mx-2' variant="outline-danger" style={{ marginBottom: '10px' }}>إلغاء التعديلات</Button>
  </div>
</Col>






      
    </Form>
    </Container>
  );
}

export default Editdecision;



