import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import Members from "./Members";
import "./css/aboutUsCss.css";
import axios from "axios";

function AboutUsDashboard() {
  const [memberNameNew, setMemberNameNew] = useState("");
  const [memberPositionNew, setMemberPositionNew] = useState("");
  const [memberDetailsNew, setMemberDetailsNew] = useState("");
  const [memberImageNew, setMemberImageNew] = useState("");
  const [addedMessage, setAddedMessage] = useState(false);
  const [membersGetArray, setMembersGetArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showChooseImage, setShowChooseImage] = useState(true);
  // show image when i choose it
  const ImageChoosen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  ///////////////
  //change the values of inputs
  const changeMemberNameNew = (e) => {
    setMemberNameNew(e.target.value);
  };
  const changeMemberPositionNew = (e) => {
    setMemberPositionNew(e.target.value);
  };
  const changeMemberDetailsNew = (e) => {
    setMemberDetailsNew(e.target.value);
  };
  const handleFileChange = (e) => {
    setMemberImageNew(e.target.files[0]);
    setSelectedImage(true);
    setShowChooseImage(false);
  };
  /////////////
  // clean data when i click cancel and close button
  const cleanInputDataForm = () => {
    setMemberNameNew("");
    setMemberPositionNew("");
    setMemberDetailsNew("");
    setMemberImageNew("");
    setSelectedImage(null);
    setShowChooseImage(true);
  };
  ///////////////
  // add new member
  const addNewMember = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.post(
        "https://tproject.techpundits.net/api/council-members",
        {
          name: memberNameNew,
          job_title: memberPositionNew,
          description: memberDetailsNew,
          photo: memberImageNew,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((response.data.status = 200)) {
        console.log("the member added successfully");
        setAddedMessage(true);
        getAllMembers();
        setTimeout(() => {
          setAddedMessage(false);
        }, 6000);
      } else {
        console.log("the member added failed");
      }
    } catch (error) {
      if (error.status === 422) {
        alert("Please fill in all fields.");
        console.log("the contents are not correct");
      }
      console.log("failed to add member :", error);
    }
    //clean the input after send data
    cleanInputDataForm();
  };
  ////////////
  //get all members ant nested it to members complaints to show them
  const getAllMembers = async () => {
    try {
      const response = await axios.get(
        "https://tproject.techpundits.net/api/council-members"
      );

      if ((response.data.status = 200)) {
        setMembersGetArray(response.data.data);
        console.log("get members succeccfully.");
      } else {
        console.log("get members failed");
      }
    } catch (error) {
      console.error("get members failed:", error);
    }
  };
  useEffect(() => {
    getAllMembers();
  }, []);
  return (
    <Container className="font-tajwal">
      <div className="box-shadow-main p-4 mt-4">
        <div className="popup-title fw-bold">إضافة عضو جديد</div>
        <Row className="fw-bold mt-4">
          <Col
            xs={2}
            className="card-title-color flex justify-content-start align-items-center"
          >
            <label className="fw-bold">الاسم:</label>
          </Col>
          <Col
            xs={10}
            className="flex justify-content-center px-0 align-items-center"
          >
            <input
              value={memberNameNew}
              onChange={changeMemberNameNew}
              className="p-2 color-placeholder mr-minus"
              placeholder="أضف اسم العضو..."
            ></input>
          </Col>
        </Row>
        <Row className="fw-bold mt-4">
          <Col
            xs={2}
            className="card-title-color flex justify-content-start align-items-center"
          >
            <label className="fw-bold">المنصب:</label>
          </Col>
          <Col
            xs={10}
            className="flex justify-content-center px-0 align-items-center"
          >
            <input
              value={memberPositionNew}
              onChange={changeMemberPositionNew}
              className="p-2 color-placeholder mr-minus"
              placeholder="أضف المنصب..."
            ></input>
          </Col>
        </Row>
        <Row className="fw-bold mt-4">
          <Col
            xs={2}
            className="card-title-color flex justify-content-start align-items-center"
          >
            <label className="fw-bold">تفاصيل المنصب:</label>
          </Col>
          <Col
            xs={10}
            className="flex justify-content-center px-0 align-items-center"
          >
            <input
              value={memberDetailsNew}
              onChange={changeMemberDetailsNew}
              className="p-2 color-placeholder mr-minus clean-class"
              placeholder="أضف تفاصيل المنصب..."
            ></input>
          </Col>
        </Row>
        <Row className="fw-bold mt-4">
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
                htmlFor="imageFileM"
                className="add-image align-items-center justify-content-center"
              >
                {showChooseImage && (
                  <div className="flex flex-column align-items-center justify-content-center ml-110">
                    <div>
                      <i className="bi bi-person-bounding-box"></i>
                    </div>
                    <div className="text-center fw-bold fs-14px">
                      اضغط لإضافة صور أو اسحب الصور وافلت هنا
                    </div>
                    <div className="text-center fw-400 fs-12px">
                      يجب ألا يتجاوز حجم الصورة 2 ميغابايت وعدد الصور 2، الأبعاد
                      المفضلة 800*450
                    </div>
                  </div>
                )}
                {selectedImage && (
                  <div className="mt-1 ml-110">
                    <Image
                      className="show-image-main"
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
                id="imageFileM"
                name="imageFileM"
                accept="image/*"
                onChange={(e) => {
                  ImageChoosen(e);
                  handleFileChange(e);
                }}
              />
            </div>
          </Col>
          <Col>
            {addedMessage && (
              <div className="flex justify-content-center">
                <div className="mt-3 p-1 bg-message fw-bold color-main rounded w-25 text-center">
                  لقد تم اضافة العضو بنجاح
                </div>
              </div>
            )}
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="flex justify-content-center">
            <button
              className="add-button-about main-shadow-about"
              onClick={addNewMember}
            >
              إضافة عضو
            </button>
          </Col>
          <Col className="flex justify-content-center">
            <button
              className="cancel-button main-shadow-about"
              onClick={() => {
                cleanInputDataForm();
              }}
            >
              إلغاء
            </button>
          </Col>
        </Row>
      </div>
      <Container className="mt-5">
        <div className="font-header fw-bold color-main">
          أعضاء مجلس البلدية:
        </div>
        <Members
          membersArray={membersGetArray}
          refreshOnDeleteMember={getAllMembers}
        />
      </Container>
    </Container>
  );
}
export default AboutUsDashboard;
