
import React,{useState} from 'react'
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink 
} from 'reactstrap';
import './Dashboard.scss'
import PropTypes from 'prop-types';
import logo from '../../Assets/icon.svg'
import UPIPayment from '../payment/Payment';
import { useDispatch } from 'react-redux';
import {logout as logoutAction} from '../../redux/slices/AuthSlice';
import { setIsOpen } from '../../redux/slices/users';
import {useHistory} from "react-router-dom"
const Header = (props) => {
  const dispatch =useDispatch()
const [paymentPopup,setPaymentPopup]=useState(false);
const toggle=()=>setPaymentPopup(!paymentPopup);
const history=useHistory();
  const chatBoxOpen = () => {
    dispatch(setIsOpen(true));
  };
const logout=async()=>{
  await dispatch(logoutAction());
}
const navToMainPage=()=>{
  history.push('/')
}
  return (
    <Navbar className='navbck' light expand="md" >
      <div className='footer-logo navlogo'>
        <button className='border-0 bg-transparent h-100' onClick={navToMainPage}>
        <NavbarBrand ><img src={logo} className='h-100 w-100 position-relative' alt="Logo" /></NavbarBrand>
        </button>
      </div>
      <Nav className="me-auto  w-100 d-none d-md-flex justify-content-end" navbar>
        <NavItem>
          <NavLink onClick={toggle} className='navBtn'>Pricing</NavLink>
        </NavItem>
        <button onClick={chatBoxOpen} className='border-0 bg-transparent'>
          <NavLink className='navBtn'>Chat with Us</NavLink>
        </button>
        <button onClick={props.scrollToBottom} className='border-0 bg-transparent'>
          <NavLink className='navBtn'>Contact Us</NavLink>
        </button>
        <NavItem>
          <NavLink onClick={logout} className='navBtn'>Logout</NavLink>
        </NavItem>
      </Nav>
    <div className='border-0 bg-transparent'>
    {paymentPopup&&<UPIPayment closePayment={toggle}/>}
    </div>
    </Navbar>
  )
}

Header.propTypes = {
  scrollToBottom: PropTypes.func.isRequired,
};
export default Header