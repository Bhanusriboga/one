import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomSideBar.css';
import Settings from '../settings/Settings';
import ProfileList from '../Dashboard/ProfileList';
const CustomSideBar = () => {
  const [activeContent, setActiveContent] = useState('');

  const buttonData = [
    { id: 'editImage', label: 'Edit Image' },
    { id: 'addPreferences', label: 'Add Preferences' },
    { id: 'editProfile', label: 'Edit Profile' },
    { id: 'ignoredUsers', label: 'Ignored Users' },
    { id: 'shortlisted', label: 'Shortlisted' },
    { id: 'settings', label: 'Settings' },
  ];

  const RenderContent = () => {
    //replace all the items with component which we going to develop
    switch (activeContent) {  
      case 'editImage':
        return <div>Edit Image Content</div>;
      case 'addPreferences':
        return <div>Add Preferences Content</div>;
      case 'editProfile':
        return <div>Edit Profile Content</div>;
      case 'ignoredUsers':
        return <div>Ignored Users Content</div>;
      case 'shortlisted':
        return <div>Shortlisted Content</div>;
      case 'settings':
        return <Settings />;
      default:
        return <ProfileList />
    }
  };

  return (
    <>
    <Container fluid className='outer-container mt-4'>
      <Row>
        <Col xs="3" className="sidebar">
        <div className='image-container'>
          <Button className='add'>
            Add
            <i class="fa-solid fa-pen" color='#fff'></i>
          </Button>
        </div>
          {buttonData.map((button,index) => (
            <div key={button.id} className='button-parent'>
            <button block className="sidebar-button" onClick={() => setActiveContent(button.id)} >
              {button.label}
            </button>
           {index!==buttonData.length-1 && <hr className='hr'/>}
            </div>
          ))}
        </Col>
        <Col xs="9" className="content ml-4" data-testid="content">
        {activeContent !== ''?<button onClick={() => setActiveContent('')}>back</button>:null}
          <RenderContent/>
        </Col>  
      </Row>
    </Container>
 
    </>
  );
};

export default CustomSideBar;


