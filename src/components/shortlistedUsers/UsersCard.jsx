
import React from 'react';
import { Link } from 'react-router-dom'

import './Usercard.css'
import { Card } from 'react-bootstrap';
import { ignoreUserText } from '../../utils/constants';
import ignore from '../../Assets/Ignore.svg'
import { AiFillHeart } from "react-icons/ai"
function UsersCard(userDetails) {
    
    const {user,background,color ,viewButtonColor, buttonBackgroundColor,onMoveToIgnoreList,removeUserFromShortList}=userDetails
  
  
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
    <div className='user-card-maincontainer'>
   
     
         <Card className='usercard'
         style={{
            background:background,
            color:color
         }}
         >
        <div className='user-card-icons-container'>
            <img src={ignore} alt='ignore' style={{width:'25px',height:'25px',cursor:'pointer',}} data-testid="usercard-ignoreicon" onClick={onMoveToIgnoreList} />
            <AiFillHeart className='usercard-hearticon' style={{color:'white'}} data-testid="usercard-hearticon" onClick={removeUserFromShortList}/></div>
            <div className='shortlist-mobile'>
           
            <div className='usercard-image-container' ></div>
            <div>
                <h6 className='usercard-name'>{user?.name}</h6>
                <button className='usercard-button-mobile' style={{backgroundColor:buttonBackgroundColor,color:viewButtonColor}}>
                    <Link to={`/user/${user.id}`} style={{color:viewButtonColor,  textDecoration: 'none' }}>View Profile</Link>
                </button>
                <div className='usercard-only-mobileview'>
                <div  className='usercard-text'>
                <p className='user-age'>{ignoreUserText.Age} : </p><p className='user-age'>{getAge(user.time_of_birth)}</p>
                </div>
                <div  className='usercard-text'>
                 <p className='user-age'>{ignoreUserText.Religion} :</p><p className='user-age'>{user.religion.religion_name}</p> 
             </div>
             </div>
                <button className='usercard-button' style={{backgroundColor:buttonBackgroundColor,color:viewButtonColor}}>
                    <Link to={`/user/${user.id}`} style={{color:viewButtonColor,  textDecoration: 'none' }}>{ignoreUserText.ViewProfileBtn}</Link>
                </button>
            </div>
            </div>
        </Card>
     
    </div>
   
  )
}

export default UsersCard