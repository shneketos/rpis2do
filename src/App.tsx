import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main/Main";
import "./App.scss";
import Chart from "./Pages/Charts/Chart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element=<Main /> />
        <Route path="/chart" element=<Chart /> />
        <Route path="*" element=<Main /> />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
