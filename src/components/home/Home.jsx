import React, { useEffect, useState,useRef } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import newlogos from "./assets/new_logo.svg"
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
  const bottomRef=useRef()
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
  const scrollToBottom=()=>{
        if(bottomRef.current){
          bottomRef.current.scrollIntoView({behaviour:"smooth"})
        }
         
  }
  return (
    <div className='home-page-div d-flex flex-column justify-content-between align-items-center w-100 ' >
<nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-blur' : ''}`} style={{ backgroundColor: '#780024' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={newlogos} className="nav-logo" alt="Company Logo" />
                </a>
               
                {burger?<AiOutlineClose className='close-icon mt-3'  onClick={() => setBurger(!burger)} />:<button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setBurger(!burger)}
                    aria-controls="navbarNav"
                    aria-expanded={burger ? 'true' : 'false'}
                    aria-label="Toggle navigation"
                >
                    <GiHamburgerMenu className='navbar-toggler-icon' />
                </button>}
                <div className={`collapse navbar-collapse ${burger ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); scrollToBottom(); }}>About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signUp">Signup</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                    </ul>
                </div>
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
 
        <div className='footer-1 mt-5 d-flex flex-column align-items-center justify-content-evenly' id="footer" ref={bottomRef}>
              <div className='first-footer d-flex flex-column justify-content-evenly align-items-center'>
              <div className='d-flex justify-content-center align-items-center'>
               <img src={chakra} className='chakra'/>
               <h4 className='footer-head'>Let&apos;s write our own love story together : Download Our App For Any Queries</h4>
               <img src={chakra} className='chakra'/>
              </div>
              <p className='footer-para'>Our platform is dedicated to helping you find a lifelong partner who shares your values, dreams, and aspirations.</p>
              <div className='download d-flex justify-content-between'>
               <img src={googleplay} className='appstore '/>
               <img src={appstore} className='appstore'/>
              </div>
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