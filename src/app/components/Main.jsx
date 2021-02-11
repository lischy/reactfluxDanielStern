import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedLogin } from "./login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import { ConnectTaskDetail } from "./TaskDetail";
import { Redirect } from "react-router";

const RouteGuard = (Component) => ({ match }) => {
  console.info("Route guard ", match);
  if (!store.getState().session.authenticated) {
    console.info(store.getState().session.authenticated);
    return <Redirect to="/" />;
  }
  {
    return <Component match={match} />;
  }
};
export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div className="container">
        <ConnectedNavigation />
        <Route
          exact
          path="/dashboard"
          render={({ match }) => <ConnectedDashboard className="row" />}
        />
        <Route exact path="/" component={ConnectedLogin} />

        <Route exact path="/task/:id" render={RouteGuard(ConnectTaskDetail)} />
      </div>
    </Provider>
  </Router>
);
