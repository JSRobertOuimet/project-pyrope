import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

import Register from "./auth/Register";
import SignIn from "./auth/SignIn";
import ResetPassword from "./auth/ResetPassword";

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