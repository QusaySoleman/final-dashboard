// by nancy
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import './index.css';
import './decisions-events.css';

const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const [showLabel, setShowLabel] = useState(true);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 2) {
            alert('You can only upload up to 2 images.');
            return;
        }
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
        setShowLabel(false);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        if (images.length - 1 === 0) {
            setShowLabel(true);
        }
    };

    return (
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label className='bord' column sm="2">
                الصور:
            </Form.Label>
            <Col sm="10">
                <div className="upload-box" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ position: 'absolute', top: 2, right: 2, textDecoration: 'underline', padding: '10px 10px 0 0', gap: '10px', }}>
                        إضافة صور
                    </div>
                    {showLabel && (
                        <label htmlFor="file-upload" className="custom-file-upload" style={{ fontSize: '1.5em', display: 'inline-block', textAlign: 'center' }}>
                            <i className="bi bi-image gallery" style={{ fontSize: '2em' }}></i>
                            <div className="gallery-ink">اضغط لإضافة صور أو اسحب الصور وافلت هنا</div>
                            <div className="gallery-ink">يجب ألا يتجاوز حجم الصورة 2 ميغابايت وعدد الصور 1، الأبعاد المفضلة 800*450</div>
                            <input id="file-upload" type="file" multiple onChange={handleImageChange} />
                        </label>
                    )}
<div style={{ display: 'flex',  flexDirection: 'column' }}>
  {images.map((image, index) => (
    <div key={index} className="card img-fluid rounded-start image-card" style={{ maxWidth: '300px', margin: '10px' }}>
      <div className="row g-0 ">
        <div className="col-4" >
          <div className="card-body">
            <h5 className="card-title">{image.name}</h5>
            <button type="button" className="btn-close" aria-label="Close" style={{ position: 'absolute', top: '10px', right: '10px' }} 
            onClick={() => handleRemoveImage(index)}></button>
          </div>
        </div>
        <div className="col-8">
          <img src={image.url} alt={image.name} className="img-fluid rounded-start image-card img" />
        </div>
      </div>
    </div>
  ))}
</div>

                </div>
            </Col>
        </Form.Group>
    );
};

export default ImageUpload;
