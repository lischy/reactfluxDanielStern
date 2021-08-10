export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER `;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const GET_USER_TASKS = `GET_USER_TASKS`;
export const GET_USER_TASKS_SUCCESS = `GET_USER_TASKS_SUCCESS`;
export const GET_GROUPS = `GET_GROUPS`;
export const GET_GROUPS_SUCCESS = `GET_GROUPS_SUCCESS`;
export const UPDATE_TASK = `UPDATE_TASK`;
export const UPDATE_TASK_SUCCESS = `UPDATE_TASK_SUCCESS`;

export const requestTaskCreation = (groupID,name,comment,status,ownerID) => ({
  type: REQUEST_TASK_CREATION,
  groupID,
  name,
  comment,
  status,
  ownerID
});

export const createTask = ( groupID, ownerID,status,comment,name) => ({
  type: CREATE_TASK,
  groupID,
  ownerID,
  status,
  comment,
  name
});

export const setTaskCompletion = (id, isCompelte) => ({
  type: SET_TASK_COMPLETE,
  taskID: id,
  isCompelte
});
export const setTaskName = (id, name) => ({
  type: SET_TASK_NAME,
  taskID: id,
  name
});
export const setTaskGroup = (id, groupID) => ({
  type: SET_TASK_GROUP,
  taskID: id,
  groupID
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
});

export const getUserTasks = (userId) => ({
  type: GET_USER_TASKS,
  userId
})

export const getUSerTasksSuccess = (data) => ({
  type:GET_USER_TASKS_SUCCESS,
  data
})

export const getGroups = (groups = null)=> ({
  type:GET_GROUPS,
  groups
})

export const getGroupsSuccess = (data)=> ({
  type:GET_GROUPS_SUCCESS,
  data
})

export const updateTask =(groupID,name,comment,status,ownerID,taskID)=>({
  type:UPDATE_TASK,
  groupID,
  ownerID,
  status,
  comment,
  name,
  taskID
})
export const updateTaskSuccess =(groupID, ownerID,status,comment,name,taskID)=>({
  type:UPDATE_TASK_SUCCESS,
  groupID,
  ownerID,
  status,
  comment,
  name,
  taskID
})

export const processAuthenticateUser = (
  status = AUTHENTICATING,
  error = null,
  session = null
) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status,
  error
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
});
