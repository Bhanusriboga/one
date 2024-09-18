import React from "react";
import {  Modal, ModalHeader, } from "reactstrap";
import PropTypes from 'prop-types';
import "./Approve.css";
// import { useDispatch } from "react-redux";
// import { approveUsersByAdmin } from "../redux/slices/AdminUsers";
 
const ApproveModal = (props) => {

  const { modal, toggle, handleApprove,Rejected

  } = props;
  // const dispatch = useDispatch()
  return (
    <div>
      {/* <Button color="primary" onClick={toggle}>
  
        Approve user
      </Button> */}
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-0 text-center p-5">
          Are you sure you want to Approve?
        </ModalHeader>
 
        <div className="footer-content">
          <span className="cancel-text" onClick={Rejected}>
            Cancel
          </span>
          <span className="Approve-text" onClick={handleApprove}>
            Approve
          </span>
        </div>
      </Modal>
    </div>
  );
};
ApproveModal.propTypes = {
  modal: PropTypes.bool.isRequired,   
  toggle: PropTypes.func,                 
  handleApprove: PropTypes.func,
  Rejected: PropTypes.func
};
 
export default ApproveModal;