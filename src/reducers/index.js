import { combineReducers } from "redux";
import modal from "./modal";
import filters from "./filters";


export default combineReducers({
  modal,
  filters
});
