//==================================================
// React
import React from "react";
import PropTypes from "prop-types";

// Components
import SubmitButton from "../common/SubmitButton";
//==================================================

const Modal = ({ title, content, onSubmit, action }) => {
  return (
    <div className="modal fade" id="createProfileModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={onSubmit} noValidate>
            <div className="modal-body">
              {content}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
              <SubmitButton buttonType="success" data-dismiss="modal" value={action} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired
};

export default Modal;