
import React from 'react';
import { Link } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import './Ignoreuser.css';
import { Card } from 'react-bootstrap';
import image from '../../Assets/Ignore.svg';

function IgnoreCard(userDetails) {
  const { user, background, color, viewButtonColor, buttonBackgroundColor, onMoveToShortList, removeUserFromIgnoreList } = userDetails;
  
  const getAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const mon = today.getMonth() - birthDate.getMonth();
    if (mon < 0 || (mon === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  return (
    <div className='ignore-card-maincontainer'>
      <Card className='ignorecase' style={{ background: background, color: color }}>
        <div className='user-card-icons-container'>
          
          <img src={image} alt='ignore' className='remove-icon'
          onClick={removeUserFromIgnoreList} />
         
          <GoHeart data-testid="ignorecase-hearticon" className='ignorecase-hearticon'  onClick={onMoveToShortList} />
        </div>
        <div className='ignore-only-mobile'>
          <div className='ignorecase-image-container'></div>
          <div>
            <h6 className='ignorecase-name'>{user.name}</h6>
            <button className='ignorecase-button-mobile' style={{ backgroundColor: buttonBackgroundColor, color: viewButtonColor }}>
              <Link to={`/user/${user.id}`} style={{ color: viewButtonColor, textDecoration: 'none' }}>View Profile</Link>
            </button>
            <div className='display-only-mobile'>
              <div className='ignorecase-text'>
                <p className='age'>Age : </p><p className='age'>{getAge(user.time_of_birth)}</p>
              </div>
              <div className='ignorecase-text'>
                <p className='age'>Religion :</p><p className='age'>{user.religion.religion_name}</p>
              </div>
            </div>
            <button className='ignorecase-button' style={{ backgroundColor: buttonBackgroundColor, color: viewButtonColor }}>
              <p style={{ color: viewButtonColor, textDecoration: 'none' }}>View Profile</p>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default IgnoreCard;
