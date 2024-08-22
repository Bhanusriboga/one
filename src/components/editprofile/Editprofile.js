import React,{useEffect, useState} from 'react'
import Basicdetails from './Basicdetails'
import Personaldetails from './Personaldetails'
import Professionaldetails from './Professionaldetails'
import Mediadetails from './Mediadetails'
import { FaArrowLeft } from "react-icons/fa6"
import { EditProfile } from '../../utils/constants'
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux'
 
const Editprofile = (props) => {
  const { Mydata } = useSelector(state => state.auth)
  const [userData, setUserData] = useState()

  useEffect(()=>{
    console.log(Mydata.object,"testing")
    setUserData(Mydata.object)
  },[Mydata])
  return (
    <div> 
      <div className='editprofile-tittle mb-2 mt-3 d-flex '>
      <FaArrowLeft onClick={() => props.setActiveContent('')}  className='leftarrow'/>
        <h1>{EditProfile.editprofile}</h1>
      </div>
      <div className='edit-details'>
    <Basicdetails userbasicdetails={userData}/>
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