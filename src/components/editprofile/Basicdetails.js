import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { EditProfile } from "../../utils/constants";
import "./Details.css";

const initialdetails = {
  "Date of Birth": new Date().toISOString().split('T')[0],
  "Place of Birth": "xyzxyzk",
  "Time of Birth": "xyz",
  "Mother Tongue": "Telugu", 
  "Religion": "Hindu", 
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
    "Postal code": "123456", 
  }
};

const Basicdetails = () => {
  const [details, setDetails] = useState(initialdetails);
  const [address, setAddress] = useState(basicdetails);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e, section, key) => {
    const value = e.target.value;

    if (section === 'details') {
      setDetails(prevDetails => ({
        ...prevDetails,
        [key]: key === "Date of Birth" ? e.target.value : value 
      }));
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: ''
      }));
    } else {
      if (key === "Postal code") {
        const regex = /^[0-9]{0,6}$/;
        if (!regex.test(value)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            "Address": {
              ...prevErrors["Address"],
              [key]: 'Postal code must be exactly 6 digits'
            }
          }));
          return;
        }
      }

      setAddress(prevAddress => ({
        ...prevAddress,
        "Address": {
          ...prevAddress["Address"],
          [key]: value,
        }
      }));
      if (errors["Address"] && errors["Address"][key]) {
        setErrors(prevErrors => ({
          ...prevErrors,
          "Address": {
            ...prevErrors["Address"],
            [key]: ''
          }
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(details).forEach(([key, value]) => {
      if (key !== "Instagram id" && key !== "LinkedIn id") {
        if (key === "Date of Birth" && (!value || new Date(value).toString() === "Invalid Date")) {
          newErrors[key] = `${key} is required`;
        } else if (!value) {
          newErrors[key] = `${key} is required`;
        }
      }
    });

    Object.entries(address["Address"]).forEach(([key, value]) => {
      if (!value) {
        if (!newErrors["Address"]) newErrors["Address"] = {};
        newErrors["Address"][key] = `${key} is required`;
      } else if (key === "Postal code" && !/^\d{6}$/.test(value)) {
        if (!newErrors["Address"]) newErrors["Address"] = {};
        newErrors["Address"][key] = `Postal code must be exactly 6 digits`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
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
                    key === "Date of Birth" ? (
                      <>
                        <Form.Control
                          type="date"
                          value={value}
                          onChange={(e) => handleChange(e, 'details', 'Date of Birth')}
                          isInvalid={!!errors["Date of Birth"]}
                        />
                        {errors["Date of Birth"] && (
                          <Form.Text className="error-text">
                            {errors["Date of Birth"]}
                          </Form.Text>
                        )}
                      </>
                    ) : key === "Mother Tongue" ? (
                      <Form.Control
                        as="select"
                        value={value}
                        onChange={(e) => handleChange(e, 'details', key)}
                        isInvalid={!!errors[key]}
                      >
                        <option value="Telugu">Telugu</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Malayalam">Malayalam</option>
                      </Form.Control>
                    ) : key === "Religion" ? (
                      <Form.Control
                        as="select"
                        value={value}
                        onChange={(e) => handleChange(e, 'details', key)}
                        isInvalid={!!errors[key]}
                      >
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                      </Form.Control>
                    ) : (
                      <>
                        <Form.Control
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(e, 'details', key)}
                          isInvalid={!!errors[key]}
                        />
                        {errors[key] && <Form.Text className="error-text">{errors[key]}</Form.Text>}
                      </>
                    )
                  ) : (
                    <p className="valtext">
                      {key === "Date of Birth" ? (value ? new Date(value).toDateString() : '') : value}
                    </p>
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
                        <Form.Control
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(e, 'address', key)}
                          isInvalid={!!(errors["Address"] && errors["Address"][key])}
                        />
                        {errors["Address"] && errors["Address"][key] && <Form.Text className="error-text">{errors["Address"][key]}</Form.Text>}
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



