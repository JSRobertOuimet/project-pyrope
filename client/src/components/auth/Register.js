import React, { Component } from "react";
import TextInput from "../common/TextInput";

class Register extends Component {
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h1 className="display-4 text-center">Register</h1>
          <form>
            <TextInput
              label="Email"
              id="email"
              name="email"
            />
            <TextInput
              label="Password"
              type="password"
              id="password"
              name="password"
            />
            <TextInput
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;