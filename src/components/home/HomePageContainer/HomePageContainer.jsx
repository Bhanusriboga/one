import React from 'react'
import CoupleData from './CoupleData'
import ChooseUs from './ChooseUs'
import ExploreProfiles from './ExploreProfiles'
import Endorsements from './Endorsements'
import '../home.css'
const HomePageContainer = () => {
  return (
    <div className='flowerBackground'>
      <CoupleData/>
      <ChooseUs/>
      <ExploreProfiles/>
      <Endorsements/>
    </div>
  )
}

export default HomePageContainer