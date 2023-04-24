import React from "react";
import "./EmptyTodos.scss";
export const EmptyTodos = () => {
  return (
    <section className="EmptyTodos">
      <p>У вас нет заметок</p>
      <span>Добавьте заметки</span>
    </section>
  );
};
export default EmptyTodos;
