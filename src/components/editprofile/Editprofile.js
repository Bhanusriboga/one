import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Basicdetails from './Basicdetails'
import Personaldetails from './Personaldetails'
import Professionaldetails from './Professionaldetails'
import Mediadetails from './Mediadetails'
import { FaArrowLeft } from "react-icons/fa6"
import { EditProfile } from '../../utils/constants'

import { useSelector } from 'react-redux'
 
const Editprofile = () => {
  const { Mydata } = useSelector(state => state.auth)
  const [userData, setUserData] = useState()

  useEffect(()=>{
    console.log(Mydata.object,"testing")
    setUserData(Mydata.object)
  },[Mydata])
  const history = useHistory();
  return (
    <div> 
      <div className='editprofile-tittle mb-2 mt-3 d-flex '>
      <FaArrowLeft className='leftarrow' onClick={()=>history.goBack()}/>
        <h1>{EditProfile.editprofile}</h1>
      </div>
      <div className='edit-details'>
    <Basicdetails userbasicdetails={userData}/>
    <Personaldetails/>
    <Professionaldetails/>
    <Mediadetails/>
    </div>
    </div>
  )
}


export default Editprofile