import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';



const Media = () => {
  const [media, setMedia] = useState([]);

  const handleAddMedia = () => {
    const newMedia = [...media, media.length + 1];
    setMedia(newMedia);
  };

  const handleRemoveMedia = (index) => {
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);
  };

  return (
    <Container>
      <div className="basic-main-heading">
        <h2 className='main-heading'>{EditProfile.media}</h2>
        <button  className="edit-btn" onClick={handleAddMedia}>{EditProfile.add}<MdEdit className='edit-icon'/></button>
      </div>
      <div className='media-image'>
      {media.map((item, index) => (
          <div className="media-item">
            <div className="media-content">
              <button className="close-button" onClick={() => handleRemoveMedia(index)}>x</button>
            </div>
          </div>
        ))}
      </div>  
    </Container>
  );
};

export default Media;

