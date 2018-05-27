//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Checkbox from "../common/Checkbox";
import SubmitButton from "../common/SubmitButton";

// Methods
import { createProfile } from "../../actions/profileActions";

// Redux
import { connect } from "react-redux";
//==================================================

class CreateProfile extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      about: "",
      public: true,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onToggleChange = this.onToggleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onToggleChange() {
    this.setState({
      public: !this.state.public
    });
  }

  onSubmit(e) {
    const newProfile = {
      username: this.state.username,
      about: this.state.about,
      public: this.state.public
    };

    e.preventDefault();

    this.props.createProfile(newProfile, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <div className="card mb-1">
            <div className="card-body">
              <h1 className="card-title h3 text-center">Create Profile</h1>
              <form onSubmit={this.onSubmit} noValidate>
                <TextInput
                  label="Username"
                  type="text"
                  id="username"
                  name="username"
                  value={this.state.username}
                  error={errors.username}
                  onChange={this.onChange}
                />
                <TextArea
                  label="About"
                  type="text"
                  id="about"
                  name="about"
                  value={this.state.about}
                  error={errors.about}
                  onChange={this.onChange}
                >
                </TextArea>
                <Checkbox
                  label="Public"
                  id="public"
                  name="public"
                  checked={this.state.public}
                  onChange={this.onToggleChange}
                />
                <SubmitButton
                  buttonType="success"
                  block="block"
                  value="Create"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(CreateProfile);