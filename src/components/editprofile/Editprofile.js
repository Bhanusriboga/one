import React from 'react'
import PropTypes from "prop-types";
import Basicdetails from './Basicdetails'
import Personaldetails from './Personaldetails'
import Professionaldetails from './Professionaldetails'
import Mediadetails from './Mediadetails'
import { FaArrowLeft } from "react-icons/fa6"
import { EditProfile } from '../../utils/constants'

 
const Editprofile = (props) => {
  return (
    <div> 
      <div className='editprofile-tittle mb-2 mt-3 d-flex '>
      <FaArrowLeft className='leftarrow' onClick={()=>props.setActiveContent("")}/>
        <h1>{EditProfile.editprofile}</h1>
      </div>
      <div className='edit-details'>
    <Basicdetails/>
    <Personaldetails/>
    <Professionaldetails/>
    <Mediadetails/>
    </div>
    <button className='save-btn mt-4'>{EditProfile.save}</button>
    </div>
  )
}
Editprofile.propTypes = {
  setActiveContent: PropTypes.func.isRequired,
}
export default Editprofile