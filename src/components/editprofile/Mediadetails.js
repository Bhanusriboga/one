
import React, { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from 'react-icons/md';
import { EditProfile } from '../../utils/constants';
import {getPhotos,uploadPic,deletePic} from "../../redux/slices/users"
import { useDispatch } from 'react-redux';
const Media = () => {
  const [media, setMedia] = useState([]);
  const dispatch=useDispatch()
  const handleAddMedia = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const data=await dispatch(uploadPic(formData))
      console.log("uploading phtots",{data})
      fetchPhtos()
    }
  
  };
  useEffect(() => {
    fetchPhtos()
  },[])
  const fetchPhtos=async()=>{
   const data = await dispatch(getPhotos())
   setMedia(data?.payload?.object||[])
  }
  const handleRemoveMedia = async(fileName) => {
   const data= await dispatch(deletePic(fileName))
   console.log({data})
    fetchPhtos()
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
              src={file?.imageUrls}
              alt={`Media ${index + 1}`}
              className="media-content"
            />
            <button className="close-button" onClick={() => handleRemoveMedia(file?.fileName)}>x</button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Media;
