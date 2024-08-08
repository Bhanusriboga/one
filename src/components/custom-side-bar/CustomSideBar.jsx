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
const CustomSideBar = () => {
  const [activeContent, setActiveContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const buttonData = [
    { id: 'editProfile', label: 'Edit Profile' },
    { id: 'addPreferences', label: 'Add Preferences' },
    { id: 'ignoredUsers', label: 'Ignored Users' },
    { id: 'shortlisted', label: 'Shortlisted' },
    { id: 'settings', label: 'Settings' },
  ];

  const RenderContent = () => {
    // Replace all the items with component which we going to develop
    switch (activeContent) {
      case 'addPreferences':
        return <AddPreferences />;
      case 'editProfile':
        return <Editprofile />
      case 'ignoredUsers':
        return <IgnoreUsers/>;
      case 'shortlisted':
        return <ShortListedUsers />
      case 'settings':
        return <Settings setActiveContent={setActiveContent}/>;
      default:
        return <ProfileList />
    }
  };

  return (
    <Container fluid className='outer-container mt-4'>
      <Row className='row'>
        <Col xs="12" className="d-flex flex-row justify-content-between d-md-none">
          <Button className="bg-transparent border-0" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <RxCross2 size={30} color='#780024' /> : <FaBarsStaggered size={30} color='#780024' />}
          </Button>
          <div className='image-container'>
            <div className='position-absolute bottom-0 end-0 bg-white d-flex align-item-center justify-content-center rounded-circle p-1'>
               <MdEdit />
            </div>
          </div>
        </Col>
        <Col xs={isSidebarOpen?"12":"3"} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className='image-container1'>
            <Button className='d-flex align-item-center justify-content-center border-0 position-absolute bottom-0 gap-1 add'>
              Add
               <MdEdit size={'15px'} className='mt-1'/>
            </Button>
          </div>
          {buttonData.map((button, index) => (
            <div key={button.id} className='button-parent'>
              <Button block="true" className="bg-transparent border-0 text-color" onClick={() => setActiveContent(button.id)}>
                {button.label}
              </Button> 
              {index !== buttonData.length - 1 && <hr className='hr' />}
            </div>
          ))}
        </Col>
        <Col xs="12" md="9" className="content ml-4 pt-0" data-testid="content">
          {activeContent !== '' ? <button onClick={() => setActiveContent('')} className='back-button bg-white gap-1'>
            <FaArrowLeft color='#B8B8B8' size={15} className=',t-1' />
            <span className='text-lightBlack'>
              Back
            </span>
          </button> : null}
          <RenderContent />
        </Col>  
      </Row>
    </Container>
  );
};

export default CustomSideBar;
