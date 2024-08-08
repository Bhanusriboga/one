import React, { useState } from "react";
import { Modal, ModalBody, Input } from "reactstrap";

import "./Finish.css";
import { prevStep } from "../../redux/slices/RegistrationDetails";
import { useDispatch, useSelector } from "react-redux";
import { saveTextArea } from "../../redux/slices/RegistrationDetails";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Finish() {
  const dispatch = useDispatch();

  const savedText = useSelector(
    (state) => state.RegistrationDetails.textArea || ""
  );

  const [textarea, setTextarea] = useState(savedText);
  const [errorMsg, setErrorMsg] = useState("");

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const changeHandler = (e) => {
    setTextarea(e.target.value);
    setErrorMsg("");
  };

  const submittext = () => {
    if (textarea.length < 10) {
      setErrorMsg("Please describe yourself in at least 10 characters.");
    } else {
      dispatch(saveTextArea(textarea));
      setModal(true);
    }
  };

  const prev = () => {
    dispatch(prevStep());
  };

  return (
    <div className="registration5-container">
      <p className="registration5-heading">Describe Yourself</p>
      <Input
        type="textarea"
        rows={5}
        className="registration5-textarea"
        value={textarea}
        onChange={changeHandler}
      />
      {errorMsg && <span className="error-message">{errorMsg}</span>}

      <Modal isOpen={modal} toggle={toggle} className="modal-with-bgp-0 m-">
        <ModalBody className=" w-100 h-100 m-0 modal-content-finish">
          <div className="text-center">
            <h3 className="pt-4">Registered Successfully</h3>
            <p className="py-3 text-muted mx-4">
              Start by exploring your personalized dashboard where you can
              manage your profile, settings, and access our features.
            </p>
            <Link to="/dashboard" className="linktodashboard">
              Go to Dashboard
            </Link>
            <p
              className="pt-3 pt-md-4 text-danger cursor-pointer"
              onClick={toggle}>
              Cancel
            </p>
          </div>
        </ModalBody>
      </Modal>

      <div className="back-next-btn-container">
        <button className="previous-btn" onClick={prev}>
        
          <FaArrowLeft
            style={{
              paddingRight: "5px",
              fontSize: "25px",
              paddingTop: "5px",
            }}
          />
          previous
        </button>
        <button className="save-btn" onClick={submittext}>
          Save
        </button>
      </div>
      <Link className="skip-btn"> Skip & Register later</Link>
    </div>
  );
}

export default Finish;
