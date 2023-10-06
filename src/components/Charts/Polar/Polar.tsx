import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({
  TotalTodos,
  TodosCompleted,
  TodosNotCompleted,
}: {
  TotalTodos: number;
  TodosCompleted: number;
  TodosNotCompleted: number;
}) => {
  const data = {
    labels: ["Всего", "Активные", "Завершенные"],
    datasets: [
      {
        data: [TotalTodos, TodosCompleted, TodosNotCompleted],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <PolarArea data={data} />;
};
export default PolarAreaChart;
