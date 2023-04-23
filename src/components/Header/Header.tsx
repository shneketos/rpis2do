import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
export const Header = () => {
  const location = useLocation();
  return (
    <header className="header">
      <div className="top">RPIS 2DO</div>
      <nav className="bottom">
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname !== "/chart" ? "active" : ""}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              to="/chart"
              className={location.pathname === "/chart" ? "active" : ""}
            >
              Графики
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
