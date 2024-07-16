import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Details.css";
import { MdEdit } from "react-icons/md";
import { EditProfile } from "../../utils/constants";

const initialdetails = {
 " Date of Birth ": "xyzxyz",
  " Place of Birth ": "xyzxyzk",
  "Time of Birth  ": "xyz",
 " Mother Tongue ": "xyz",
  "Religion ": "xyz",
  "Citizenship ": "xyz",
  " Language Proficiency": "xyz",
  "Instagram id": "xyz",
  "LinkedIn id": "xyz",
};

const basicdetails = {
  "Address": {
    "Door no&Street Name": "xyzxyz",
    "City": "xyzxyz",
    "State ": "xyz",
    " Country ": "xyz",
    "Postal code ": "xyz",
  }
};
const Basicdetails = () => {
  return (
    <Container >
      <div className="basic-main-heading1 mt-5 ">
        <h2 className="main-heading">{EditProfile.basicdetails}</h2>
        <button variant="danger" className="edit-btn ">
        {EditProfile. edit}<MdEdit className='edit-icon'/>
        </button>
      </div>
      <Row>
        {Object.entries(initialdetails).map(([key, value], index) => (
          <Col md={6} key={index} className="mb-2">
            <Row>
              <Col xs={6}><p className="keytext">{key}:</p></Col>
              <Col xs={6}><p className="valtext">{value}</p></Col>
             </Row>
          </Col>
        ))}
      </Row>
      {Object.entries(basicdetails).map(([sectionTitle, sectionDetails]) => (
        <div key={sectionTitle}>
          <h3 className="sub-heading">{sectionTitle}</h3>
          <Row>
            {Object.entries(sectionDetails).map(([key, value], index) => (
              <Col md={6} key={index} className="mb-2">
                <Row>
                  <Col xs={6}>
                    <p className="keytext">{key}:</p>
                  </Col>
                  <Col xs={6}>
                    <p className="valtext">{value}</p>
                  </Col>
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

export default Basicdetails;
