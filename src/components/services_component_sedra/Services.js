// by sedra
import React from "react";
import FirstBtn from "./The1Btn/FirstBtn";
import SecondBtn from "./The2Btn/SecondBtn";
import ServiceForm from "./ServicesForm";
import CurrentServices from "./CurrentServices";
import "./styles.css";

const ServicesPage = () => {
  return (
    <div className="services-container">
      <div className="services-Group21">
        <p className="services-Title">الفئات الحالية:</p>
        <div className="services-Btns">
          <FirstBtn />
          <SecondBtn />
        </div>
      </div>
      <ServiceForm />
      <div className="services-Group22">
        <p className="services-Title2">الخدمات الحالية:</p>
        <CurrentServices />
      </div>
    </div>
  );
};

export default ServicesPage;
