//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Components
import Sessions from "../sessions/Sessions";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";

// Assets
import placeholderBookCoverImage from "../../../img/placeholder-book-cover-image.png";

// Methods
import { clearErrors } from "../../../actions/errorActions";
import { setChallenge } from "../../../actions/challengeActions";
import { setSessions } from "../../../actions/sessionActions";
import { createSession } from "../../../actions/sessionActions";
import { completionPercentage } from "../../../logic/stats";

// Redux
import { connect } from "react-redux";
//==================================================

class Challenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfPagesRead: "",
      notes: "",
      errors: {},

      createSessionModal: false
    };

    this.toggleCreateSessionModal = this.toggleCreateSessionModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitSession = this.onSubmitSession.bind(this);
  }

  componentDidMount() {
    const challengeId = this.props.match.params.challengeId;

    Promise
      .resolve(this.props.setChallenge(challengeId))
      .then(this.props.setSessions(challengeId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  toggleCreateSessionModal() {
    this.setState({
      numberOfPagesRead: "",
      notes: "",
      createSessionModal: !this.state.createSessionModal,
    });

    if(this.state.errors) {
      this.props.clearErrors();
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitSession(e) {
    const challengeId = this.props.match.params.challengeId;    
    const newSession = {
      numberOfPagesRead: Number(this.state.numberOfPagesRead),
      notes: this.state.notes
    };

    e.preventDefault();
    this.props.clearErrors();
    this.props.createSession(newSession, challengeId);

    setTimeout(() => {
      if(!(this.state.errors.numberOfPagesRead || this.state.errors.notes)) {
        Promise
          .resolve(this.props.setChallenge(challengeId))
          .then(this.props.setSessions(challengeId))
          .then(this.toggleCreateSessionModal());
      }
    }, 2000);
  }

  render() {
    const { errors } = this.state;
    const { challenge, challengesLoading } = this.props.challenge;
    const { sessionsLoading, sessions } = this.props.session;
    let content, sessionsSection;

    if(challengesLoading === true || sessionsLoading === true || challenge === null || sessions === null) {
      content = <div className="block-center lead text-center text-muted">Fetching challenge...</div>;
    }
    else {
      if(sessions.length === 0) {
        sessionsSection = (
          <div className="mx-auto text-center">
            <p className="lead text-muted">You don&#8217;t have any sessions yet.</p>
            <button className="btn btn-outline-info" onClick={this.toggleCreateSessionModal}>Add your first one!</button>
          </div>
        );
      }
      else {
        sessionsSection = (
          <React.Fragment>
            <div className="row mb-5">
              <div className="col">
                <Sessions sessions={sessions} />
              </div>
            </div>
          </React.Fragment>
        );
      }
      content = (
        <React.Fragment>
          <div className="row">
            <div className="col-sm-4 mb-3">
              <div className="card border-0">
                <img src={placeholderBookCoverImage} alt={challenge.book.title} className="card-img rounded-0" />
              </div>
            </div>
            <div className="col-sm-8 mb-3">
              <h3 className="display-4 n-pl">{challenge.book.title}</h3>
              <p className="lead">{challenge.book.author}</p>
              <p>{challenge.book.numberOfPages} pages</p>
              <div>{challenge.goal.numberOfPages} pages / {challenge.goal.timePeriod}</div>
              <div>{ completionPercentage(sessions, challenge.book.numberOfPages) } % completed</div>
              <div>{ challenge.public === true ? "Public" : "Private" } challenge</div>
            </div>
          </div>
          <h2 className="my-3 d-flex justify-content-between">
            <div>My Sessions</div>
            { sessions.length > 0 ? <button className="btn btn-info btn-sm align-self-center" onClick={this.toggleCreateSessionModal}>Add Session</button> : null }
          </h2>
          {sessionsSection}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {content}
        <Modal isOpen={this.state.createSessionModal} toggle={this.toggleCreateSessionModal}>
          <form onSubmit={this.onSubmitSession} noValidate>
            <ModalHeader toggle={this.toggleCreateSessionModal}>Create Session</ModalHeader>
            <ModalBody>
              <TextInput
                label="Number of pages read"
                type="number"
                id="numberOfPagesRead"
                name="numberOfPagesRead"
                value={this.state.numberOfPagesRead}
                error={errors.numberOfPagesRead}
                onChange={this.onChange}
              />
              <TextArea
                label="Notes"
                id="notes"
                name="notes"
                value={this.state.notes}
                error={errors.notes}
                onChange={this.onChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={this.toggleCreateSessionModal}>Cancel</Button>
              <input type="submit" className="btn btn-success" value="Create" />
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

Challenge.propTypes = {
  errors: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setChallenge: PropTypes.func.isRequired,
  setSessions: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  challenge: state.challenge,
  session: state.session
});

export default connect(mapStateToProps, { clearErrors, setChallenge, setSessions, createSession })(Challenge);