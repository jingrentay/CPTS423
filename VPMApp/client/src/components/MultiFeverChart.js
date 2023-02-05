import React, { useState } from 'react';
import { Scatter } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";

// ensures the graph's size/ratio is correct and adjusts correctly
const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
       display: false
    },
    tooltip: {
      callbacks: {
          label: function(chart) {
              let label = chart.dataset.labels[chart.dataIndex];
              label += " (Completion: " + Math.trunc(chart.parsed.x) + "%, Buffer: " + Math.trunc(chart.parsed.y) + "%)";
              return label;
          }
      }
    }
  },
  animation: {
    duration: 0
  }
};

const MultiFeverChart = ({plotData, labelData}) => {
  
  // eslint-disable-next-line
  const [chartData, setChartData] = useState({
    labels: labelData,
    datasets: [
      {
        label: 'project data',
        backgroundColor: "rgb(255, 255, 255)",
        pointRadius: 4,
        borderColor: "rgb(0, 0, 0)",
        showLine: false,
        data: plotData,
        labels: labelData,
      },
      {
        label: 'green zone',
        backgroundColor: "rgb(86, 171, 43)",
        pointRadius: 0,
        pointHitRadius: 0,
        showLine: true,
        fill: true,
        data: [
          { x: 0, y: 0},
          { x: 50, y: 50}, 
          { x: 100, y: 100},
        ],
      },
      {
        label: 'red zone',
        backgroundColor: "rgb(227, 65, 41)",
        pointRadius: 0,
        pointHitRadius: 0,
        showLine: true,
        fill: true,
        data: [
          { x: 0, y: 0},
          { x: 0, y: 100}, 
          { x: 100, y: 100},
        ],
      },
    ],
  })

  return (
      <Scatter options={options} data={chartData}/>
  );
};

export default MultiFeverChart;