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
            <Route exact path="/register" component={Register} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/reset-password" component={ResetPassword} />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;