import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateprofesionaldetails, getprofesionaldetails } from '../../redux/slices/users';


const initialDetails = {
  "Highest Education": "",
  "Year Of Passing": "",
  "Name Of the Institute": "",
  "Occupation": "",
  "Employment Status": "",
  "Employed in": "",
  "Work Location": "",
  "State": "",
  "City": ""
};

const educationOptions = ["Select", "PhD", "Masters", "Bachelors", "Others"];
const occupationOptions = [
  "Select",
  "Business Owner",
  "Celebrity",
  "Self Employed",
  "Government Employee",
  "Corporate Employee",
  "Unemployed",
  "Others",
];

const employmentStatusOptions = [{label:"Select",value:"Select"},{ label:"Full Time", value: "FullTime" },{ label:"Part Time", value: "PartTime" }, {label:"Contract",value:"Contract"}];

const ProfessionalDetails = () => {
  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { profesionalDetails } = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getprofesionaldetails());
  }, [])
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
  useEffect(() => {
    if(profesionalDetails){
    setDetails({
      "Highest Education": profesionalDetails?.highestEducation,
      "Year Of Passing": profesionalDetails?.yearOfPassOut,
      "Name Of the Institute": profesionalDetails?.nameOfInstitute,
      "Occupation": profesionalDetails?.occupation,
      "Employment Status": profesionalDetails?.employmentType,
      "Employed in": profesionalDetails?.employedIn,
      "Work Location": profesionalDetails?.workLocation,
      "State": profesionalDetails?.state,
      "City": profesionalDetails?.city
    })
  }
  }, [profesionalDetails])
  const handleEdit = async () => {
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
        const payload = {
          "highestEducation": details['Highest Education'],
          "yearOfPassOut": details['Year Of Passing'],
          "nameOfInstitute": details['Name Of the Institute'],
          "occupation": details.Occupation,
          "employmentType": details['Employment Status'],
          "employedIn": details['Employed in'],
          "workLocation": details['Work Location'],
          "state": details.State,
          "city": details.City,
          "annualIncome": '123234'
        }
        const editresponse = await dispatch(updateprofesionaldetails(payload));
        console.log(editresponse, 'editresponse')
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
          {isEditing ? <>Save</> :
            <>
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
                      value={details[key] || ""}
                      onChange={(e) => handleChange(e, key)}
                    >
                      <option hidden disabled value=''>Select</option>
                      {educationOptions.map((option, i) => (
                        <option key={i} disabled={i == 0} value={option}>{option}</option>
                      ))}
                    </Form.Control>
                  ) : key === "Employment Status" ? (
                    <Form.Control
                      as="select"
                      value={details[key] || ""}
                      onChange={(e) => handleChange(e, key)}
                    >
                      <option hidden disabled value=''>Select</option>
                      {employmentStatusOptions.map((option, i) => (
                        <option key={i} disabled={i == 0} value={option.value}>{option.label}</option>
                      ))}
                    </Form.Control>
                  ) 
                   : (
                    <input
                      type="text"
                      className='form-control'
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  )
                ) : (
                  <p>{details[key] || '-'}</p>)}
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
                  ) : key == "Occupation" ? (
                    <Form.Control
                      as="select"
                      value={details[key] || ""}
                      onChange={(e) => handleChange(e, key)}
                    >
                      <option hidden disabled value="">
                        Select
                      </option>
                      {occupationOptions.map((option, i) => (
                        <option key={i} disabled={i == 0} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>

                  )
                  : (
                    <input
                      type="text"
                      className='form-control'
                      value={details[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  )
                ) : (
                  <p>{details[key] || '-'}</p>
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
