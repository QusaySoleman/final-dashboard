// by sedra
import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

function ServiceForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "صحية",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage({
        preview: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " ميغابايت",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const buttonType = e.nativeEvent.submitter.name;

    if (buttonType === "publish") {
      const errors = {
        title: formData.title.trim() === "",
        description: formData.description.trim() === "",
      };

      setFormErrors(errors);

      if (!errors.title && !errors.description) {
        console.log("Form Data: ", formData);
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState({
    preview: "",
    name: "",
    size: "",
  });

  const handleRemoveImage = () => {
    setSelectedImage({ preview: "", name: "", size: "" });
  };

  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
  });

  return (
    <Form onSubmit={handleSubmit} className="servicesForm">
      <header className="services-formTitle">إضافة خدمة جديدة</header>
      <br />
      <div className="services-formBody">
        {/*النوع*/}
        <Form.Group className="services-type">
          <div className="row mb-3">
            <div className="col-md-1">
              <label className="services-form-label">النوع:</label>
            </div>
            <div class="col-md-11">
              <button
                className={
                  formData.type === "صحية"
                    ? "services-custom-active-btn1"
                    : "services-custom-inactive-btn1"
                }
                onClick={() => setFormData({ ...formData, type: "صحية" })}
              >
                صحية
              </button>

              <button
                className={
                  formData.type === "إدارية"
                    ? "services-custom-active-btn1"
                    : "services-custom-inactive-btn1"
                }
                onClick={() => setFormData({ ...formData, type: "إدارية" })}
              >
                إدارية
              </button>

              <button
                className={
                  formData.type === "بيئية"
                    ? "services-custom-active-btn1"
                    : "services-custom-inactive-btn1"
                }
                onClick={() => setFormData({ ...formData, type: "بيئية" })}
              >
                بيئية
              </button>

              <button
                className={
                  formData.type === "فنية"
                    ? "services-custom-active-btn1"
                    : "services-custom-inactive-btn1"
                }
                onClick={() => setFormData({ ...formData, type: "فنية" })}
              >
                فنية
              </button>
            </div>
          </div>
        </Form.Group>

        {/* العنوان */}
        <Form.Group controlId="title" className="mt-3 services-formGroup">
          <div className="row mb-3 services-formRow">
            <div className="col-md-1">
              <label className="services-form-label">العنوان:</label>
            </div>
            <div class="col-md-11">
              <Form.Control
                type="text"
                name="title"
                placeholder="يجب ألا يتجاوز العنوان 50 حرف"
                value={formErrors.title ? "*الرجاء ملئ الخانة" : formData.title}
                onChange={handleInputChange}
                style={{
                  border: formErrors.title ? "1px solid #f71313" : "",
                  color: formErrors.title ? "#f71313" : "",
                }}
                className={formErrors.title ? "error-placeholder" : ""}
              />
            </div>
          </div>
        </Form.Group>

        {/* النص */}
        <Form.Group controlId="description" className="mt-3 services-formGroup">
          <div className="row mb-3 services-formRow">
            <div className="col-md-1">
              <label className="services-form-label">النص:</label>
            </div>
            <div class="col-md-11">
              <FormControl
                as="textarea"
                name="description"
                placeholder="يجب ألا يتجاوز النص 200 حرف"
                rows={4}
                value={
                  formErrors.description
                    ? "*الرجاء إضافة مضمون الخبر بما لايتجاوز 200 حرف"
                    : formData.description
                }
                onChange={handleInputChange}
                style={{
                  border: formErrors.description ? "1px solid #f71313" : "",
                  color: formErrors.description ? "#f71313" : "",
                }}
                className="services-formControl2"
              />
            </div>
          </div>
        </Form.Group>

        {/* الصور*/}
        <Form.Group controlId="image" className="mt-3 services-formGroup">
          <div className="row mb-3 services-formRow">
            <div className="col-md-1">
              <label className="services-form-label">الصور:</label>
            </div>
            <div className="col-md-11 services-formControl3">
              {selectedImage.preview ? (
                <div className="services-upload-container">
                  <div className="services-upload-header2">إضافة صور</div>
                  <div className="image-preview-container">
                    <img
                      src={selectedImage.preview}
                      alt="Preview"
                      className="image-preview"
                    />

                    <button
                      onClick={handleRemoveImage}
                      className="services-remove-image-btn"
                    >
                      &#10006;
                    </button>
                    <div className="services-image-details">
                      <div className="services-image-name">
                        {selectedImage.name}
                      </div>
                      <div className="services-image-size">
                        {selectedImage.size}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="file-upload"
                  className="services-upload-container"
                >
                  <div className="row">
                    <div className="col-md-3 services-upload-header">
                      إضافة صور
                    </div>
                    <div className="col-md-9 services-upload-group">
                      <div className="services-upload-icon">
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
                      <div className="services-upload-description">
                        اضغط لإضافة صور أو اسحب الصور وافلت هنا
                      </div>
                      <div className="services-upload-description2">
                        يجب ألا يتجاوز حجم الصورة 2 ميغابايت وعدد الصور 2،
                        الأبعاد المفضلة 800*450
                      </div>
                    </div>
                  </div>
                </label>
              )}
              <input
                type="file"
                name="image"
                id="file-upload"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </Form.Group>
        <div className="services-formFooterBtns mt-4">
          <button name="publish" type="submet" className="services-formBtn1">
            نشر الخدمة
          </button>
          <button type="button" className="services-formBtn2">
            إلغاء
          </button>
        </div>
      </div>
    </Form>
  );
}

export default ServiceForm;
