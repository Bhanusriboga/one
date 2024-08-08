import React from 'react'
import './Dashboard.scss'
import CustomSideBar from '../custom-side-bar/CustomSideBar'
const PageContainer = () => {
  return (
    <div className='dashbcg' data-testid='page-container'>
      <div className='d-flex justify-content-center' data-testid='child-div'>
        <div className='w-100'>
        <CustomSideBar/>
        </div>
      </div>
    </div>
  )
}

export default PageContainer