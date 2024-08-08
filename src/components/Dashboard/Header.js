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
import { useDispatch } from 'react-redux';
import {logout as logoutAction} from "../../redux/slices/AuthSlice";
const Header = () => {
  const dispatch=useDispatch() ;

  const logout = async() => {
    await dispatch(logoutAction());
   };

  return (
    <Navbar className='navbck' light expand="md" >
      <div>
        <NavbarBrand href="/"><img src={logo} alt="logo"></img></NavbarBrand>
      </div>
      <Nav className="me-auto  w-100 d-none d-md-flex justify-content-end" navbar>
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
          <NavLink href="/login" onClick={logout} className='navBtn'>Logout</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header