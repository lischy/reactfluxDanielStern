import axios from "axios";
import { put, take } from "redux-saga/effects";
import { history } from "./history";
import * as mutations from "./mutations";


const url = "https://to-dos-daniel-stern.herokuapp.com";

export function* taskCreationSaga() {
  while (true) {
    const { groupID,ownerID,status,name,comment } = yield take(mutations.REQUEST_TASK_CREATION);
    yield put(mutations.createTask(groupID, ownerID,status,comment,name));

    const { res } = yield axios.post(`${url}/api/tasks/new`, {
      
        group: groupID,
        owner: ownerID,
        isComplete: status,
        name: name,
        comment:comment
      
    });
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE
    ]);
    axios.post(`${url  }/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete
      }
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(`${url  }/authenticate`, {
        username,
        password
      });
      if (!data) {
        console.log(`data error`, data);
        throw new Error();
      }
      console.log("AUTHENTICTED", data);

      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/dashboard");
      // yield put(push("/dashboard"));
    } catch (e) {
      if (e.response) {
        /* the request was made and the server responded
    with a status code that falls out of the range of 2xx */
        console.log(e.response.data.message);
        yield put(
          mutations.processAuthenticateUser(
            mutations.NOT_AUTHENTICATED,
            e.response.data.message
          )
        );
      } else {
        /* the request was made and didn't reach the server. */
        console.log("Can't authenticate", JSON.stringify(e));
        yield put(
          mutations.processAuthenticateUser(
            mutations.NOT_AUTHENTICATED,
            e.message
          )
        );
      }
    }
  }
}

export function* getUserTasksSaga(){
  while(true){
    const {userId} = yield take(mutations.GET_USER_TASKS);
    try {
      const {data} = yield axios.get(`${url}/api/tasks/user/${userId}`);
      if (!data) {
        console.log(`data error`, data);
        throw new Error();
      }
      yield put(mutations.getUSerTasksSuccess(data));

    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

export function* getGroupsSaga(){
  while(true){
    yield take(mutations.getGroups);
    try {
      const {data} = yield axios.get(`${url}/api/groups`);
      if (!data) {
        console.log(`data error`, data);
        throw new Error();
      }
      yield put(mutations.getGroupsSuccess(data));
    } catch (error) {
      
    }
  }
}

export function* updateTaskSaga(){
  while (true) {
    const { groupID,ownerID,status,name,comment,taskID } = yield take(mutations.UPDATE_TASK);
    yield put(mutations.updateTaskSuccess(groupID, ownerID,status,comment,name,taskID));

    const { res } = yield axios.put(`${url}/api/tasks/${taskID}`, {
      
        group: groupID,
        owner: ownerID,
        isComplete: status,
        name: name,
        comment:comment
      
    });
  }

}