// by batoul
import React from "react";
import FirstBtn from "./The1Btn/FirstBtn";
import SecondBtn from "./The2Btn/SecondBtn";
import ServiceForm from "./ServicesForm";
import CurrentServices from "./CurrentServices";
        
import { Container, Row, Col } from "react-bootstrap";

import "./styles.css";

const ServicesPage = () => {
  return (

    <>
       <Container>
      <Row>
          <Col> <p>الفئات الحالية:</p> </Col>
        </Row>
        <Row style={{textAlign:"center"}}>
          <Col xs={6}> <FirstBtn /> </Col>
          <Col xs={4}> <SecondBtn /> </Col>

        </Row>
         <Row>
          <Col xs={12} style={{marginTop:"50px"}}> <ServiceForm /> </Col>
        </Row>
         <Row>
          <Col> <p style={{marginTop:"150px"}}>الخدمات الحالية:</p> </Col>
        </Row>
         <Row>
          <Col> <CurrentServices /> </Col>
        </Row>

    </Container>
    
      </>
  );
};

export default ServicesPage;
