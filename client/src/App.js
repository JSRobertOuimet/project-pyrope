import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import SignIn from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;