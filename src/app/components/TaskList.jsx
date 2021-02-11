import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";
export const TaskList = ({ tasks, name, id, CreateNewTask }) => (
  <div className="card p-2 m-2">
    <h3>{name}</h3>
    <div className="card p-2 m-2">
      {tasks.map((task) => (
        <Link to={`/task/${task.id}`} key={task.id}>
          <div className="card mt-2 p-2">{task.name}</div>
        </Link>
      ))}
    </div>
    <button
      onClick={() => CreateNewTask(id)}
      className="btn btn-primary btn-block mt-2"
    >
      Add new{" "}
    </button>
  </div>
);
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    CreateNewTask(id) {
      console.log("Creating new Task : ", id);
      dispatch(requestTaskCreation(id));
    },
  };
};
const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

export const ConnnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
