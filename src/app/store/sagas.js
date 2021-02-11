import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import axios from "axios";
import { history } from "./history";
import { push } from "react-router-redux";

import * as mutations from "./mutations";

const url = "http://localhost:7777";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = `U1`;
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    //console.log("Got groupId ", groupID);

    const { res } = yield axios.post(url + `/task/new`, {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "New Task ",
      },
    });
    //console.info("Got response,", res)
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE,
    ]);
    axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password,
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
        /* the request was made and didn't reach the server.*/
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
