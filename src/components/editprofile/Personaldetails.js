import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';


const personaldetails = {
  "Religion": {
    "Caste": "xyzxyz",
    "Sub-Caste": "xyzxyz",
    "Gothra": "xyz",
    "Star": "xyz",
    "Zodiac Sign": "xyz",
    "About Dosham": "xyz"
  },
  "Family Information": {
    "Family Status": "xyzxyz",
    "Family Type": "xyzxyz",
    "Father Name": "xyz",
    "Father Occupation": "xyz",
    "Mother Name": "xyz",
    "Mother Occupation": "xyz",
    "Siblings": "1"
  },
  "Personal Information": {
    "Marital Status": "xyzxyz",
    "Complexion": "xyzxyz",
    "Any Disabilities": "11:55 PM",
    "Body Type": "xyzxyz",
    "Drinking Habits": "Never drink",
    "Eating Habits": "Non Veg",
    "Smoking Habits": "Never smoke",
    "Weight": "11",
    "Height": "11",
    "About me": <textarea type='text' className='textarea' />,
    
  }
};

const Personaldetails = () => {
  return (
    <Container>
      <div className='main-header mb-2'>
      <h2 className='main-heading '>{EditProfile.personaldetails}</h2>
      <button variant="danger" className="edit-btn ml-1">{EditProfile. edit}<span ><MdEdit className='edit-icon'/></span></button>
      </div>
      {Object.entries(personaldetails).map(([sectionTitle, sectionDetails]) => (
        <div key={sectionTitle}>
          <h3 className="sub-heading">{sectionTitle}</h3>
          <Row>
            {Object.entries(sectionDetails).map(([key, value], index) => (
              <Col md={6} key={index} className="mb-2">
                <Row>
                  <Col xs={6}><p className='keytext'>{key}:</p></Col>
                  <Col xs={6}><p className='valtext'>{value}</p></Col>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
      ))}
      <hr/>
    </Container>
  );
};

export default Personaldetails;

