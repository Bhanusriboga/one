
import React from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import { GoHeart } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import { ignoreUserText } from '../utils/constants';
import ignore from '../Assets/Ignore.svg'
import './UserCard.scss'

function UsersCard(userDetails) {
    const { user, background, color, viewButtonColor, buttonBackgroundColor, onMoveToIgnoreList, removeUserFromShortList } = userDetails
    return (
        <div className='user-card-maincontainer'>
            <Card className='usercard'
                style={{
                    background: background,
                    color: color
                }}
            >
                <div className='user-card-icons-container'>
                    <button onClick={onMoveToIgnoreList} disabled={user.userStatus !== "Active"} className='bg-transparent border-0'>
                        <img src={ignore} alt='ignore' style={{ width: '25px', height: '25px' }} data-testid="usercard-ignoreicon" />
                    </button>
                    <button disabled={user.userStatus !== "Active"} className='bg-transparent border-0' onClick={removeUserFromShortList}>
                        {
                            user.userStatus === "Shortlisted" ?
                                <AiFillHeart className='usercard-hearticon' style={{ color: 'white' }} data-testid="usercard-hearticon" />
                                :
                                <GoHeart className='usercard-hearticon' style={{ color: 'white' }} data-testid="usercard-hearticon" />
                        }
                    </button>
                </div>
                <div className='shortlist-mobile'>
                    <div className='usercard-image-container'></div>
                    <div>
                        <h6 className='usercard-name'>{user?.username}</h6>
                        <button className='usercard-button-mobile' style={{ backgroundColor: buttonBackgroundColor, color: viewButtonColor }}>
                            <Link to={`/user/${user.userId}`} style={{ color: viewButtonColor, textDecoration: 'none' }}>View Profile</Link>
                        </button>
                        <div className='usercard-only-mobileview'>
                            <div className='usercard-text'>
                                <p className='user-age'>{ignoreUserText.Age} : </p><p className='user-age'>{user?.age}</p>
                            </div>
                            <div className='usercard-text'>
                                <p className='user-age'>{ignoreUserText.Religion} :</p><p className='user-age'>{user?.religion}</p>
                            </div>
                        </div>
                        <button className='usercard-button' style={{ backgroundColor: buttonBackgroundColor, color: viewButtonColor }}>
                            <Link to={`/user/${user.userId}`} style={{ color: viewButtonColor, textDecoration: 'none' }}>{ignoreUserText.ViewProfileBtn}</Link>
                        </button>
                    </div>
                </div>
            </Card>
        </div>

    )
}

export default UsersCard