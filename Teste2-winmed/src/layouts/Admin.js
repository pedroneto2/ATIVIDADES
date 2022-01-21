import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

var ps;

const darkMode = {
  background: "black",
  text: "white",
};

const lightMode = {
  background: "pale",
  text: "black",
};

const storageLighDarkMode = (lightDarkMode) => {
  localStorage.setItem("lightDarkMode", JSON.stringify(lightDarkMode));
};

const getLightDarkMode = () => {
  return JSON.parse(localStorage.getItem("lightDarkMode"));
};

function Dashboard(props) {
  const [lightDarkMode, setLightDarkMode] = React.useState(
    getLightDarkMode() || darkMode
  );
  const mainPanel = React.useRef();
  const location = useLocation();
  const toggleLightDarkMode = () => {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      if (
        lightDarkMode.background !== "black" &&
        document.documentElement.className.indexOf("dark-mode") === -1
      ) {
        document.documentElement.classList.add("dark-mode");
      } else if (
        lightDarkMode.background === "black" &&
        document.documentElement.className.indexOf("dark-mode") !== -1
      ) {
        document.documentElement.classList.remove("dark-mode");
      }
    }
    setLightDarkMode(lightDarkMode === darkMode ? lightMode : darkMode);
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  React.useEffect(() => {
    storageLighDarkMode(lightDarkMode);
  }, [lightDarkMode]);
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        lightDarkMode={lightDarkMode}
        routes={routes}
        bgColor={lightDarkMode.background}
        activeColor={lightDarkMode.text}
      />
      <div
        className={`main-panel ${
          lightDarkMode.background === "black" ? "bg-dark" : "bg-white"
        }`}
        ref={mainPanel}
      >
        <DemoNavbar
          {...props}
          lightDarkMode={lightDarkMode}
          toggleLightDarkMode={toggleLightDarkMode}
        />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                render={() => prop.component({ lightDarkMode })}
                key={key}
              />
            );
          })}
        </Switch>
        <Footer fluid lightDarkMode={lightDarkMode} />
      </div>
    </div>
  );
}

export default Dashboard;
