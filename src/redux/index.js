import { combineReducers, configureStore } from "@reduxjs/toolkit";

import employees, { loadEmployeesFromLocalStorage } from "./employees";
import global from "./global";

const reducer = combineReducers({
  global,
  employees,
});
const store = configureStore({
  reducer,
});
store.dispatch(loadEmployeesFromLocalStorage());
export default store;
