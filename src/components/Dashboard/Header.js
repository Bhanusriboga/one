import React,{useState} from 'react'
import {
  Navbar,
  NavbarBrand } from 'reactstrap';
import './Dashboard.scss'
import logo from '../../Assets/Logo.png'

const Header = props => {

  return (
    <Navbar className='navbck' light expand="md" >
      <div>
        <NavbarBrand href="/"><img src={logo}></img></NavbarBrand>
      </div>
    </Navbar>
  )
}

export default Header