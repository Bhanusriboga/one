import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";

import Settings from '../settings/Settings';
import IgnoreUsers from '../ignoreUsers/IgnoreUsers';
import ShortListedUsers from '../shortlistedUsers/ShortListedUsers';
import ProfileList from '../Dashboard/ProfileList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomSideBar.scss';
import Editprofile from '../editprofile/Editprofile';
import AddPreferences from '../AddPreferences/AddPreference';
import { useDispatch } from 'react-redux';
import {logout as logoutAction} from "../../redux/slices/AuthSlice";
import CustomWidget from '../ChatBot/CustomWidget';
import Userprofile from '../UserProfile/Userprofile';
const CustomSideBar = () => {
  const [activeContent, setActiveContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch=useDispatch() ;
  const logout = async() => {
    await dispatch(logoutAction());
   };

  const buttonData = [
    { id: 'editProfile', label: 'Edit Profile' },
    { id: 'addPreferences', label: 'Add Preferences' },
    { id: 'ignoredUsers', label: 'Ignored Users' },
    { id: 'shortlisted', label: 'Shortlisted' },
    { id: 'settings', label: 'Settings' },
    { id: 'singleUser', label: '' },
  ];

  // Buttons to show only on small screens
  const extraButtons = [
    { id: 'Pricing', label: 'Pricing' },
    { id: 'Chat with Us', label: 'Chat with Us' },
    { id: 'Contact Us', label: 'Contact Us' },
    // { id: 'Logout', label: 'Logout' }
  ];

  const RenderContent = () => {
    switch (activeContent) {
      case 'addPreferences':
        return <AddPreferences />;
      case 'editProfile':
        return <Editprofile />
      case 'ignoredUsers':
        return <IgnoreUsers setActiveContent={setActiveContent}/>;
      case 'shortlisted':
        return <ShortListedUsers setActiveContent={setActiveContent}/>
      case 'settings':
        return <Settings setActiveContent={setActiveContent}/>;
      case 'singleUser':
        return <Userprofile setActiveContent={setActiveContent}/>
      default:
        return <ProfileList setActiveContent={setActiveContent}/>
    }
  };

  return (
    <>
    <Container fluid className='outer-container mt-4 mb-4'>
      <Row className='w-100'>
        <Col xs="12" className="d-flex flex-row justify-content-between d-md-none">
          <Button className="bg-transparent border-0" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <RxCross2 size={30} color='#780024' /> : <FaBarsStaggered size={30} color='#780024' />}
          </Button>
          <div className='image-container'>
            <div className='position-absolute bottom-0 end-0 bg-white d-flex align-items-center justify-content-center rounded-circle p-1'>
              <MdEdit />
            </div>
          </div>
        </Col>
        <Col xs={isSidebarOpen?"12":"3"} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className='image-container1'>
            <Button className='d-flex align-items-center justify-content-center border-0 position-absolute bottom-0 gap-1 add'>
              Add
               <MdEdit size={'15px'} className='mt-1'/>
            </Button>
          </div>
          {buttonData.map((button, index) => (
            index==buttonData.length-1?null:
            <div key={button.id} className='button-parent'>
              <Button block="true" className="bg-transparent border-0 text-color" onClick={() => setActiveContent(button.id)}>
                {button.label}
              </Button> 
              {index !== buttonData.length - 2 && <hr className='hr' />}
            </div>
          ))}
          {/* Render small screen navigation buttons after the sidebar content */}
          <div className="w-100 d-block d-md-none justify-content-end sidebar-nav">
          <hr className='hr' />
      {extraButtons.map((button, index) => (
        <React.Fragment key={button.id}>
          <div className='button-parent'>
            <Button block className="bg-transparent border-0 text-color" onClick={() => setActiveContent(button.id)}>
              {button.label}
            </Button>
            {index !== extraButtons.length - 1 && <hr className='hr' />}
          </div>
        </React.Fragment>
      ))}
      <div className='button-parent'>
      <hr className='hr' />
        <Button block className="text-color" onClick={logout} >
          Logout
        </Button>
      </div>
    </div>


        </Col>
        <Col xs="12" md="9" className="content ml-4 pt-0" data-testid="content">
          {activeContent !== '' ? <button onClick={() => setActiveContent('')} className='back-button bg-white gap-1'>
            <FaArrowLeft color='#B8B8B8' size={15} className='mt-1' />
            <span className='text-lightBlack'>
              Back
            </span>
          </button> : null}
          <RenderContent />
        </Col>
      </Row>
    </Container>
    <CustomWidget />
    </>
  );
};

export default CustomSideBar;
