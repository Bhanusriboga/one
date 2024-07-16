import React from 'react'
import Basicdetails from './Basicdetails'
import Personaldetails from './Personaldetails'
import Professionaldetails from './Professionaldetails'
import Mediadetails from './Mediadetails'
import { FaArrowLeft } from "react-icons/fa6"
import { EditProfile } from '../../utils/constants'
// import Chatbot from './Assets/Chatbot.svg'
 
const Editprofile = () => {
  return (
    <div //+++++++className=' container'
    >
      {/* <img src={Chatbot}/> */}
      <div className='editprofile-tittle mb-3 d-flex '>
      <FaArrowLeft className='leftarrow'/>
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

export default Editprofile