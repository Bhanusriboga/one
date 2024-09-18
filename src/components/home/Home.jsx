import React, { useState, useRef } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import logo from '../../Assets/icon.svg'
import { useHistory } from "react-router-dom";
import "./home.css"
import FooterBar from "../Dashboard/FooterBar"
import HomePageContainer from './HomePageContainer/HomePageContainer';
import  googleplay from "./assets/googleplay.svg"
import appstore from "./assets/apple.svg";
// import chakra from "./assets/chakraa.svg"
function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const bottomRef = useRef()

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behaviour: "smooth" })
    }
  }
  
  const handleNavigate = (type) => {
    history.push(`/${type}`)
  }

  return (
    <div className='h-100 w-100 pgback'>
      <div className='pageHeader'>
        <Navbar className='navbck' dark expand="md">
          <div className='footer-logo navlogo'>
            <NavbarBrand href="/"><img src={logo} className='h-100 w-100 position-relative'></img></NavbarBrand>
          </div>
          <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="m-auto  w-100 d-md-flex justify-content-end" navbar>
              <NavItem>
                <NavLink href="#" onClick={(e) => { e.preventDefault(); scrollToBottom(); setIsOpen(!isOpen) }}>About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={(e) => { e.preventDefault(); handleNavigate('signUp'); setIsOpen(!isOpen) }}>Signup</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={(e) => { e.preventDefault(); handleNavigate('login'); setIsOpen(!isOpen) }}>Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

      </div>
      <div className='pageContainer  conwidth'>
        <div className='homeBack'>
          <HomePageContainer></HomePageContainer>
        </div>
        <div className='footer-1 d-flex flex-column align-items-center justify-content-evenly subfooterBack' id="footer" ref={bottomRef}>
              <div className='first-footer mt-5 d-flex flex-column justify-content-evenly w-100 align-items-center'>
              <div className='d-flex justify-content-center align-items-center w-100 mb-5 text-center'>
               <h4 className='footer-head'>Let&apos;s write our own love story together : Download Our App For Any Queries</h4>
              </div>
              <p className='footer-para text-center'>Our platform is dedicated to helping you find a lifelong partner who shares your values, dreams, and aspirations.</p>
              <div className='download d-flex justify-content-between'>
               <img src={googleplay} className='appstore '/>
               <img src={appstore} className='appstore'/>
              </div>
              </div>
              {/* <hr className="hor-line w-100"/> */}
              </div>

        <div className='pageFooter'>
          <FooterBar ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
export default Home