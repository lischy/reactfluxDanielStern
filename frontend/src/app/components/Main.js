import React from "react";
import { Provider } from "react-redux";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "../../auth/auth0-provider-with-history";
import ProtectedRoute from "../../auth/ProtectedRoutes";
import store from "../store";
import { history } from "../store/history";
import { ConnectedDashboard } from "./Dashboard";
import Home from "./Home";
import { ConnectedNavigation } from "./Navigation";
import { ConnectTaskDetail } from "./TaskDetail";

const RouteGuard = (Component) => ({ match }) => {
  console.info("Route guard ", match);
  if (!store.getState().session.authenticated) {
    console.info(store.getState().session.authenticated);
    return <Redirect to="/" />;
  }
  
    return <Component match={match} />;
  
};
 const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <Auth0ProviderWithHistory>
      <div className="container">
        <ConnectedNavigation />
        <Route path='/' exact component={Home}/>
        <ProtectedRoute exact path="/dashboard" component={ConnectedDashboard} />
        {/* <Route
          exact
          path="/dashboard"
          render={({ match }) => <ConnectedDashboard className="row" />}
        /> */}

        <Route exact path="/task/:id" component={ConnectTaskDetail} />
      </div>
      </Auth0ProviderWithHistory>
    </Provider>
  </Router>
);

export default Main
