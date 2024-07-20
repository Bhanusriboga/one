import React from 'react'
import Header from './Header'
import FooterBar from './FooterBar'
import PageContainer from './PageContainer'
import './Dashboard.scss'
// import ComingSoon from '../ComingSoon/ComingSoon'

const Dashboard = () => {
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