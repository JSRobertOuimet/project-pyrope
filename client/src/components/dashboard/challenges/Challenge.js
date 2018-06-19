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
import { deleteChallenge } from "../../../actions/challengeActions";
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

      deleteChallengeModal: false,
      addSessionModal: false
    };

    // Modals
    this.toggleDeleteChallengeModal = this.toggleDeleteChallengeModal.bind(this);
    this.toggleAddSessionModal = this.toggleAddSessionModal.bind(this);

    // Inputs
    this.onChange = this.onChange.bind(this);

    // Submit
    this.onDeleteChallenge = this.onDeleteChallenge.bind(this);
    this.addSession = this.addSession.bind(this);
  }

  componentDidMount() {
    const challengeId = this.props.match.params.challengeId;

    Promise
      .resolve(this.props.setChallenge(challengeId))
      .then(this.props.setSessions(challengeId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggleDeleteChallengeModal() {
    this.setState({ deleteChallengeModal: !this.state.deleteChallengeModal });
  }

  toggleAddSessionModal() {
    this.setState({
      numberOfPagesRead: "",
      notes: "",
      addSessionModal: !this.state.addSessionModal,
    });

    if(this.state.errors) {
      this.props.clearErrors();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDeleteChallenge(e) {
    const challengeId = this.props.match.params.challengeId;

    e.preventDefault();
    this.props.deleteChallenge(challengeId, this.props.history);
  }

  addSession(e) {
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
          .then(this.toggleAddSessionModal());
      }
    }, 2000);
  }

  render() {
    const
      { errors } = this.state,
      { challenge, challengesLoading } = this.props.challenge,
      { sessionsLoading, sessions } = this.props.session;
    let content, sessionsSection, deleteModalContent;

    if(challengesLoading === true || sessionsLoading === true || challenge === null || sessions === null) {
      content = <div className="block-center lead text-center text-muted">Fetching challenge...</div>;
    }
    else {
      deleteModalContent = (<p>You are about to permanently delete your challenge for the book <strong>{challenge.book.title}</strong>.</p>);

      if(sessions.length === 0) {
        sessionsSection = (
          <div className="mx-auto text-center my-5">
            <p className="lead text-muted">You don&#8217;t have any sessions yet.</p>
            <button className="btn btn-outline-dark" onClick={this.toggleAddSessionModal}>Add your first one!</button>
          </div>
        );
      }
      else {
        sessionsSection = (
          <React.Fragment>
            <div className="row mb-3">
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
            <div className="col-md-4 mb-3">
              <div className="card border-0">
                <img src={placeholderBookCoverImage} alt={challenge.book.title} className="card-img rounded-0" />
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <h3 className="display-4 n-pl">{challenge.book.title}</h3>
              <p className="lead">{challenge.book.author}</p>
              <p>{challenge.book.numberOfPages} pages</p>
              <div>{challenge.goal.numberOfPages} pages / {challenge.goal.timePeriod}</div>
              <div>{ completionPercentage(challenge, sessions) } % completed</div>
              <div>{ challenge.public === true ? "Public" : "Private" } challenge</div>
              <div className="row mt-3">
                <div className="col">
                  <button className="btn btn-outline-danger btn-sm" onClick={this.toggleDeleteChallengeModal}>Delete Challenge</button>
                </div>
              </div>
            </div>
          </div>
          <h2 className="my-3 d-flex justify-content-between">
            <div>My Sessions { sessions.length > 0 ? <small className="text-black-50">({sessions.length})</small> : null }</div>
            { sessions.length > 0 ? <button className="btn btn-dark btn-sm align-self-center" onClick={this.toggleAddSessionModal}>Add Session</button> : null }
          </h2>
          {sessionsSection}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {content}
        <Modal isOpen={this.state.deleteChallengeModal} toggle={this.toggleDeleteChallengeModal}>
          <form onSubmit={this.onDeleteChallenge} noValidate>
            <ModalHeader toggle={this.toggleDeleteChallengeModal}>Delete Challenge</ModalHeader>
            <ModalBody>
              {deleteModalContent}
            </ModalBody>
            <ModalFooter>
              <Button outline color="dark" onClick={this.toggleDeleteChallengeModal}>Cancel</Button>
              <input type="submit" className="btn btn-danger" value="Delete challenge" onClick={this.onDeleteChallenge} />
            </ModalFooter>
          </form>
        </Modal>
        <Modal isOpen={this.state.addSessionModal} toggle={this.toggleAddSessionModal}>
          <form onSubmit={this.addSession} noValidate>
            <ModalHeader toggle={this.toggleAddSessionModal}>Add Session</ModalHeader>
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
              <Button outline color="dark" onClick={this.toggleAddSessionModal}>Cancel</Button>
              <input type="submit" className="btn btn-dark" value="Add Session" />
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

Challenge.propTypes = {
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setChallenge: PropTypes.func.isRequired,
  deleteChallenge: PropTypes.func.isRequired,
  setSessions: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  challenge: state.challenge,
  session: state.session
});

export default connect(mapStateToProps, { clearErrors, setChallenge, deleteChallenge, setSessions, createSession })(Challenge);