import React, { useState } from "react";

import Chart from "react-apexcharts";

function ComplaintsChart() {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [ "May", "Jun","Jul","Aug","Oct","Nov"],
      },
    },
    series: [
      {
        name: "Complaints",
        data: [32, 65, 16, 35,70,12],
      },
    ],
  });
  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"

      
      />
    </>
  );
}

export default ComplaintsChart;
