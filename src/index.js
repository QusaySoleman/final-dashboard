import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Root from "./routes/root";
import Sidebar from './components/Sidebar';
import NothingHere from './components/NothingHere';
import Decisions from './Decisions';
import Complaints from './components/Complaints';
import AdminLogin from "./AdminLogin";
import Events from "./Events";
import EditbottonEvents from './editbotton(events)';
import EditbottonDecision from './editbotton(decision)';
import Content from './components/Content'
import Aboutus from './components/About'
import Services from "./components/services_component_sedra/Services";
import UsingTokenExample from './UsingTokenExample';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('admin_token');

  // Check if token exists
  return token ? element : <Navigate to="/Login" />;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Login" />, // Redirect to Login on root path
  },
  {
    path: "Dashboard", // Example of a new path if needed
    element: <Sidebar />,
    children: [
      {
        path: "Decisions",
        element: <ProtectedRoute element={<Decisions />} />,
      },
      {
        path: "Complaints",
        element: <ProtectedRoute element={<Complaints />} />,
      },
      {
        path: "Content",
        element: <ProtectedRoute element={<Content />} />,
      },
      {
        path: "Aboutus",
        element: <ProtectedRoute element={<Aboutus />} />,
      },
      {
        path: "Services",
        element: <ProtectedRoute element={<Services />} />,
      },
      {
        path: "Events",
        element: <ProtectedRoute element={<Events />} />,
      },
      {
        path: "Main",
        element: <NothingHere />,
      },
      {
        path: "UsingTokenExample",
        element: <UsingTokenExample />,
      }
    ],
  },
  {
    path: "/Login",
    element: <AdminLogin />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}  />


</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
