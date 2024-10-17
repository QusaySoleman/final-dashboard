 //by ziad
 // src/AdminLogin.js
  //work left:
  //API

  import { useState } from "react";
  import "./AdminLogin.css";
  import MyImage from "./login-image.png";
  import { useNavigate } from 'react-router-dom';
  function AdminLogin() {
    const baseUrl = 'https://tproject.techpundits.net'
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault(); // Prevent form submission
  const credentials = { email, password };

  try {
    const response = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      // Save token to local storage
      localStorage.setItem('admin_token', data.token);
      // Redirect to dashboard
      navigate('/Dashboard');
    } else {
      // Handle errors
      alert(data.message + '\nLogin failed. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred. Please try again later.');
  }
};



  
  
    return (
      
      <div className="container myBod ">
        <div className="cont d-flex flex-column" style={{ height: "100vh" }}>
          <div className="row m-auto login-master p-0">
            <div className="col R-box p-md-5 pt-5">
              <p
                style={{
                  color: "#000",
                  textAlign: "right",
                  fontFamily: "Tajawal",
                  fontSize: "17px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "160%",
                }}
              >
                مرحباً بكم في لوحة التحكم لموقع بلدية ضاحية الأسد
              </p>

              <form className="p-2" action="">
                <div className="mb-4 text-end">
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label py-1  m-0 text-center "
                  >
                    <i className="bi bi-person"></i>
                    اسم المستخدم:
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-4"
                    id="formGroupExampleInput"
                    placeholder="اسم المستخدم"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4 text-end">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label py-1 m-0"
                  >
                    <i className="bi bi-lock"></i>
                    كلمة المرور:
                  </label>
                  <input
                    id="passwordfield"
                    type={showPassword ? "text" : "password"}

                    className="form-control rounded-4"
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i id="showPassword" className="bi bi-eye-slash-fill" onClick={togglePasswordVisibility}></i>
                  <div className="text-start">
                    <a
                      id="forgetPassLink"
                      className="mb-4 text-decoration-none "
                      href="#"
                    >
                      نسيت كلمة المرور؟
                    </a>
                  </div>
                  <br />
                  <div className="form-check mt-3 mb-4  ">
                  <label className="form-check-label  text-end " htmlFor="Mycheckbox"
                     >
                      تذكرني عند تسجيل الدخول
                    </label>
                    <input
                      className="form-check-input border border-black "
                      type="checkbox"
                      value=""
                      id="Mycheckbox"
                      style={{float:"right"}}
                    />

                    <br />
                  </div>
                  <button
                    id="submitFormBtn"
                    type="submit"
                    className="m-auto rounded-4 w-100 py-2"
                    style={{ fontWeight: "500" }}
                    onClick={handleLogin}
                  >
                    تسجيل الدخول
                  </button>
                </div>
              </form>
            </div>
            <div className="col-7 L-box g-0">
              <img src={MyImage} alt="Login" className="myimg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default AdminLogin;
