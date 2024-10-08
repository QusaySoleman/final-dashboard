import React from "react";
import DecisionsChart from "./DecisionsChart";
import NewsChart from "./NewsChart";
import ComplaintsChart from "./ComplaintsChart";
import AcivitiesChart from "./AcivitiesChart";
//style
import "./ChartView.css";

function ChartView() {
  return (
    <div className="container-fluid chart-container ">
      <h2>الاحصائيات</h2>

      
      <div className="row p-5">
        <div className="col-md-6 col-sm-12">
          <div className="chart-box">
            <NewsChart />
            <p>الاخبار</p>
          </div>
        </div>



        <div className="col-md-6 col-sm-12">
          <div className="chart-box">
            <DecisionsChart />
            <p>القرارات</p>
          </div>
        </div>
      </div>
      <div className="row px-5">
        <div className="col-md-6 col-sm-12">
          <div className="chart-box">
            <AcivitiesChart />
            <p>الفعاليات</p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="chart-box">
            <ComplaintsChart />
            <p>الشكاوي و المعالجة</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartView;
