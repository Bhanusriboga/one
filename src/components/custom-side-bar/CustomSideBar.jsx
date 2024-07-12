import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomSideBar.scss';
import Settings from '../settings/Settings';
import IgnoreUsers from '../ignoreUsers/IgnoreUsers';
import ShortListedUsers from '../shortlistedUsers/ShortListedUsers';

const CustomSideBar = () => {
  const [activeContent, setActiveContent] = useState('userImage');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const buttonData = [
    { id: 'editImage', label: 'Edit Image' },
    { id: 'addPreferences', label: 'Add Preferences' },
    { id: 'editProfile', label: 'Edit Profile' },
    { id: 'ignoredUsers', label: 'Ignored Users' },
    { id: 'shortlisted', label: 'Shortlisted' },
    { id: 'settings', label: 'Settings' },
  ];

  const RenderContent = () => {
    // Replace all the items with component which we going to develop
    switch (activeContent) {
      case 'editImage':
        return <div>Edit Image Content</div>;
      case 'addPreferences':
        return <div>Add Preferences Content</div>;
      case 'editProfile':
        return <div>Edit Profile Content</div>;
      case 'ignoredUsers':
        return <IgnoreUsers/>;
      case 'shortlisted':
        return <ShortListedUsers />
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className='outer-container'>
      <Row className='row'>
        <Col xs="12" className="d-flex flex-row justify-content-between d-md-none">
          <Button className="bg-transparent border-0" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <RxCross2 size={30} color='#780024' /> : <FaBarsStaggered size={30} color='#780024' />}
          </Button>
          <div className='image-container'>
               <MdEdit className='add'/>
          </div>
        </Col>
        <Col xs="12" md="3" className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className='image-container1'>
            <Button className='d-flex align-item-center justify-content-center border-0 position-absolute bottom-0 add'>
              Add
               <MdEdit size={'10px'} className='mt-1'/>
            </Button>
          </div>
          {buttonData.map((button, index) => (
            <div key={button.id} className='button-parent'>
              <Button block="true" className="bg-transparent border-0 text-warning" onClick={() => setActiveContent(button.id)}>
                {button.label}
              </Button>
              {index !== buttonData.length - 1 && <hr className='hr' />}
            </div>
          ))}
        </Col>
        <Col xs="12" md="9" data-testid="content">
          <RenderContent/>
        </Col>  
      </Row>
    </Container>
  );
};

export default CustomSideBar;
