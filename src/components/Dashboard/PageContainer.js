import React from 'react'
import ProfileList from './ProfileList'
import './Dashboard.scss'
import Filters from './filters'
const PageContainer = props => {
  return (
    <div className='dashbcg mt-4'>
      <div className='d-flex justify-content-center'>
        <div className='w-50'></div>
        <div className='d-flex flex-column mt-4'>
          <div className="mt-4">
          <Filters/>
          <div> Welcome to YUKTHI!</div>
          <ProfileList></ProfileList>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PageContainer