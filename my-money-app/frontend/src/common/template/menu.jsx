import React from "react";

export default (props) => (
  <div>
    <li className="nav-item">
      <a href="#/dashboard" className="nav-link">
        <i className="nav-icon fas fa-chart-line" />
        <p>Dashboard</p>
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link">
        <i className="nav-icon fas fa-edit" />
        <p>
          Cadastro
          <i className="fas fa-angle-left right" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="#/billingcycles" className="nav-link">
            <i className="fa fa-pen" />
            <p>Ciclos de pagamento</p>
          </a>
        </li>
      </ul>
    </li>
  </div>
);
