import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, } from 'react-router-dom';
import './Buttons.css'
function Buttons(buttons) {
    const {prev} = buttons
    return (
        <div>
            <div className='back-next-btn-container' >
                <button className='previous-btn'> <FaArrowLeft style={{ paddingRight: '5px', fontSize: '25px', paddingTop: '5px' }} onClick={prev} />previous</button>
                <button className='previous-btn'>Next<FaArrowRight style={{ paddingLeft: '5px', alignSelf: 'center', fontSize: '25px', paddingTop: '5px' }} /></button>
            </div>
            <Link className='skip-btn'> Skip & Register later</Link>
        </div>
    )
}

export default Buttons