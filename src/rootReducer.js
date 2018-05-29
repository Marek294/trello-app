import { combineReducers } from "redux";

import tasks from "./reducers/tasks";
import boards from "./reducers/boards";

export default combineReducers({
  tasks,
  boards
});
