import { combineReducers } from "redux";

import tasks from "./tasks";
import boards from "./boards";

export default combineReducers({
  tasks,
  boards
});
