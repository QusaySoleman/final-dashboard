import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Decisions from "./components/decisions-events_nancy/Decisions";
import Complaints_Dashboard from "./components/complaints_NOUR/components/Complaints_Dashboard";
import AdminLogin from "./components/Login_ZIAD/AdminLogin";
import Events from "./components/decisions-events_nancy/Events";
import EditbottonEvents from "./components/decisions-events_nancy/editevent";
import EditbottonDecision from "./components/decisions-events_nancy/Editdecision";
import Content from "./components/News/Content";
import AboutUsDashboard from "./components/About_us_Nour/AboutUsDashboard";
import Services from "./components/services_component_sedra/Services";
import ChartView from "./components/Charts_QUSSAY/ChartView";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("admin_token");

  // Check if token exists
  return token ? element : <Navigate to="/Login" />;
};

// const router = createBrowserRouter([

const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="Login" />, // Redirect to Login on root path
  },
  {
    path: "Dashboard", // Example of a new path if needed
    element: <Sidebar />,
    children: [
      {
        path: "Main",
        element: <ChartView />,
      },
      {
        path: "Decisions",
        element: <ProtectedRoute element={<Decisions />} />,
      },
      {
        path: "Complaints",
        element: <ProtectedRoute element={<Complaints_Dashboard />} />,
      },
      {
        path: "Content",
        element: <ProtectedRoute element={<Content />} />,
      },
      {
        path: "Aboutus",
        element: <ProtectedRoute element={<AboutUsDashboard />} />,
      },
      {
        path: "Services",
        element: <ProtectedRoute element={<Services />} />,
      },
      {
        path: "Events",
        element: <ProtectedRoute element={<Events />} />,
      },
    ],
  },
  {
    path: "Login",
    element: <AdminLogin />,
  },
  {
    path: "*",
    element: <AdminLogin />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
