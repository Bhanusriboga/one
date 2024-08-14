import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';

const initialDetails = {
  "Highest Education": "B.Tech",
  "Year Of Passing": "2222",
  "Name Of the Institute": "abcdefgk",
  "Occupation": "Business Owner",
  "Employment Status": "Full Time",
  "Employed in": "yxzxyz",
  "Work Location": "India",
  "State": "yhhhhhhh",
  "City": "Xyz"
};

const educationOptions = ["PhD", "Masters", "Bachelors", "Others"];
const occupationOptions = [
  "Business Owner",
  "Celebrity",
  "Self Employed",
  "Government Employee",
  "Corporate Employee",
  "Unemployed",
  "Others",
];
const employmentStatusOptions = ["Full Time", "Part Time", "Contract"];

const ProfessionalDetails = () => {
  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const leftColumnKeys = [
    "Highest Education",
    "Name Of the Institute",
    "Employment Status",
    "Work Location",
    "City"
  ];

  const rightColumnKeys = [
    "Year Of Passing",
    "Occupation",
    "Employed in",
    "State"
  ];

  const handleEdit = () => {
    if (isEditing) {
      const newErrors = {};
      Object.keys(details).forEach((key) => {
        if (key === "Year Of Passing" && !/^\d{4}$/.test(details[key])) {
          newErrors[key] = "Year Of Passing must be a 4-digit number";
        } else if (!details[key]) {
          newErrors[key] = `${key} is required`;
        }
      });
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e, key) => {
    const value = e.target.value;
    console.log(`Changing ${key} to ${value}`);
    
    if (key === "Year Of Passing" && !/^\d{0,4}$/.test(value)) {
      return;
    }
    setDetails(prevDetails => ({ ...prevDetails, [key]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [key]: '' }));
  };

  return (
    <Container className='main'>
      <div className='main-head-1'>
        <h2 className='main-heading'>{EditProfile.professionaldetails}</h2>
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? <>Save</> : <>
            {EditProfile.edit}
            <MdEdit className='edit-icon' />
          </>}
        </button>
      </div>
      <Row>
        <Col md={6}>
          {leftColumnKeys.map((key, index) => (
            <Row key={index} className="mb-2">
              <Col xs={6}><p className='keytext '>{key}:</p></Col>
              <Col xs={6}>
                {isEditing ? (
                  key === "Highest Education" ? (
                    <Form.Control
                      as="select"
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    >
                      {educationOptions.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </Form.Control>
                  ) : key === "Occupation" ? (
                    <Form.Control
                      as="select"
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    >
                      {occupationOptions.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </Form.Control>
                  ) : key === "Employment Status" ? (
                    <Form.Control
                      as="select"
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    >
                      {employmentStatusOptions.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </Form.Control>
                  ) : (
                    <input
                      type="text"
                      className='form-control'
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  )
                ) : (
                  <p className='valtext'>{details[key]}</p>
                )}
                {errors[key] && <p className="error-text">{errors[key]}</p>}
              </Col>
            </Row>
          ))}
        </Col>
        <Col md={6}>
          {rightColumnKeys.map((key, index) => (
            <Row key={index} className="mb-2">
              <Col xs={6}><p className='keytext'>{key}:</p></Col>
              <Col xs={6}>
                {isEditing ? (
                  key === "Year Of Passing" ? (
                    <input
                      type="text"
                      className='form-control'
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                      maxLength="4"
                    />
                  ) : (
                    <input
                      type="text"
                      className='form-control'
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  )
                ) : (
                  <p className='valtext'>{details[key]}</p>
                )}
                {errors[key] && <p className="error-text">{errors[key]}</p>}
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default ProfessionalDetails;
