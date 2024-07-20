import React from 'react'
import ProfileList from './ProfileList'
import './Dashboard.scss'
import Filters from './filters'
import CustomSideBar from '../custom-side-bar/CustomSideBar'
const PageContainer = props => {
  return (
    <div className='dashbcg'>
      <div className='d-flex justify-content-center'>
        <div className='w-100'>
        <CustomSideBar/>
        </div>
      </div>
    </div>
  )
}

export default PageContainer