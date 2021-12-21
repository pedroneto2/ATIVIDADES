import React from "react";
import BillingCycles from "./billingCycles";
import { Provider } from "react-redux";
import store from "../main/store";

export default () => (
  <Provider store={store}>
    <BillingCycles />
  </Provider>
);
