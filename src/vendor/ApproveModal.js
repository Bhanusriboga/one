import React, { useState } from "react";
import { Button, Modal, ModalHeader, } from "reactstrap";
import "./Approve.css";
 
const ApproveModal = () => {
  const [modal, setModal] = useState(false);
 
  const toggle = () => setModal(!modal);
 
  const handleApprove = () => {
    toggle();
  };
 
  return (
    <div>
      <Button color="primary" onClick={toggle}>
        {" "}
        Approve user
      </Button>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-0 text-center p-5">
          Are you sure you want to Approve?
        </ModalHeader>
 
        <div className="footer-content">
          <span className="cancel-text" onClick={toggle}>
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
 
export default ApproveModal;