// by nancy
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useState } from 'react';
import  './index.css';
import './decisions-events.css';
import DateDropdown from './datedropdown';
import PhotoUploader from './photouploader';


function Editevent() {
  const [isPressed, setIsPressed] = useState(false);

 const handleButtonClick = () => {
  console.log("Button clicked");
  setIsPressed(true);
};

  
  return (
    <Container className="form  shadow ">
       <div className="text-center">
  <h1 className="head">تعديل الفعالية </h1>
</div>
    <Form  className='Frame'>
   
      <Form.Group as={Row} className=" mb-3 " controlId="formPlaintextPassword">
        <Form.Label className='bord' column sm="2">
          النوع :
        </Form.Label>
        <div className="col">
  <button className="btn btn-outline-secondary" style={{ marginBottom: '10px', marginLeft: '10px' }}>أعمال</button>
  <button className="btn btn-outline-secondary" style={{ marginBottom: '10px', marginLeft: '10px' }}>فعاليات</button>
  <button className="btn btn-outline-secondary" style={{ marginBottom: '10px' }}>نشاطات</button>
</div>

      </Form.Group >

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label className='bord' column sm="2">
          العنوان:
        </Form.Label>
        <Col sm="10">
          <Form.Control  placeholder="يجب أن لا يتجاوز العنوان 50 حرف " />
        </Col>
      </Form.Group> 
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label className='bord' column sm="2">
          التاريخ:
        </Form.Label>
        <Col sm="10">
          <DateDropdown />
        </Col>
      </Form.Group>
      <Form.Group  as={Row} className="mb-3">
      <Form.Label className='bord' column sm="2">
          النص :
        </Form.Label>
        <Col sm="10">
      <FloatingLabel controlId="floatingTextarea2" label="يجب أن لا يتجاوز النص 200 حرف ">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      </Col>
      </Form.Group>
     

      <PhotoUploader/>
      <Col>
  <div className="d-flex justify-content-center ">
    <Button className='col-md-3 mx-2' variant="secondary" style={{ backgroundColor: '#1A4870', marginBottom: '10px' }}>تعديل الفعالية </Button>
    <Button className='col-md-3 mx-2' variant="outline-danger" style={{ marginBottom: '10px' }}>إلغاء التعديلات</Button>
  </div>
</Col>

      
    </Form>
    </Container>
  );
}

export default Editevent;



