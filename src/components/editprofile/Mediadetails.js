
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from 'react-icons/md';
import { EditProfile } from '../../utils/constants';

const Media = () => {
  const [media, setMedia] = useState([]);

  const handleAddMedia = (e) => {
    const files = Array.from(e.target.files); 
    setMedia([...media, ...files]); 
  };

  const handleRemoveMedia = (index) => {
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);
  };

  return (
    <Container>
      <div className="basic-main-heading">
        <h2 className="main-heading">{EditProfile.media}</h2>
        <label htmlFor="media-input" className="edit-btn">
          {EditProfile.add}<MdEdit className='edit-icon'/>
        </label>
        <input
          id="media-input"
          type="file"
          accept="image/*" 
          multiple 
          style={{ display: 'none' }}
          onChange={handleAddMedia}
        />
      </div>
      <div className='media-image'>
        {media.map((file, index) => (
          <div className="media-item" key={index}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Media ${index + 1}`}
              className="media-content"
            />
            <button className="close-button" onClick={() => handleRemoveMedia(index)}>x</button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Media;
