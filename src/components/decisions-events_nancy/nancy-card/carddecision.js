import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stylesnancycard.css";
import { Card, Row, Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Editdecision from '../Editdecision';
import Button from 'react-bootstrap/Button';
import img2 from "./img2.jpeg";

function CardDecision() {
    const [decisions, setDecisions] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedDecision, setSelectedDecision] = useState(null);

    useEffect(() => {
        axios.get("https://tproject.techpundits.net/api/decision")
            .then(response => {
                setDecisions(response.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleDeleteClick = async (id) => {
        try {
            // const token = '25|tfhhQ6VJXfdAyC43Xpd5VvIO5Ws35tFfjpLHxHqnfebc2381'; 
            const token = localStorage.getItem('admin_token');
            const response = await axios.delete(`https://tproject.techpundits.net/api/decision/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            console.log(response.data.message);
            setDecisions(decisions.filter(decision => decision.id !== id));
        } catch (error) {
            console.error('There was an error deleting the decision!', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = (decision) => {
        setSelectedDecision(decision);
        setShow(true);
    };

    return (
        <>
            <Row className="flex-column">
                {decisions.map((decision) => (
                    <Col key={decision.id} className="mb-4 decisions-col">
                        <Card className="decisions-card">
                            <Row className="g-0 decisions-cardRow">
                                <Col>
                                    <img
                                        className="decisions-CardImg"
                                        src={decision.photos}
                                        // src={img2}
                                        //  src="https://tproject.techpundits.net/images/default_activity_photo.png"
                                        alt={decision.title}
                                    />
                                </Col>
                                <Col className="col-md-9 decisions-Box">
                                    <div className="d-flex justify-content-end p-3">
                                        <header className="decisions-CardTitle">
                                            {decision.title}
                                        </header>
                                        <Button variant="secondary" className="decisions-cardBtn" onClick={() => handleShow(decision)}>تعديل</Button>
                                        <button className="decisions-cardBtn2" onClick={() => handleDeleteClick(decision.id)}>حذف</button>
                                    </div>
                                    <Card.Text className="decisionsDate ">
                                      • {new Date(decision.decision_date).toLocaleDateString('ar-EG')}
                                    </Card.Text>
                                    <Card.Text className="decisionsid " >
                                      • رقم القرار : {decision.decision_id}
                                      
                                    </Card.Text>

                                    <Card.Text className="decisions-CardText">
                                        {decision.description}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedDecision && (
                <Modal className="custom-modal" show={show} onHide={handleClose} centered>
                    <Modal.Body>
                        <Editdecision decision={selectedDecision} onClose={handleClose} />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default CardDecision;
