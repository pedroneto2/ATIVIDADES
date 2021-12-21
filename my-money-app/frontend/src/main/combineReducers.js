import { combineReducers } from "redux";
import billingCyclesReducer from "./billingCyclesReducer";

export default combineReducers({
  billingCycles: billingCyclesReducer,
});
