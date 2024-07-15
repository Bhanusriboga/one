import React from 'react'
import './ComingSoon.scss'
import Ring from '../../Assets/Rings 6.svg'
const ComingSoon = props => {
  return (
    <div className='ComingSoon h-100 d-flex justify-content-center align-items-center'>
        <div>
        <div className='CSanimation'>coming Soon</div>
        <div className='sttext d-flex justify-content-center'>Stay Tuned</div>
        <div className='d-flex justify-content-center iconalign'>
        <img src={Ring}></img>
        <img src={Ring} className='psstyle'></img>
        </div> 
        </div>
    </div>
  )
}

export default ComingSoon