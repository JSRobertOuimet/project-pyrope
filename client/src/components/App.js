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
    window.location.href = "/auth/sign-in";
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
              <div className="row justify-content-center">
                <Route exact path="/auth/register" component={Register} />
                <Route exact path="/auth/sign-in" component={SignIn} />
              </div>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;