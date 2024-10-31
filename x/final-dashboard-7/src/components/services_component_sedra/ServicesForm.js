
import React, { useState, useEffect } from "react";
import { Button, Form,Container,Row,Col } from "react-bootstrap";
// import axios from "axios";


function ServiceForm() {
  const [formData, setFormData] = useState({ service_category_id: 0,
    title: '', description: ''
    
  });
 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title' || name === 'description') {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value  
        }));
    } else {
        const newSelection = selectedCategory === value ? '' : value;
        setSelectedCategory(newSelection);

        if (newSelection) {
            const selectedCategoryObject = categories.find(cat => cat.name === newSelection);
            setFormData(prevFormData => ({
                ...prevFormData,
                service_category_id: selectedCategoryObject.id  
            }));
        }
    }
};
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://tproject.techpundits.net/api/service-categories');

        if (!response.ok) {
          throw new Error('فشل جلب البيانات: ' + response.status);
        }

        const data = await response.json();
        const arrayData1 = data.data;
        const arrayData = arrayData1.map(category => ({
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

const sendData = async (e) => {
  e.preventDefault();
    if (typeof formData.service_category_id !== 'number' || isNaN(formData.service_category_id)) {
        console.error('service_category_id يجب أن يكون رقمًا صحيحًا');
        return;
    }
   
  

  try {
    const token1 = '213|Jjdlml2OUL9SNywcqwhDpOmxxApBpfdZajUUYst05f165014';

    const response1 = await fetch('https://tproject.techpundits.net/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token1}`,
      },
      body: JSON.stringify({
          service_category_id: formData.service_category_id,  
        title: formData.title,
                description: formData.description,
                }), 
    });
        console.log(formData);

//     if (!response1.ok) {
//   throw new Error('Error in response: ' + response1.status);
// }

    const data = await response1.json();
    console.log(data)
    console.log('Selected Category:', selectedCategory);

    console.log(formData);
    console.log('Success:', data);
    alert('تم الإرسال بنجاح!');
  }
  catch (error) {
    console.error('Error:', error.message);
    alert(`فشل الإرسال: ${error.message}`);
  }
  

}

return (
  <>
    <Container  >
      <Row>
        <Col xs={10}>
          <Form Form onSubmit={sendData} style={{
            backgroundColor: "#8ebbf0", borderRadius: "15%", height: "110%", marginBottom: "50px"
          }} >
<div style={{display:"flex",justifyContent:"center"}}>
            <header className="h2 " style={{ fontSize:"20px"}}>إضافة خدمة جديدة</header>
      </div>         {categories.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}> 
          {categories.map((category, index) => (
            <Form.Group controlId={`formBasicCategory${index}`} key={category.id} style={{ margin: "10px" }}>
              <label style={{
                backgroundColor: selectedCategory === category.name ? "#2d587e" : "#e6e1d5",

                height: "50px", 
                width: "75px", 
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",  
              }}>
                <input  
                  style={{ display: "none" }} 
                  type="radio"
                  // name="service_category_id"

                  value={category.name}
                  checked={selectedCategory === category.name}
                  onChange={handleChange} // استخدم handleChange هنا  
                />
                {category.name}
                
              </label>
            </Form.Group>
          ))}
        </div>
      ) : (
        <p>لا توجد فئات لعرضها.</p>
            )}
            <Form.Group controlId="title" className="mt-3 services-formGroup">
          <div className="row mb-3 services-formRow">
            <div className="col-md-1">
              <label className="services-form-label">العنوان:</label>
            </div>
            <div className="col col-5 col-md-6 col-lg-8">
              <Form.Control
                type="text"
                name="title"
                    placeholder="يجب ألا يتجاوز العنوان 50 حرف"
                        onChange={handleChange}  />
            </div>
          </div>
            </Form.Group>
            <Form.Group controlId="description" className="mt-3 services-formGroup">
          <div className="row mb-3 services-formRow">
            <div className="col-md-1">
              <label className="services-form-label">النص:</label>
            </div>
            <div className="col col-5 col-md-6 col-lg-8">
              <Form.Control
              as="textarea"
              type="text"

                name="description"
                onChange={handleChange} 
                placeholder="يجب ألا يتجاوز النص 200 حرف"
                rows={4}/>
            </div>
          </div>
            </Form.Group>
            <Form.Group controlId="image" className="mt-3 services-formGroup">
              <div className="col-md-1">
              <label className="services-form-label">الصور:</label>
            </div>
               <div className="col-md-3 services-upload-header">
                      إضافة صور
             
                
              </div>
              <br />
              <div style={{textAlign:"center"}}>
                <svg
                          width="70"
                          height="62"
                          viewBox="0 0 70 62"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M26.25 19.6875C26.25 21.428 25.5586 23.0972 24.3279 24.3279C23.0972 25.5586 21.428 26.25 19.6875 26.25C17.947 26.25 16.2778 25.5586 15.0471 24.3279C13.8164 23.0972 13.125 21.428 13.125 19.6875C13.125 17.947 13.8164 16.2778 15.0471 15.0471C16.2778 13.8164 17.947 13.125 19.6875 13.125C21.428 13.125 23.0972 13.8164 24.3279 15.0471C25.5586 16.2778 26.25 17.947 26.25 19.6875Z"
                            fill="#DDDDDD"
                          />
                          <path
                            d="M8.75 0C6.42936 0 4.20376 0.921872 2.56282 2.56282C0.921872 4.20376 0 6.42936 0 8.75V52.5C0 54.8206 0.921872 57.0462 2.56282 58.6872C4.20376 60.3281 6.42936 61.25 8.75 61.25H61.25C63.5706 61.25 65.7962 60.3281 67.4372 58.6872C69.0781 57.0462 70 54.8206 70 52.5V8.75C70 6.42936 69.0781 4.20376 67.4372 2.56282C65.7962 0.921872 63.5706 0 61.25 0H8.75ZM61.25 4.375C62.4103 4.375 63.5231 4.83594 64.3436 5.65641C65.1641 6.47688 65.625 7.58968 65.625 8.75V37.1875L49.1006 28.6694C48.6903 28.4639 48.2258 28.3926 47.7728 28.4656C47.3198 28.5386 46.9012 28.7522 46.5762 29.0763L30.345 45.3075L18.7075 37.555C18.2873 37.2753 17.7833 37.1494 17.281 37.1989C16.7786 37.2483 16.3088 37.47 15.9513 37.8262L4.375 48.125V8.75C4.375 7.58968 4.83594 6.47688 5.65641 5.65641C6.47688 4.83594 7.58968 4.375 8.75 4.375H61.25Z"
                            fill="#DDDDDD"
                          />
                  </svg>
                  </div>

              <div className="col col-md-9 col-5  services-upload-group"style={{textAlign:"center"}}>
                <label className="" >     اضغط لإضافة صور أو اسحب الصور وافلت هنا     </label>
                <br />
                <input
                type="file"
                name="image"
                id="file-upload"/>
                
                 
                
              </div>
              

              </Form.Group>
<Container>
      <Row>
                <Col  xs={6}>
                  <Button type="submit">
              اضافة 
                </Button> 
                  
                  </Col>
      
      
                <Col  xs={6}> <Button  type="reset" >
            الغاء 
                </Button> 
                  
                </Col>
      </Row>
    
    </Container>

    </Form>      
        </Col>
      </Row>
   </Container>
  </>
  
    );
    
};
  
export default ServiceForm;



