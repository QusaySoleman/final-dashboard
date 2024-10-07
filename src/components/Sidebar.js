// by rama
//src/components/Sidebar.js
import React, { startTransition } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const baseUrl = 'https://tproject.techpundits.net';
    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch(`${baseUrl}/api/admin/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove token from local storage
        localStorage.removeItem('admin_token');
        // alert("you are logeed out")
        // Redirect to AdminLogin
        navigate('/Login');
      } else {
        // Handle error case
        const data = await response.json();
        alert(data.message || 'Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  return (
    <div className=" d-flex">
      <div className="sidebar d-flex flex-column">
        <div className="title">
          <h5>مجلس بلدية ضاحية الأسد</h5>
        </div>
        <div className="user-info text-center">
          <div className="d-flex justify-content-center align-items-center">
            <img src="Rectangle 1393.png" />
            <div>
              <span className='text-white '>مازن سعيد</span><br />
              <span className='text-white '>مدير</span>
            </div>
          </div>
          <div className='bell '><img src="Vector.png" alt="User" /></div>
        </div>

        <nav className="nav  ">
          <div className="gradient-line "></div>

          <Link to="Main" className='nav-link'>الرئيسية</Link>
          <Link to="Content" className='nav-link'>الأخبار</Link>
          <Link to="Decisions" className='nav-link'>القرارات</Link>
          <Link to="Events" className='nav-link'>الفعاليات</Link>
          <Link to="Services" className='nav-link'>الخدمات</Link>
          <Link to="Aboutus" className='nav-link'>من نحن</Link>
          <Link to="Complaints" className='nav-link' >الشكاوي والتواصل</Link>
          {/* this testing link should be deleted later ,ziad */}
          <Link to="UsingTokenExample" className='nav-link text-danger'>TESTING</Link>

          <a href="#" onClick={handleLogout} className="nav-link ">تسجيل الخروج</a>

        </nav>
        <br />
        <nav>
          <div className="gradient-line"></div>
          <br />
          <div className="d-flex justify-content-center align-items-center ">
            <img src="ic_round-logout.png" alt="User"
              style={{ width: "22px" }} />
          </div>
        </nav>

      </div>

      <div className="w-75 ">{/*here goes the component next to the sidebar*/}
        <Outlet />

      </div>

    </div>


  );
};

export default Sidebar;
