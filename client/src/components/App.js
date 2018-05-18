//==================================================
// React
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Other Modules
import jwt_decode from "jwt-decode";

// Components
import Register from "./auth/Register";
import SignIn from "./auth/SignIn";
import ResetPassword from "./auth/ResetPassword";

// Methods
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/authActions";

// Redux
import { Provider } from "react-redux";
import store from "../store";
//==================================================

if(localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);

  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <div className="container">
              <div className="row justify-content-center">
                <Route exact path="/auth/register" component={Register} />
                <Route exact path="/auth/sign-in" component={SignIn} />
                <Route exact path="/auth/reset-password" component={ResetPassword} />
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;