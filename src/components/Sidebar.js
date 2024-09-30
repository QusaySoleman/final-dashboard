// by rama
import React, { startTransition } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
  <div className="contenr"> 
    <div className="sidebar d-flex flex-column">
       <div className="title">
        <h5>مجلس بلدية ضاحية الأسد</h5>
     </div>  
      <div className="user-info text-center">
        <div className="d-flex justify-content-center align-items-center">
          <img src="Rectangle 1393.png" />
          <div>
            <span className='text-white '>مازن سعيد</span><br/>
            <span className='text-white '>مدير</span>
          </div>
        </div>
        <div className='bell '><img src="Vector.png" alt="User" /></div> 
      </div>
  
      <nav className="nav  ">  
        <div className="gradient-line "></div>

        <Link to="/Main" className='nav-link'>الرئيسية</Link>
          <Link to="/Content" className='nav-link'>الأخبار</Link>
          <Link to="/Decisions" className='nav-link'>القرارات</Link>
          <Link to="/Events" className='nav-link'>الفعاليات</Link>
          <Link to="/Services" className='nav-link'>الخدمات</Link>
          <Link to="/Aboutus" className='nav-link'>من نحن</Link>
          <Link to="/Complaints" className='nav-link' >الشكاوي والتواصل</Link>
      </nav> 
      <br/>
     <nav>
     <div className="gradient-line"></div>
        <br/>
      <div className="d-flex justify-content-center align-items-center ">
        {/* <a href="#" className="nav-link ">تسجيل الخروج</a> */}
        <Link to="/AdminLogin" className='nav-link'>تسجيل الخروج</Link>
        <img src="ic_round-logout.png" alt="User" 
        style={{width:"22px"}}/>
        </div>
     </nav>
    </div>
  </div>
  );
};

export default Sidebar;
