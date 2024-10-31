//by ziad
import logo from "./logo.svg";
import "./App.css";

import AdminLogin from "./AdminLogin";
import Sidebar from "./components/Sidebar";

import { Route, Routes } from "react-router-dom"; //2
import Complaints from "./components/Complaints.js";
import Decisions from "./Decisions";
import Events from "./Events";
import EditbottonEvents from './editbotton(events)';
import EditbottonDecision from './editbotton(decision)';
import Content from './components/Content'
import Aboutus from './components/About'
import Services from "./components/services_component_sedra/Services";
import NothingHere from "./components/NothingHere.js";

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Tajwal, sans-serif' }}>
      {/* <AdminLogin/> */}

      <Routes>
        <Route path="/" element={<AdminLogin />} />

      </Routes>

      <div className="d-flex ">
        <Sidebar className=" " />
        <div className="mx-5  mt-3 w-100">
          <Routes>
            <Route path="/Complaints" element={<Complaints />} />
            {/* <Route path="/AdminLogin" element={<AdminLogin />} /> */}
            <Route path="/Content" element={<Content />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/Services" element={<Services/>} />
            <Route path="/Main" element={<NothingHere/>} />

            
            <Route path="/Decisions" element={
              <div>
                <Decisions />


                <div className="h2 text-danger bg-info">الكمبوننت التالي عبارة عن زرين استلمتو هيك من نانسي ، هية عاملتو بس استعمالو بيجي بالقسم تبع  بالقرارات السابقة مابعرف مين مستلما </div>
                <EditbottonDecision />
              </div>

            } />
            <Route path="/Events" element={
              <div>
                <Events />
                <div className="h2 text-danger bg-info">الكمبوننت التالي عبارة عن زرين استلمتو هيك من نانسي ، هية عاملتو بس استعمالو بيجي بالقسم تبع  بالفعاليات السابقة مابعرف مين مستلما </div>

                < EditbottonEvents />



              </div>
            } />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
