import React from 'react';
import { Line } from "react-chartjs-2";

// eslint-disable-next-line
import Chart from "chart.js/auto";

// ensures the graph's size is correct and adjusts correctly
const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
};

const labels = ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Fever Chart",
      backgroundColor: "rgb(123, 163, 214)",
      borderColor: "rgb(123, 163, 214)",
      data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
  ],
};

const FeverChart = () => {
  return (
    <div>
      <Line options={options} data={data}/>
    </div>
  );
};

export default FeverChart;