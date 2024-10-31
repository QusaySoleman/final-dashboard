import React, { useState,useEffect } from "react";
import { Modal,Button,Form ,Container,Row,Col} from "react-bootstrap";
import "./style2.css";

function SecondBtn() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://tproject.techpundits.net/api/service-categories');

        if (!response.ok) {
          throw new Error('فشل جلب البيانات: ' + response.status);
        }

        const data = await response.json();
        const arrayData1 = data.data; 
        const arrayData = arrayData1.map(category  =>  ({
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

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const saveData = async (categoryId, updatedCategory) => {
    const token='206|VmQ0OH7o0EbRrsEsSjbuvkAFlPTZbkkD6sNsyl2Wca3eb655'
   try {
        for (const category of categories) {
            const response = await fetch(`https://tproject.techpundits.net/api/service-categories/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: category.name }), 
            });

            if (!response.ok) {
                throw new Error('فشل حفظ البيانات: ' + response.status);
            }

            const result = await response.json();
            console.log('تم حفظ البيانات بنجاح:', result);
        }
       alert("تم الحفظ بنجاح")
     handleClose();  
    } catch (error) {
        console.error('حدث خطأ أثناء حفظ البيانات:', error);
    }
};
  const categoriesDelete = async (categoryId) => {
    const token1 = '188|SxGqdmgEo55Gafv2BEQKteBYe8zbBV4ssEePJfda671f82b1';
    const confirmDelete = window.confirm("هل أنت متأكد من الحذف؟");
    if (!confirmDelete) return;
      try {
        const response = await fetch(`https://tproject.techpundits.net/api/service-categories/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token1}`,
            'Content-Type': 'application/json',
          },
        }
        );

        if (response.status === 200) {
          console.log('Delete successful:', response.data);
           alert('تم الحذف بنجاح!');
          setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId)); // إعادة تعيين الحقول بعد الحذف، إذا لزم الأمر  
        }
        handleClose();
      }
      catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#1a4870",color:"white",fontSize:"15px",  marginTop:"10px"}}>
        تعديل فئات  
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title className="modalTittle">تعديل فئات</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Form.Group controlId={`formBasicCategory${index}`} key={category.id}>
                  <Container className="m-3">
                    <Row>
                      <Col xs={8}>
                        <Form.Label>فئة {index + 1}</Form.Label>
                      </Col>
                      <Col>
                        <Button className="mb-2" onClick={() => categoriesDelete(category.id)}>
                          حذف الفئة  
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Control 
                          type="text"
                          value={category.name} 
                          onChange={(e) => {
                            const newCategories = [...categories];
                            newCategories[index].name = e.target.value;
                            setCategories(newCategories);
                          }}  
                        />
                      </Col>
                    </Row>
                  </Container>
                </Form.Group>
              ))
            ) : (
              <p>لا توجد فئات لعرضها.</p>
            )}
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Container>
            <Row>
              <Col xs={8}>
                <Button variant="secondary" onClick={handleClose}>
                  إلغاء  
                </Button>
              </Col>
              <Col>
                <Button variant="primary" onClick={() => saveData()}>
                  حفظ التعديلات  
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SecondBtn;