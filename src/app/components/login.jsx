import React, { useState } from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { store } from "../store";
import { Redirect } from "react-router";

const LoginComponent = ({ authenticateUser, authenticated, error }) => {
  if (store.getState().session.authenticated == mutations.AUTHENTICATED) {
    console.info(store.getState().session.authenticated);
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="card p-3 col-6">
      <h2>Login here</h2>
      <form onSubmit={authenticateUser}>
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev"
          className="form-control"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          defaultValue="richy"
          className="form-control mt-2"
        />
        {authenticated === mutations.NOT_AUTHENTICATED && error !== "" ? (
          <p>Login Error: {(`  `, error)}</p>
        ) : null}
        <button type="submit" className="mt-2 form-control btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
  error: session.error,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target["username"].value;
    let password = e.target["password"].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});
export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
