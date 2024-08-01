import React from 'react'
import "./home.css"
import rings from "./assets/Rings 1.png"
import ringsframe from "./assets/Frame 39.png"
import PropTypes from 'prop-types'
function Choose(props) {
  const { width } = props
  return (
    <div data-testid="choose-component">
      <div className='choose d-flex justify-content-center align-items-center'>
        <div className='choose-us-cont d-flex flex-column justify-content-between h-100 align-items-center '>
          <p className='choose-us mt-5'>Why Choose Us ?</p>
          <p style={{ textAlign: "center", width: "90vw", fontWeight: '400',fontSize:"20px",zIndex:0}}>In the enchanting landscape of matrimony, we proudly stand as the beacon of excellence. Our dedication to creating meaningful connections, coupled with a personalized approach, sets us apart as the premier destination for those seeking lifelong companionship. Trust in us to navigate the path to your happily ever after, for in the realm of matrimony, we are simply the best.</p>
          <img src={ringsframe} className={width < 600 ? "d-none" : "d-block w-75 mt-5"} alt="Rings Frame"/>
          <div className={`d-flex position-relative ${width < 600 ? "d-block" : "d-none"}`} style={{ width: "90vw" }} >
            <div className='ring-con'>
              <img src={rings} style={{ width: "18vw" }}>
              </img>
              <p className='para-ring-1'>Trust Worthy</p>
            </div>
            <div className='ring-con'>
              <img src={rings} style={{ width: "18vw" }}>
              </img>
              <p className='para-ring-1'>Stake Holders</p>
            </div>
            <div className='ring-con'>
              <img src={rings} style={{ width: "18vw" }}>
              </img>
              <p className='para-ring '>Franchise</p>
            </div>
            <div className='ring-con'>
              <img src={rings} style={{ width: "18vw" }}>
              </img>
              <p className='para-ring '>Vendors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Choose.propTypes = {
  width: PropTypes.number.isRequired,
};


export default Choose