import React from 'react'
import Header from './Header'
import FooterBar from './FooterBar'
import PageContainer from './PageContainer'
import './Dashboard.scss'

const Dashboard = props => {
  return (
    <div className='h-100'>
      <div className='pageHeader'>
        <Header/>
      </div>
      <div className='pageContainer'>
        <PageContainer/>
      </div>
      <div className='fixed-bottom'>
        <FooterBar/>
      </div>

    </div>
  )
}

export default Dashboard