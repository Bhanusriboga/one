import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FormGroup } from "reactstrap";
import {useHistory} from "react-router-dom"
import "./SignupForm.css";

const VendorSignup = () => {
  // const history = useNavigate()
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
    else{
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
   
  };

  const validateForm = () => {
    let tempErrors = {};
    const namePattern = /^[A-Za-z]+$/;
    const mobilePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!formData.name) {
      tempErrors.name = "Name is required";
    } else if (!namePattern.test(formData.name)) {
      tempErrors.name = "Name should only contain letters";
    } else if (!formData.mobile) {
      tempErrors.mobile = "Mobile number is required";
    } else if (!mobilePattern.test(formData.mobile)) {
      tempErrors.mobile = "Mobile number should be 10 digits";
    } else if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    } else if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password!=""){
      setErrors({});
    }
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      history("/VendorSignup")
    } else {
      setErrors(validationErrors);

    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="p-4 shadow-sm rounded p-5 bg-white backg">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            width: "90%",
            borderRadius: "10px",
          }}
        >
          <h3 className="text-center mt-3">Signup</h3>
          <p className="text-center m-0">Create an account to continue</p>
          <Form className="dash-bord-form" onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Name (As per Pan Card)</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="custom-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <div className="d-flex align-items-center">
                    <FormGroup className="admn-signup-country">
                      <Form.Control
                        type="text"
                        name="mobile"
                        placeholder="+91"
                        className="custom-input"/>
                    </FormGroup>
                    <FormGroup className="admn-signup-phn">
  <Form.Control
    type="number"
    name="mobile"
    placeholder="Enter Mobile Number"
    className="custom-input"
    value={formData.mobile}
    onChange={handleChange}
    maxLength={10}
    onInput={(e) => {
      if (e.target.value.length > 10) {
        e.target.value = e.target.value.slice(0, 10);
      }
    }}
    onKeyDown={(e) => {
      if (e.key === 'e' || e.key === '+' || e.key === '-' || e.key === '.' || e.key === ',') {
        e.preventDefault();
      }
    }}
  />
</FormGroup>
                  </div>
                  {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Mail id"
                    className="custom-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Create Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="custom-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="custom-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mb-3">
              <small>Hint: Use a mix of uppercase, lowercase, numbers, and special characters for a strong password.</small>
            </div>
            <div className="w-100 d-flex align-item-center justify-content-center">
              <Button
                variant="primary"
                type="submit"
                className="w-50 mt-3 dash-btn"
              >
                Next
              </Button>
            </div>
            <div className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;





