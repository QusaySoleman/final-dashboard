// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from 'react'; // Add this line
import axios from "axios";
import { Card, Row, Col, Modal } from "react-bootstrap";
import Editevent from '../editevent'; // Import the Editevent component
import img2 from "./img2.jpeg";

function EventCard() {
  const [activeType, setActiveType] = useState();
  const [activity, setServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    axios.get("https://tproject.techpundits.net/api/activity")
      .then(response => {
        setServices(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const categories = [...new Set(activity.map((activities) => activities.activity_type_name))];

  const categoryTranslations = {
    "events": "فعاليات",
    "activities": "نشاطات",
    "businesses": "أعمال"
  };

  const filteredServices = activity.filter(
    (service) => service.activity_type_name === activeType
  );

  const handleEditClick = (service) => {
    setSelectedService(service);
    setShowPopup(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      // const token = '25|tfhhQ6VJXfdAyC43Xpd5VvIO5Ws35tFfjpLHxHqnfebc2381';
      const token = localStorage.getItem('admin_token');
      const response = await axios.delete(`https://tproject.techpundits.net/api/activity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message);
      setServices(activity.filter(service => service.id !== id));
    } catch (error) {
      console.error('There was an error deleting the activity!', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedService(null);
  };

  return (
    <div className="mt-4">
      <div className="decisions-tabsBtns">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeType === category
                ? "decisions-custom-active-btn"
                : "decisions-custom-inactive-btn"
            }
            onClick={() => setActiveType(category)}
          >
            {categoryTranslations[category] || category}
          </button>
        ))}
      </div>

      <Row className="flex-column">
        {filteredServices.map((activity) => (
          <Col key={activity.id} className="mb-4 decisions-col">
            <Card className="decisions-card" data-id={activity.id}>
              <Row className="g-0 decisions-cardRow">
                <Col>
                  <img
                    className="decisions-CardImg"
                    src={activity.photos[0]}
                  />
                </Col>
                <Col className="col-md-9 decisions-Box">
                  <div className="d-flex justify-content-end p-3">
                    <header className="decisions-CardTitle">
                      {activity.title}
                    </header>
                    <button className="decisions-cardBtn" onClick={() => handleEditClick(activity)}>تعديل</button>
                    <button className="decisions-cardBtn2" onClick={() => handleDeleteClick(activity.id)}>حذف</button>
                  </div>

                  <Card.Text className="decisionsDate">
                    • {new Date(activity.activity_date).toLocaleDateString('ar-EG')}
                  </Card.Text>
                  <Card.Text className="decisions-CardText">
                    {activity.description}
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {showPopup && selectedService && (
        <Modal className="custom-modal" show={showPopup} onHide={handleClosePopup} centered>
          <Modal.Body>
            <Editevent service={selectedService} onClose={handleClosePopup} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default EventCard;
