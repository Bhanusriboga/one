import React from 'react'
import ProfileList from './ProfileList'
import './Dashboard.scss'
const PageContainer = props => {
  return (
    <div className='dashbcg'>
      <div className='d-flex justify-content-center'>
        {/* <div className='w-25'>testing jgfjhdsgfjgsjdfjsgdfjgsj</div> */}
        <div className='d-flex flex-column'>
          <div> Welcome to YUKTHI!</div>
          <ProfileList></ProfileList>
        </div>
      </div>
    </div>
  )
}

export default PageContainer