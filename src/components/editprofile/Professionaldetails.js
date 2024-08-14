
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { updateprofesionaldetails } from '../../redux/slices/users';


const initialDetails = {
  "Highest Education": "B.Tech",
  "Year Of Passing": "2222",
  "Name Of the Institute": "abcdefgk",
  "Occupation": "xyz",
  "Employment Status": "xyz",
  "Employed in": "yxzxyz",
  "Work Location": "India",
  "State": "yhhhhhhh",
  "City": "Xyz"
};

const ProfessionalDetails = () => {
  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
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

  const handleEdit = async() => {
    if (isEditing) {
      const newErrors = {};
      Object.keys(details).forEach((key) => {
        if (!details[key]) {
          newErrors[key] = `${key} is required`;
        }
      });
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const payload={
          "highestEducation": details['Highest Education'],
          "yearOfPassOut": details['Year Of Passing'],
          "nameOfInstitute": details['Name Of the Institute'],
          "occupation": details.Occupation,
          "employmentStatus": details['Employment Status'],
          "employedIn": details['Employed in'],
          "workLocation": details['Work Location'],
          "state": details.State,
          "city": details.City,
          "annualIncome": details['Employed in']
        }
        const editresponse= await dispatch(updateprofesionaldetails(payload));
        console.log(editresponse, 'editresponse')
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e, key) => {
    setDetails({ ...details, [key]: e.target.value });
    setErrors({ ...errors, [key]: '' });
  };

  return (
    <Container className='main'>
      <div className='main-head-1'>
        <h2 className='main-heading'>{EditProfile.professionaldetails}</h2>
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ?<>Save</>  :
          <> 
          {EditProfile.edit} 
          <MdEdit className='edit-icon' />
            </> }
        </button>
      </div>
      <Row>
        <Col md={6}>
          {leftColumnKeys.map((key, index) => (
            <Row key={index} className="mb-2">
              <Col xs={6}><p className='keytext'>{key}:</p></Col>
              <Col xs={6}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className='form-control'
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                    {errors[key] && <p className="error-text">{errors[key]}</p>}
                  </>
                ) : (
                  <p className='valtext'>{details[key]}</p>
                )}
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
                  <>
                    <input
                      type="text"
                      className='form-control'
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                    {errors[key] && <p className="error-text">{errors[key]}</p>}
                  </>
                ) : (
                  <p className='valtext'>{details[key]}</p>
                )}
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

