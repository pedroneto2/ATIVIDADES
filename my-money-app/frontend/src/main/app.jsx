import React from "react";
import Header from "../common/template/header";
import SideBar from "../common/template/sideBar";
import Routes from "./routes";

export default (props) => (
  <div className="wrapper">
    <Header />
    <SideBar />
    <Routes />
  </div>
);
