import React from "react";
import { Modal, Row, Col, Image } from "react-bootstrap";
import "./css/aboutUsCss.css";
import axios from "axios";
import { useState } from "react";
function ModuleModifyMember({ show, onHide, member, refreshOnModifyMember }) {
  const [memberName, setMemberName] = useState("");
  const [memberPosition, setMemberPosition] = useState("");
  const [memberDetails, setMemberDetails] = useState("");
  const [memberImage, setMemberImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(false);
  const [showPrevMemberImage, setShowPrevMemberImage] = useState(true);

  if (!member) {
    return null;
  }
  const ImageChoosen = (e) => {
    setShowPrevMemberImage(false);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //change the values of inputs
  const changeMemberName = (e) => {
    setMemberName(e.target.value);
  };
  const changeMemberPosition = (e) => {
    setMemberPosition(e.target.value);
  };
  const changeMemberDetails = (e) => {
    setMemberDetails(e.target.value);
  };
  const handleFileChange = (e) => {
    setMemberImage(e.target.files[0]);
    setSelectedImage(true);
    setShowPrevMemberImage(false);
  };
  ///////////////
  // clean data when i click cancel and close button
  const clickCancel = () => {
    cleanInputData();
    onHide();
  };
  const cleanInputData = () => {
    setMemberName("");
    setMemberPosition("");
    setMemberDetails("");
    setMemberImage("");
    setSelectedImage(false);
    setShowPrevMemberImage(true);
  };
  //////////////
  const modifyNewMemberData = async (e) => {
    try {
      if (memberName === "") {
        alert("please put the name of member....");
        return;
      }
      //close the window of modifying
      onHide();
      const token = localStorage.getItem("admin_token");
      let response = await axios.post(
        `https://tproject.techpundits.net/api/council-members/${member.id}`,
        {
          name: memberName,
          job_title: memberPosition,
          description: memberDetails,
          photo: memberImage,
          _method: "PUT",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      refreshOnModifyMember();
    } catch (error) {
      console.log(error);
    }
    //clean the input after send data
    cleanInputData();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="font-tajwal"
    >
      <Modal.Header closeButton>
        <div className="popup-title">تعديل العضو</div>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Row className="fw-bold">
              <Col
                xs={2}
                className="card-title-color flex justify-content-start align-items-center"
              >
                <label>اسم العضو:</label>
              </Col>
              <Col
                xs={10}
                className="flex justify-content-center px-0 align-items-center"
              >
                <input
                  value={memberName}
                  onChange={changeMemberName}
                  className="p-2 color-placeholder mr-minus"
                  placeholder={member.name}
                />
              </Col>
            </Row>
            <Row className="fw-bold mt-3">
              <Col
                xs={2}
                className="card-title-color flex justify-content-start align-items-center"
              >
                <label>المنصب:</label>
              </Col>
              <Col
                xs={10}
                className="flex justify-content-center px-0 align-items-center"
              >
                <input
                  value={memberPosition}
                  onChange={changeMemberPosition}
                  className="p-2 color-placeholder mr-minus"
                  placeholder={member.job_title}
                ></input>
              </Col>
            </Row>
            <Row className="fw-bold mt-3">
              <Col
                xs={2}
                className="card-title-color flex justify-content-start align-items-center"
              >
                <label>التفاصيل:</label>
              </Col>
              <Col
                xs={10}
                className="flex justify-content-center px-0 align-items-center"
              >
                <input
                  value={memberDetails}
                  onChange={changeMemberDetails}
                  className="p-2 color-placeholder mr-minus"
                  placeholder={member.description}
                ></input>
              </Col>
            </Row>
            <Row className="fw-bold mt-3">
              <Col
                xs={2}
                className="card-title-color flex justify-content-start align-items-center"
              >
                <label className="fw-bold">الصورة:</label>
              </Col>
              <Col
                xs={10}
                className="flex justify-content-center px-0 align-items-center"
              >
                <div className="input-image-style mr-minus">
                  <label
                    htmlFor="imageFile"
                    className="add-image align-items-center justify-content-center"
                  >
                    {showPrevMemberImage && (
                      <div className="flex flex-column align-items-center justify-content-center ml-70">
                        <div>
                          <Image className="show-image" src={member.photo} fluid rounded />
                        </div>
                      </div>
                    )}
                    {selectedImage && (
                      // <div className="mt-1 ml-70 fw-bold color-main">
                      //   ...Image selected success
                      // </div>
                      <div className="mt-1 ml-70">
                        <Image
                          className="show-image"
                          src={selectedImage.toString()}
                          alt="Selected"
                          fluid
                          rounded
                        />
                      </div>
                    )}
                  </label>
                  <input
                    className="input-image"
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={(e) => {
                      ImageChoosen(e);
                      handleFileChange(e);
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Col className="flex justify-content-center">
          <button
            className="save-button-about main-shadow-about"
            onClick={(e) => modifyNewMemberData(e)}
          >
            حفظ التعديلات
          </button>
        </Col>
        <Col className="flex justify-content-center">
          <button
            className="cancel-button main-shadow-about"
            onClick={() => {
              clickCancel();
            }}
          >
            إلغاء التعديلات
          </button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
}
export default ModuleModifyMember;
