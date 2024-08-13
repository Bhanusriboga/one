import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './Header'
import FooterBar from './FooterBar'
import PageContainer from './PageContainer'
import { fetchUserInfo } from '../../redux/slices/AuthSlice'
import './Dashboard.scss'
import { getIgnoredUsers, getShortListedUsers } from '../../redux/slices/users'
// import ComingSoon from '../ComingSoon/ComingSoon'

const Dashboard = () => {
  const dispatch=useDispatch()
  const getUSerInfo=async()=>{
    await dispatch(fetchUserInfo())
    await dispatch(getIgnoredUsers())
    await dispatch(getShortListedUsers())
   }
  useEffect(() => {
    getUSerInfo()
  },[])

  return (
    <div className='h-100 w-100 pgback'>
      <div className='pageHeader'>
        <Header/>
      </div>
      <div className='pageContainer conwidth'>
        {/* <ComingSoon/> */}
        <PageContainer/>
        <div className='pageFooter'>
        <FooterBar/>
      </div>
      </div>


    </div>
  )
}

export default Dashboard