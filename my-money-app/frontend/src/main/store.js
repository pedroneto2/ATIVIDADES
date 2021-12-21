import { createStore, applyMiddleware } from "redux";
import combineReducers from "./combineReducers";

import thunkMiddleware from "redux-thunk"; //MIDDLEWARE QUE PERMITE AS ACTIONS RETORNAREM FUNCOES COM DISPATCH
import multi from "redux-multi"; //MIDDLEWARE QUE PERMITE DISPATCH DE MULTIPLAS ACOES

const devTools = //PLUGIN PARA MOSTRAR O REDUX NO CHROME
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(multi, thunkMiddleware)(createStore)(
  combineReducers,
  devTools
);

export default store;
