import React from "react";
import "./EmptyChart.scss";
export const EmptyCharts = () => {
  return (
    <section className="EmptyChart">
      <p>У вас нет заметок</p>
      <span>Вернитесь на главную и добавьте заметки</span>
    </section>
  );
};
export default EmptyCharts;
