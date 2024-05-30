import React,{useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { headerContent } from '../../utils/constants';
import { FaUserCircle } from "react-icons/fa";

const Header = props => {
    const [isOpen, setIsOpen]= useState(false)
    const toggle=()=> {
      setIsOpen(!isOpen)
        }
  return (
    <div>
    <Navbar color="secondary" light expand="md" >
        <div>
        <NavbarToggler onClick={toggle} />
      <NavbarBrand href="/">{headerContent.logo}</NavbarBrand>
      </div>

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">{headerContent.home}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">{headerContent.about}</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {headerContent.brides}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                {headerContent.firstb}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {headerContent.secondb}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {headerContent.grooms}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                {headerContent.firstg}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {headerContent.secondg}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
      <div className='userIcon'>
      <FaUserCircle size={30} />
      </div>
    </Navbar>
  </div>
  )
}

export default Header