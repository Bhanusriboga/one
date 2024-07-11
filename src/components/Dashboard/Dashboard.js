import React from 'react'
import Header from './Header'
import FooterBar from './FooterBar'
import PageContainer from './PageContainer'
import './Dashboard.scss'

const Dashboard = props => {
  return (
    <div className='h-100 w-100 pgback'>
      <div className='pageHeader fixed-top'>
        <Header/>
      </div>
      <div className='pageContainer conwidth'>
        <PageContainer/>
      </div>
      <div className='fixed-bottom'>
        <FooterBar/>
      </div>

    </div>
  )
}

export default Dashboard