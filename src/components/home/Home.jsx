import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "./assets/logo.svg"
import "./home.css"
import sidehalfimg from "./assets/side-half-img.png"
import exploreright from "./assets/explore-right.svg"
import lefthalfimg from "./assets/left-half-img.png"
import Couple from './Couple'
import Choose from './choose'
import Explore from './Explore';
import rightcircle from "./assets/right-circle.png"
import Endorse from './Endorse';
import rightchakra from "./assets/right-chakra.png"
import Destination from './Destination';
import  googleplay from "./assets/googleplay.svg"
import appstore from "./assets/apple.svg";
import chakra from "./assets/chakraa.svg"
import FooterBar from "../Dashboard/FooterBar"

 
function Home() {
  const [burger,setBurger]=useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      }
      else {
        setScrolled(false)
      }
    })
  }, [])
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  return (
    <div className='home-page-div d-flex flex-column justify-content-between align-items-center w-100 ' >
      <nav className={` navbar-expand-lg navbar-expand-md ${!burger&&"d-flex align-items-center justify-content-between "} custom-navBar fixed-top ${scrolled && "navbar-blur"}`}>
        <img src={logo} className='nav-logo' alt="Company Logo" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <GiHamburgerMenu onClick={()=>setBurger(!burger)} className='burger-icon'/>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav" >
          <ul className="navbar-nav collapse-nav"> 
            <li className="nav-item">
              <a className="nav-link" href="#">About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signUp">Signup</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
          </ul>
        </div>
 
      </nav>
      <div className='content11 d-flex flex-column justify-content-center align-items-center'>
        <Couple />
        <Choose width={width} />
        <img src={sidehalfimg} className='side-choose' />
        <div style={{ alignSelf: "flex-start", justifySelf: "flex-end" }}>
          <img src={lefthalfimg} className='leftexplore' />
        </div>
        <img src={rightcircle} className="position-absolute right-circle"/>
        <Explore width={width} />
        <img src={exploreright} className='exploreRight' />
        <Endorse />
        <img src={rightchakra} className='position-absolute right-chakra'/>
        <Destination />

        <div className='footer-1 d-flex flex-column align-items-center justify-content-evenly'>
              <div className='d-flex justify-content-center align-items-center'>
               <img src={chakra} className='chakra'/>
               <h4 className='footer-head'>Let&apos;s write our own love story together : Download Our App For Any Queries</h4>
               <img src={chakra} className='chakra'/>
              </div>
              <p className='footer-para'>Our platform is dedicated to helping you find a lifelong partner who shares your values, dreams, and aspirations.</p>
              <div className='download'>
               <img src={googleplay} className='appstore'/>
               <img src={appstore} className='bg-white appstore'/>
          </div>
          <hr className="hor-line"/>
          <div className='pageFooter'>
            <FooterBar />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home