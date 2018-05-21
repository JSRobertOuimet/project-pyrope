//==================================================
// React
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Other Modules
import jwt_decode from "jwt-decode";

// Components
import Navbar from "./common/Navbar";
import PrivateRoute from "./common/PrivateRoute";
import Register from "./auth/Register";
import SignIn from "./auth/SignIn";
import Dashboard from "./dashboard/Dashboard";
import Account from "./account/Account";

// Methods
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, signOutUser } from "../actions/authActions";

// Redux
import { Provider } from "react-redux";
import store from "../store";
//==================================================

if(localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;

  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  if(decoded.exp < currentTime) {
    store.dispatch(signOutUser);
    // TODO: redirect to /
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Route exact path="/auth/register" component={Register} />
              <Route exact path="/auth/sign-in" component={SignIn} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/account" component={Account} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;