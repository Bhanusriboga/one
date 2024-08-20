
import React,{useState} from 'react'
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink 
} from 'reactstrap';
import './Dashboard.scss'
import logo from '../../Assets/icon.svg'
import UPIPayment from '../payment/Payment';
import { useDispatch } from 'react-redux';
import {logout as logoutAction} from '../../redux/slices/AuthSlice';
const Header = () => {
  const dispatch =useDispatch()
const [paymentPopup,setPaymentPopup]=useState(false);
const toggle=()=>setPaymentPopup(!paymentPopup)
const logout=async()=>{
  await dispatch(logoutAction());
}

  return (
    <Navbar className='navbck' light expand="md" >
      <div className='footer-logo navlogo'>
        <NavbarBrand href="/"><img src={logo} className='h-100 w-100 position-relative'></img></NavbarBrand>
      </div>
      <Nav className="me-auto  w-100 d-none d-md-flex justify-content-end" navbar>
        <NavItem>
          <NavLink onClick={toggle} className='navBtn'>Pricing</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/components" className='navBtn'>Chat with Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/components" className='navBtn'>Contact Us</NavLink>
        </NavItem> 
        <NavItem>
          <NavLink onClick={logout} className='navBtn'>Logout</NavLink>
        </NavItem>
      </Nav>
    <button onClick={toggle} className='border-0 bg-transparent'>
    {paymentPopup&&<UPIPayment/>}
    </button>
    </Navbar>
  )
}

export default Header