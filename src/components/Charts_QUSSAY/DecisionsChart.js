import React, { useState } from "react";

import Chart from "react-apexcharts";

function DecisionsChart() {
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
        name: "Decisions",
        data: [15,150,25,43,80,45],
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

export default DecisionsChart;
