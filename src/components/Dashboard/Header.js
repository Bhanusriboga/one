import React from 'react'
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink 
} from 'reactstrap';
import './Dashboard.scss'
import logo from '../../Assets/Logo.png'

const Header = () => {

  return (
    <Navbar className='navbck' light expand="md" >
      <div>
        <NavbarBrand href="/"><img src={logo} alt="logo"></img></NavbarBrand>
      </div>
      <Nav className="me-auto w-100 d-flex justify-content-end" navbar >
        <NavItem>
          <NavLink href="/payment" className='navBtn'>Pricing</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/components" className='navBtn'>Chat with Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/components" className='navBtn'>Contact Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login" className='navBtn'>Logout</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header