import React from 'react';
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
    }
  },
  animation: {
    duration: 0
  }
};

// colors the graph for green and red zones, displays data
const data = {
  labels: [],
  datasets: [
    {
      label: 'project data',
      backgroundColor: "rgb(255, 255, 255)",
      pointRadius: 4,
      borderColor: "rgb(0, 0, 0)",
      showLine: true,
      data: [
        { x: 0, y: 0},
        { x: 30, y: 50}, 
        { x: 60, y: 50},
        { x: 90, y: 85},
        { x: 100, y: 100},
      ],
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
};

const FeverChart = () => {
  return (
      <Scatter options={options} data={data}/>
  );
};

export default FeverChart;