import React from 'react'
import './Dashboard.scss'
import CustomSideBar from '../custom-side-bar/CustomSideBar'
const PageContainer = () => {
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