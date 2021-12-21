import React from "react";
import { Switch, Route } from "react-router";
import { HashRouter } from "react-router-dom";
import BillingCyclesHolder from "../my-money/billingCyclesHolder";
import DashBoard from "../my-money/creditSummary";

export default (props) => (
  <HashRouter>
    <Switch>
      <Route path="/dashboard">
        <DashBoard />
      </Route>
      <Route path="/billingcycles">
        <BillingCyclesHolder />
      </Route>
      <Route path="/">
        <DashBoard />
      </Route>
    </Switch>
  </HashRouter>
);
