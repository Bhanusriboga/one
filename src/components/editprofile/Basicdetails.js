
import React, {  useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Details.css";
import { MdEdit } from "react-icons/md";
import { EditProfile } from "../../utils/constants";
import {  updatebasicdetails } from "../../redux/slices/Users";
import { useDispatch } from 'react-redux';
const initialdetails = {
  "Date of Birth": "xyzxyz",
  "Place of Birth": "xyzxyzk",
  "Time of Birth": "xyz",
  "Mother Tongue": "xyz",
  "Religion": "xyz",
  "Citizenship": "xyz",
  "Language Proficiency": "xyz",
  "Instagram id": "xyz",
  "LinkedIn id": "xyz",
};

const basicdetails = {
  "Address": {
    "Door no&Street Name": "xyzxyz",
    "City": "xyzxyz",
    "State": "xyz",
    "Country": "xyz",
    "Postal code": "xyz",
  }
};

const Basicdetails = () => {
  const [details, setDetails] = useState(initialdetails);
  const [address, setAddress] = useState(basicdetails);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e, section, key) => {
    if (section === 'details') {
      setDetails({ ...details, [key]: e.target.value });
      setErrors({ ...errors, [key]: '' });
    } else {
      setAddress({
        ...address,
        "Address": {
          ...address["Address"],
          [key]: e.target.value,
        }
      });
      if (errors["Address"] && errors["Address"][key]) {
        setErrors({
          ...errors,
          "Address": {
            ...errors["Address"],
            [key]: ''
          }
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(details).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    });

    Object.entries(address["Address"]).forEach(([key, value]) => {
      if (!value) {
        if (!newErrors["Address"]) newErrors["Address"] = {};
        newErrors["Address"][key] = `${key} is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async() => {
    if (validateForm()) {
      const payload = {
        "dateOfBirth": details["Date of Birth"],
        "placeOfBirth": details["Place of Birth"],
        "timeOfBirth": details["Time of Birth"],
        "religion": details.Religion,
        "motherTongue": details["Mother Tongue"],
        "citizenShip": details.Citizenship,
        "languageProficiency": details["Language Proficiency"],
        "instgramId": details["Instagram id"],
        "linkedinId": details["LinkedIn id"],
        "doorNumber": address.Address["Door no&Street Name"],
        "streetName": address.Address["Door no&Street Name"],
        "city": address.Address.City,
        "state": address.Address.State,
        "country": address.Address.Country,
        "postalCode": address.Address["Postal code"]
      };
     const editresponse= await dispatch(updatebasicdetails(payload));
     console.log(editresponse, 'editresponse')
      setIsEditing(false);
    }
  };
  return (
    <Container>
      <div className="basic-main-heading1 mt-5">
        <h2 className="main-heading">{EditProfile.basicdetails}</h2>
        <button className="edit-btn" onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? "Save" : EditProfile.edit}
          {!isEditing && <MdEdit className='edit-icon' />}
        </button>

      </div>
      <div className="backgroundimg">
        <Row>
          {Object.entries(details).map(([key, value], index) => (
            <Col md={6} key={index} className="mb-2">
              <Row>
                <Col xs={6}><p className="keytext">{key}:</p></Col>
                <Col xs={6}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e, 'details', key)}
                        className="form-control"
                      />
                      {errors[key] && <p className="error-text">{errors[key]}</p>}
                    </>
                  ) : (
                    <p className="valtext">{value}</p>
                  )}
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>

      {Object.entries(address).map(([sectionTitle, sectionDetails]) => (
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
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(e, 'address', key)}
                          className="form-control"
                        />
                        {errors["Address"] && errors["Address"][key] && <p className="error-text">{errors["Address"][key]}</p>}
                      </>
                    ) : (
                      <p className="valtext">{value}</p>
                    )}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
      ))}
      <hr />
    </Container>
  );
};

export default Basicdetails;
