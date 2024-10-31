// by batoul
import React, { useState, useEffect } from "react";
import { Button, Card, Container ,Row,Col,Form,Modal} from "react-bootstrap";

function CurrentServices() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://tproject.techpundits.net/api/service-categories');
        if (!response.ok) {
          throw new Error('فشل جلب البيانات: ' + response.status);
        }
        const data = await response.json();
        const arrayData = data.data.map(category => ({
          id: category.id,
          name: category.name  
        }));
        setCategories(arrayData);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الفئات:', error);
      }
    };
    fetchCategories();
  }, []);
 
  useEffect(() => {
        console.log("Updated selectedCategoryId:", selectedCategoryId); 
    const fetchServices = async () => {
      if (selectedCategoryId === null) return; 
      try {
        const response = await fetch(`https://tproject.techpundits.net/api/services?service_category_id=${selectedCategoryId}`);
        if (!response.ok) {
          throw new Error('فشل جلب البيانات: ' + response.status);
        }
        const data = await response.json();
        const arrayData = data.data.map(service => ({
          id: service.id,
          title: service.title,
          description: service.description,
          service_category_id: service.service_category_id  
        }));
        setServices(arrayData);
        
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الخدمات:', error);
      }
    };

    fetchServices();
  }, [selectedCategoryId]); 
  const handleCategoryClick = (categoryId) => {
       console.log("Before setting:", selectedCategoryId); 
    console.log("Selected Category ID:", categoryId);
    setSelectedCategoryId(categoryId);  
  };
const servicesDelete = async (serviceId) => {
    const token1 = '188|SxGqdmgEo55Gafv2BEQKteBYe8zbBV4ssEePJfda671f82b1';
    const confirmDelete = window.confirm("هل أنت متأكد من الحذف؟");
    if (!confirmDelete) return;
      try {
        const response = await fetch(`https://tproject.techpundits.net/api/services/${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token1}`,
            'Content-Type': 'application/json',
          },
        }
        );

        if (response.status === 200) {

          alert('تم الحذف بنجاح!');
          console.log(response + response.status)
          setServices(prevCategories => prevCategories.filter(service => service.id !== serviceId)); // إعادة تعيين الحقول بعد الحذف، إذا لزم الأمر  
        }
      }
      catch (error) {
        console.error('Error:', error);
      }
  };
  const handleEditService = (service) => {
    setEditService(service); 
    setShowModal(true); 
  };  const handleUpdateService = async () => {
    const token1 = '188|SxGqdmgEo55Gafv2BEQKteBYe8zbBV4ssEePJfda671f82b1';
    try {
      const response = await fetch(`https://tproject.techpundits.net/api/services/${editService.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token1}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editService),
      });
      console.log(response);
      alert('تم تحديث الخدمة بنجاح!');
        setServices(prevServices => 
          prevServices.map(service => 
            service.id === editService.id ? editService : service  
          )
        );
        setShowModal(false); 
    } catch (error) {
      console.error('حدث خطأ أثناء تحديث الخدمة:', error);
    }
  };
  return (
    <div>

      {categories.length > 0 ? (
        categories.map((category) => (
          
                <Button key={category.id} onClick={() => handleCategoryClick(category.id)}
            style={{ 
              margin:"10px",
                        backgroundColor: selectedCategoryId === category.id ? 'blue' : 'gray', 
                        color: 'white' 
                    }}>
            {category.name}
          </Button>
          
        ))
      ) : (
        <p>لا توجد فئات لعرضها.</p>
      )}
      {services.length > 0 ? (
        services.map((service) => (
          <Card className="text-center" key={service.id} style={{margin:"100px",width:"100%"}}>
            <Card.Header as="h5">{service.title}</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text style={{ width:"auto" }}>{service.description}</Card.Text>
            </Card.Body>
            <Card.Footer style={{marginBottom:"20px"}}>
               <Container>
            <Row>
              <Col xs={4} md={6} >
                <Button variant="secondary" onClick={()=>servicesDelete(service.id)} >
                  حذف الخدمة 
                </Button>
              </Col>
              <Col xs={4} md={6}>
                <Button variant="primary"  onClick={() => handleEditService(service)}>
                  تعديل الخدمة  
                </Button>
              </Col>
            </Row>
          </Container>
            </Card.Footer>
          </Card>
        ))
      ) : (
        <p style={{color:"red"}}>  .........loading    </p>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header >
          <Modal.Title style={{textAlign:"left"}}>تعديل الخدمة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formServiceTitle">
              <Form.Label>اسم الخدمة</Form.Label>
              <Form.Control 
                type="text" 
                value={editService.title} 
                onChange={(e) => setEditService({ ...editService, title: e.target.value })} 
              />
            </Form.Group>
            <Form.Group controlId="formServiceDescription">
              <Form.Label>وصف الخدمة</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={editService.description} 
                onChange={(e) => setEditService({ ...editService, description: e.target.value })} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إغلاق  
          </Button>
          <Button variant="primary" onClick={handleUpdateService}>
            تحديث  
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CurrentServices;
