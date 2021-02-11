import React from "react";
import { connect } from "react-redux";
import { ConnnectedTaskList } from "./TaskList";
import { store } from "../store";
import { Redirect } from "react-router";

export const Dashboard = ({ groups }) =>
  !store.getState().session.authenticated ? (
    <Redirect to="/" />
  ) : (
    <>
      {" "}
      <h2>Dashboard</h2>
      <div className="row">
        {groups.map((group) => (
          <ConnnectedTaskList
            key={group.id}
            id={group.id}
            name={group.name}
            className="col-sm"
          />
        ))}
      </div>
    </>
  );
//connnect , mapsateToProps to select part of the data from the store.
function mapStateToProps(state) {
  //whatever it returns becomes the props of the Dashoard.
  return {
    groups: state.groups,
  };
}
//react component + matchStateToProps = connectedComponent
export const ConnectedDashboard = connect(mapStateToProps)(Dashboard); //react-redux component
