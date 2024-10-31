// by batoul
import React, { useState } from "react";
import { Modal, Form, ModalFooter, Container,Row,Col } from "react-bootstrap";
import "./style1.css";

function FirstBtn() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };   

  const [formData, setFormData] = useState({
     name: '' 
  });
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const token1 = '188|SxGqdmgEo55Gafv2BEQKteBYe8zbBV4ssEePJfda671f82b1';

  const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
 };
  const handlePublish = async (e) => {
  e.preventDefault();
  
  

  try {
    const response = await fetch('https://tproject.techpundits.net/api/service-categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token1}`,
      },
      body: JSON.stringify({ ...formData }), 
    });

    const data = await response.json();
    console.log('Success:', data);
    alert('تم الإرسال بنجاح!');
    setFormData({ id: '', name: '' });
  } catch (error) {
    console.error('Error:', error.message);
    alert(`فشل الإرسال: ${error.message}`);
  }
  };    
  

  return (
    <>
      <button className="services-Btn1" onClick={handleShowModal}>
        <span className="services-Btn1Text" style={{color:"white",fontSize:"15px",}}>
          إضافة فئة جديدة
          
        </span>
      </button>

      <Modal
        
        show={showModal}
        onHide={handleCloseModal}
        ClassName=" col-10 services-custom-modal"
        
      >
        <header className="services-modalHeader">إضافة فئة خدمة جديدة</header>
        <Modal.Body>
          <Form dir="rtl">
            <div className="services-Group5">
             
              <div>
                <label htmlFor="inputTitle" className="services-Group5Title">اسم الفئة:</label>
                <br/>
                <input  
                  type="text"
                  name="name"
                  className=" col-8 services-form-control"
                  id="inputTitle"
                  value={formData.name}
                  onChange={handleChange}   
                  placeholder="يجب ألا يتجاوز العنوان 50 حرف"
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <ModalFooter>
          <Container>
      <Row>
              <Col> <div className=" col-md-6">
              <button onClick={handlePublish} className="services-Frame10">
                <span className="services-Frame10Text">نشر الفئة</span>
              </button>
            </div> </Col>
              <Col> <div className="col-md-6">
              <button className="services-Frame11" onClick={handleCloseModal}>
                <span className="services-Frame11Text">إلغاء</span>
              </button>
            </div> </Col>

            </Row>
          </Container>
          
        </ModalFooter>
        
      </Modal>
    </>
  );
}

export default FirstBtn;
