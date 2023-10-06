import React from "react";
import DoughnutChart from "../../components/Charts/Doughnut/Doughnut";
import PieChart from "../../components/Charts/Pie/Pie";
import PolarAreaChart from "../../components/Charts/Polar/Polar";
import EmptyCharts from "../../components/EmptyCharts/EmptyCharts";

import "./Chart.scss";

export const Chart = () => {
  const getTodos = JSON.parse(localStorage.getItem("todoItem") as string);
  const TotalTodos = getTodos.length;
  const TodosNotCompleted: number = getTodos.filter(
    (item: { state: boolean }) => item.state
  ).length;
  const TodosCompleted: number = getTodos.filter(
    (item: { state: boolean }) => item.state === false
  ).length;

  return (
    <>
      <main className="charts">
        {getTodos.length === 0 ? (
          <EmptyCharts />
        ) : (
          <>
            <h1>Графики</h1>
            <section className="ChartSection">
              <div className="Chart">
                <h2>Pie Chart</h2>
                <PieChart
                  TotalTodos={TotalTodos}
                  TodosCompleted={TodosCompleted}
                  TodosNotCompleted={TodosNotCompleted}
                />
              </div>
              <div className="Chart">
                <h2>Doughnut Chart</h2>
                <DoughnutChart
                  TotalTodos={TotalTodos}
                  TodosCompleted={TodosCompleted}
                  TodosNotCompleted={TodosNotCompleted}
                />
              </div>
              <div className="Chart">
                <h2>Polar Chart</h2>
                <PolarAreaChart
                  TotalTodos={TotalTodos}
                  TodosCompleted={TodosCompleted}
                  TodosNotCompleted={TodosNotCompleted}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
};
export default Chart;
