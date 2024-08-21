
import React from 'react';
import { GoHeart } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import { ignoreUserText } from '../utils/constants';
import { useHistory } from "react-router-dom";
import ignore from '../Assets/Ignore.svg'
import './UserCard.scss'

function UsersCard(userDetails) {
    const { user, background, color, viewButtonColor, buttonBackgroundColor, onMoveToIgnoreList, removeUserFromShortList } = userDetails
   const history=useHistory();
    const renderUserId=(userId)=>{
    //need to write the dispath method to call api for getting single user details
    history.push(`/dashboard/user-details/${userId}`)
   }
    return (
        <div className='user-card-maincontainer'>
            <div className='usercard'
                style={{
                    background: background,
                    color: color
                }}
            >
                <div className='user-card-icons-container'>
                    <button onClick={onMoveToIgnoreList} className='bg-transparent border-0'>
                        <img src={ignore} alt='ignore' style={{ width: '25px', height: '25px' }} data-testid="usercard-ignoreicon" />
                    </button>
                    <button  className='bg-transparent border-0' onClick={removeUserFromShortList}>
                        {
                            user.userStatus === "Shortlisted" ?
                                <AiFillHeart className='usercard-hearticon' style={{ color: 'white' }} data-testid="usercard-hearticon" />
                                :
                                <GoHeart className='usercard-hearticon' style={{ color: 'white' }} data-testid="usercard-hearticon" />
                        }
                    </button>
                </div>
                <div className='shortlist-mobile'>
                    <div className='usercard-image-container'>
                        {user?.imageUrl&&<img src={user?.imageUrl} alt='profile' className='usercard-image h-100 w-100 rounded-circle' />}
                    </div>
                    <div>
                        <h6 className='usercard-name'>{user?.username}</h6>
                        <button className='usercard-button-mobile' style={{ backgroundColor: buttonBackgroundColor, color: viewButtonColor }}  onClick={() => renderUserId(user.userId)}>
                            <text  style={{ color: viewButtonColor }}>View Profile</text>
                        </button>
                        <div className='usercard-only-mobileview'>
                            <div className='usercard-text'>
                                <p className='user-age'>{ignoreUserText.Age} : </p><p className='user-age'>{user?.age}</p>
                            </div>
                            <div className='usercard-text'>
                                <p className='user-age'>{ignoreUserText.Religion} :</p><p className='user-age'>{user?.religion}</p>
                            </div>
                        </div>
                        <button className='usercard-button' style={{ backgroundColor: buttonBackgroundColor, color: viewButtonColor }} onClick={() => renderUserId(user.userId)}>
                            <text style={{ color: viewButtonColor, textDecoration: 'none' }} >
                                {ignoreUserText.ViewProfileBtn}
                            </text>
                        </button>
                    </div>
                </div>
            </div>
         </div>

    )
}

export default UsersCard