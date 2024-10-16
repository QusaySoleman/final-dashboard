import React from "react";
import DecisionsChart from "./DecisionsChart";
import NewsChart from "./NewsChart";
import ComplaintsChart from "./ComplaintsChart";
import AcivitiesChart from "./AcivitiesChart";
import "../../index.css";
//style
import "./ChartView.css";

function ChartView() {
  return (
    <div id="chatrts-container" className="container-fluid chart-container ">
      <h2 className="black_bold_h2">الاحصائيات</h2>


      <div className="the_flex_row d-flex flex-wrap ">
        <div className="chart-box flex-grow-1 ">
          <NewsChart />
          <p className="chart_caption">الاخبار</p>
        </div>

        <div className="chart-box flex-grow-1" >
          <DecisionsChart />
          <p className="chart_caption">القرارات</p>
        </div>

      </div>
      <div className="the_flex_row d-flex flex-wrap ">


        <div className="chart-box flex-grow-1">
          <AcivitiesChart />
          <p className="chart_caption">الفعاليات</p>
        </div>

        <div className="chart-box flex-grow-1 ">
          <ComplaintsChart />
          <p className="chart_caption">الشكاوي  المعالجة</p>
        </div>

      </div>


    </div>
  );
}

export default ChartView;
