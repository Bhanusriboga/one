import React, { useEffect, useState } from 'react'
import logo from "./assets/Logo01 1.svg"
import "./home.css"
import sidehalfimg from "./assets/394317-PCMJUW-273-Photoroom 9.png"
import exploreright from "./assets/394317-PCMJUW-273-Photoroom 5.svg"
import lefthalfimg from "./assets/394317-PCMJUW-273-Photoroom 10.png"
import Couple from './Couple'
import Choose from './choose'
import Explore from './Explore';
import rightcircle from "./assets/394317-PCMJUW-273-Photoroom 9 (2).png"
import Endorse from './Endorse';
import rightchakra from "./assets/011 3.png"
import Destination from './Destination';
 
function Home() {
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
    <div className='home-page-div d-flex flex-column justify-content-space-between align-items-center w-100 ' >
      <nav className={`custom-nav navbar-expand-lg fixed-top ${scrolled && "navbar-blur"}`}>
        <img src={logo} className='nav-logo' alt="Company Logo" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-cont" id="navbarNav" >
          <ul className="navbar-nav ml-auto mr-5">
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
      </div>
    </div>
  )
}
export default Home