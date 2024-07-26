import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { FaPhotoVideo, FaCamera } from 'react-icons/fa';
import '../CustomSideBar.scss';
import {CustomSideBar} from "../../../utils/constants"


const PhotoPopup = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="photo-popup">
      <ModalBody className="modal-content">
        <h2 className="popup-title">{CustomSideBar.title}</h2>
        <Button color="secondary" className="popup-button">
          <FaPhotoVideo className="icon" /> {CustomSideBar.fromGallery}
        </Button>
        <Button color="secondary" className="popup-button">
          <FaCamera className="icon" /> {CustomSideBar.fromCamera}
        </Button>
        <Button color="danger" className="popup-button" onClick={toggle}>
          {CustomSideBar.cancel}
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default PhotoPopup;
