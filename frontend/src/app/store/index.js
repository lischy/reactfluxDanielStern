/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { applyMiddleware, combineReducers, createStore } from "redux";
// import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import * as mutations from "./mutations";
// import * as sagas from "./sagas.mock";
import * as sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

 const store = createStore(
  // function reducer(state=defaultState,action){
  //     return state;
  // },

  // listenst for the appropriate action when dispatched and mamkes changes to the store
  combineReducers({
    tasks(tasks = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.tasks;
        case mutations.GET_USER_TASKS_SUCCESS:
          return[...tasks,...action.data]
        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskID,
              name: action.name,
              group: action.groupID,
              owner: action.ownerID,
              isComplete: action.status,
              comment:action.comment
            }
          ];
        case mutations.UPDATE_TASK_SUCCESS:
            
            return tasks.map((task)=>{
              return (
               task._id === action.taskID
            ? {...task,
              name: action.name,
              group: action.groupID,
              status: action.status,
              comment:action.comment
            }
            : task
            )});
        default: return tasks
      }
    },
    groups(groups = [], action) {
      switch (action.type) {
        case mutations.GET_GROUPS_SUCCESS:
          return [...action.data]
        default:return groups;
      }
      
    },
  }),
  applyMiddleware( sagaMiddleware)
);

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
export default store