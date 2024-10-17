// by rama
//src/components/Sidebar.js
import { useEffect } from 'react';
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
  
  // This useEffect will trigger once the component is mounted (rendered)
  useEffect(() => {
    // Find the element by ID
    const mainLink = document.getElementById('mymainlinko');

    // Check if the element exists
    if (mainLink) {
      // Trigger the click event automatically
      mainLink.click();
    }
  }, []); // Empty dependency array ensures this effect runs only once, after the first render

  return (
    
    <div className=" d-flex">
      <div className="sidebar  
        d-flex flex-column align-items-center justify-content-start ">
<div>
<div className="bar-header ">

        
<img className='d-block mx-auto' id='logo' src="/logo.png" alt="Logo"
width={"80px"} height={"80px"}/>
<h5 className='d-block mx-auto ' id="the_title" >بلدية ضاحية الأسد</h5>
</div>
<div className="user-info  ">
<div className="d-flex align-items-center  ">
 <img src="/Rectangle 1393.png" width={"54px"} height={"54px"}  />
 <div>
   <span className='text-white '>مازن سعيد</span><br />
   <span className='text-white '>مدير</span>
 </div>
</div>
<img className='my-auto me-3 ' id='vector' src="/Vector.png" alt="User"  />

</div>
</div>

<div>
<hr className='w-75 p-0 m-3   ' />

<nav className="nav d-flex flex-column text-center ">

  <Link id="mymainlinko" to="Main" className='nav-link'>الرئيسية</Link>
  <Link to="Content" className='nav-link'>الأخبار</Link>
  <Link to="Decisions" className='nav-link'>القرارات</Link>
  <Link to="Events" className='nav-link'>الفعاليات</Link>
  <Link to="Services" className='nav-link'>الخدمات</Link>
  <Link to="Aboutus" className='nav-link'>من نحن</Link>
  <Link to="Complaints" className='nav-link' >الشكاوي </Link>


</nav>
</div>
<div>
  
<hr className='w-75 p-0 m-2  ' />

<div className="d-flex justify-content-center align-items-center ">

  <img id='logout_img' src="/ic_round-logout.png" alt="User"
  />
  <a href="#" onClick={handleLogout} className="nav-link ">تسجيل الخروج</a>

</div>
</div>

      </div>

      <div className="outlet_style mt-4 ms-5">{/*here goes the component next to the sidebar*/}
        <Outlet className="" />

      </div>

    </div>


  );
};

export default Sidebar;
