import React, { useState } from "react";

import Chart from "react-apexcharts";

function AcivitiesChart() {
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
        name: "Acivity",
        data: [100, 55, 122, 60, 41, 55],
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

export default AcivitiesChart;
