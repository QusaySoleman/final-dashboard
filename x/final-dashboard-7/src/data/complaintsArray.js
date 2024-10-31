//by nour

import loginImage from "../images/login-image.png";
import complaintsTypes from "./complaintsTypes";
const complaintsArray = [
  {
    id: 0,
    name: "سامر الحسن",
    phoneNumber: "0999999999",
    date: "25/2/2021",
    details: {
      text: "نص الشكوى",
      img: loginImage ,
    },
    typeOfComplaints: complaintsTypes[0].name,
  },
  {
    id: 1,
    name: "مهند ",
    phoneNumber: "0999999999",
    date: "25/2/2021",
    details: {
      text: "نص الشكوى",
      img: loginImage ,
    },
    typeOfComplaints: complaintsTypes[1].name,
  },
  {
    id: 2,
    name: "عصام",
    phoneNumber: "0999999999",
    date: "25/2/2021",
    details: {
      text: "نص الشكوى",
      img: loginImage ,
    },
    typeOfComplaints: complaintsTypes[2].name,
  },
  {
    id: 3,
    name: "امجد",
    phoneNumber: "0999999999",
    date: "25/2/2021",
    details: {
      text: "نص الشكوى",
      img: loginImage ,
    },
    typeOfComplaints: complaintsTypes[3].name,
  },
  {
    id: 4,
    name: "فادي",
    phoneNumber: "0999999999",
    date: "25/2/2021",
    details: {
      text: "نص الشكوى",
      img: loginImage ,
    },
    typeOfComplaints: complaintsTypes[0].name,
  },
  {
    id: 5,
    name: "سمير",
    phoneNumber: "0999999999",
    date: "25/2/2021",
    details: {
      text: "نص الشكوى",
      img: loginImage ,
    },
    typeOfComplaints: complaintsTypes[2].name,
  },
  
  {
    id: 6,
    name: "زياد محذوفات",
    phoneNumber: "0999999999",
    date: "25/2/2021",
    details: {
      text: "نص الشكوى",
      img: loginImage ,
    },
    typeOfComplaints: complaintsTypes[3].name,
  },
];
export default complaintsArray;
