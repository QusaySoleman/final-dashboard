import React, { useState } from "react";

import Chart from "react-apexcharts";

function NewsChart() {
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
        name: "News",
        data: [65, 70, 64, 12,70, 64],
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

export default NewsChart;
