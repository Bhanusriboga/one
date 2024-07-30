import React from 'react'
import "./home.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import coupleimg from "./assets/Rectangle 4110.svg"
import Lottie from "react-lottie"
import animation from "./assets/Animation - 1720516602656.json"
function Couple() {
  const navigator = useHistory()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div>
      <div className='couple-container d-flex justify-content-center align-items-center position-relative mt-2'>
          <div className='col1 d-flex flex-column justify-content-start align-items-start'>
            <h4 className='top-para'>Discover the <span className='font-weight-bold'>Magic of True Connection </span></h4>
            <p className='top-para-para mt-2'>With a blend of modern technology and timeless matchmaking expertise, we&apos;re dedicated to crafting love stories that transcend distance, culture, and background. </p>
            <div className='engage-btn mt-4  d-flex justify-content-center align-items-center' onClick={() => navigator.push("/signup")} >
              Engage 
              <span><Lottie className="animate" options={defaultOptions}
                height={40}
                width={40} /></span> </div>
          </div> 
           <div className="img-container">
          <img src={coupleimg} className='couple-img' />
          </div>
      </div>
    </div>
  )
}

export default Couple