import React from "react";
import Menu from "./menu";

export default (props) => (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="#" className="brand-link">
      <span className="brand-text font-weight-light">
        <b>My</b>Money
      </span>
    </a>

    <div className="sidebar">
      <nav className="mt-2">
        <ul
          className="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <Menu />
        </ul>
      </nav>
    </div>
  </aside>
);
