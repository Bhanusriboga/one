import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./SignupForm.css";
import { useDispatch } from "react-redux";
import { vendorSignup2, uploadvendorFiles } from "../../redux/slices/AuthSlice";
import { useHistory } from "react-router-dom"

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [formData, setFormData] = useState({
    fatherName: "",
    aadharNumber: "",
    panCard: "",
    voterId: "",
    accountNumber: "",
    ifscCode: "",
    swiftCode: "",
    aadharFile: "",
    panFile: "",
    voterIdFile: "",
    address: {
      doorNo: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // IFSC Code validation
    if (name === "ifscCode") {
      const formattedValue = value.toUpperCase().slice(0, 11); // Convert to uppercase and restrict to 11 characters
      const ifscRegex = /^[A-Z]{4}\d{7}$/;

      setFormData({ ...formData, [name]: formattedValue });

      if (formattedValue.length === 11) {
        if (ifscRegex.test(formattedValue)) {
          setErrors({ ...errors, [name]: "" }); // Clear error if valid
        } else {
          setErrors({
            ...errors,
            [name]:
              "IFSC Code must be 11 characters long with the first 4 alphabets and the remaining 7 digits",
          });
        }
      } else {
        setErrors({
          ...errors,
          [name]: formattedValue.length
            ? "IFSC Code must be exactly 11 characters"
            : "",
        });
      }
      return; // Exit after IFSC code handling
    }

    // Handle file inputs
    if (name === "aadharFile" || name === "panFile" || name === "voterIdFile") {
      setFormData({ ...formData, [name]: files[0] });
      return;
    }

    // Father name validation
    if (name === "fatherName") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        return;
      }
    }

    // PAN Card validation
    if (name === "panCard") {
      const formattedValue = value.toUpperCase().slice(0, 10); // Convert to uppercase and restrict to 10 characters
      setFormData({ ...formData, [name]: formattedValue });

      if (formattedValue.length === 10) {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (panRegex.test(formattedValue)) {
          setErrors({ ...errors, [name]: "" }); // Clear error if valid
        } else {
          setErrors({
            ...errors,
            [name]:
              "PAN Card must be in the format: 5 alphabets, 4 digits, 1 alphabet",
          });
        }
      } else {
        setErrors({
          ...errors,
          [name]: formattedValue.length
            ? "PAN Card must be exactly 10 characters"
            : "",
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Aadhar Number validation
    if (name === "aadharNumber") {
      const formattedValue = value.replace(/\D/g, ''); // Remove any non-digit characters
      setFormData({ ...formData, [name]: formattedValue });

      if (formattedValue.length === 12) {
        setErrors({ ...errors, [name]: "" }); // Clear error if valid
      } else {
        setErrors({
          ...errors,
          [name]: formattedValue.length
            ? "Aadhaar Number must be exactly 12 digits"
            : "",
        });
      }
      return; // Exit after Aadhaar number handling
    }

    // Address fields handling
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fatherName) newErrors.fatherName = "Father Name is required";
    if (!formData.aadharNumber)
      newErrors.aadharNumber = "Aadhar Number is required";
    else if (!/^\d{12}$/.test(formData.aadharNumber))
      newErrors.aadharNumber = "Aadhar Number must be 12 digits";

    if (!formData.aadharFile) newErrors.aadharFile = "Select an aadhar card file";
    if (!formData.panCard) {
      newErrors.panCard = "PAN Card Number is required";
    } else if (formData.panCard.length !== 10) {
      newErrors.panCard = "PAN Card must be exactly 10 characters";
    } else if (/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
      newErrors.panCard =
        "PAN Card must be in the format: 5 alphabets, 4 digits, 1 alphabet";
    }

    if (!formData.panFile) newErrors.panFile = "Select a PAN card file";
    if (!formData.accountNumber)
      newErrors.accountNumber = "Account Number is required";
    if (!formData.ifscCode) newErrors.ifscCode = "IFSC Code is required";
    if (!formData.address.doorNo) newErrors.doorNo = "Door No. is required";
    if (!formData.address.street) newErrors.street = "Street name is required";
    if (!formData.address.city) newErrors.city = "City is required";
    if (!formData.address.state) newErrors.state = "State is required";
    if (!formData.address.country) newErrors.country = "Country is required";
    if (!formData.address.postalCode)
      newErrors.postalCode = "Postal code is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    const newErrors = validateForm();
    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField) {
      setErrors({ [firstErrorField]: newErrors[firstErrorField] });
    } else {
      setErrors({});
      const data = await dispatch(vendorSignup2(formData));
      const formDataObj1 = new FormData();
      formDataObj1.append("file", formData.aadharFile);
       await dispatch(uploadvendorFiles(formDataObj1));
       const formDataObj2 = new FormData();

      formDataObj2.append("file", formData.panFile);
       await dispatch(uploadvendorFiles(formDataObj2));
       const formDataObj3 = new FormData();

      formDataObj3.append("file", formData.voterIdFile);
       await dispatch(uploadvendorFiles(formDataObj3));
      console.log("----- ", { data });
    }
    history.push("/admin")

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
                      <Form.Label>Father Name ( As per Pan Card )</Form.Label>
                      <Form.Control
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        className="custom-input"
                        isInvalid={submitClicked && errors.fatherName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fatherName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Aadhar Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="aadharNumber"
                        maxLength="12"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        placeholder="Enter Aadhar number"
                        className="custom-input"
                        isInvalid={submitClicked && errors.aadharNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.aadharNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Aadhar file and upload</Form.Label>
                      <Form.Control
                        type="file"
                        className="custom-input"
                        onChange={handleChange}
                        name="aadharFile"
                        isInvalid={submitClicked && errors.aadharFile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.aadharFile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pan Card</Form.Label>
                      <Form.Control
                        type="text"
                        name="panCard"
                        value={formData.panCard}
                        onChange={handleChange}
                        placeholder="Enter Pan card number"
                        className="custom-input"
                        isInvalid={submitClicked && errors.panCard}
                        maxLength="10"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.panCard}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select PAN file and upload</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleChange}
                        name="panFile"
                        isInvalid={submitClicked && errors.panFile}
                      />
     
                      <Form.Control.Feedback type="invalid">
                        {errors.panFile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Voter Id / Driving License</Form.Label>
                      <Form.Control
                        type="text"
                        name="voterId"
                        value={formData.voterId}
                        onChange={handleChange}
                        placeholder="Enter voter id"
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Voter Id/ DL file and upload</Form.Label>
                      <Form.Control
                        type="file"
                        className="custom-input"
                        onChange={handleChange}
                        name="voterIdFile"
                        isInvalid={submitClicked && errors.voterIdFile}
                      />
     
                      <Form.Control.Feedback type="invalid">
                        {errors.voterIdFile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Account Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter account number"
                        className="custom-input"
                        isInvalid={submitClicked && errors.accountNumber}
                        maxLength="15"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.accountNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>IFSC Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        placeholder="Enter IFSC code"
                        className="custom-input"
                        isInvalid={submitClicked && errors.ifscCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.ifscCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Swift Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="swiftCode"
                        value={formData.swiftCode}
                        onChange={handleChange}
                        placeholder="Enter Swift code"
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <h6>Address Details</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="address.doorNo"
                        value={formData.address.doorNo}
                        onChange={handleChange}
                        placeholder="|Door no. / Building no. / Building name"
                        className="custom-input"
                        isInvalid={submitClicked && errors.doorNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.doorNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        placeholder="|Street name"
                        className="custom-input"
                        isInvalid={submitClicked && errors.street}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.street}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        placeholder="|City"
                        className="custom-input"
                        isInvalid={submitClicked && errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        placeholder="|State"
                        className="custom-input"
                        isInvalid={submitClicked && errors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        placeholder="|Country"
                        className="custom-input"
                        isInvalid={submitClicked && errors.country}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.country}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="address.postalCode"
                        value={formData.address.postalCode}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (/^\d{0,6}$/.test(value)) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Postal Code"
                        className="custom-input"
                        isInvalid={submitClicked && errors.postalCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.postalCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="text-center mt-4">
                    <div className="w-100 d-flex align-item-center justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-50 mt-3 dash-btn"
                      >
                        signup
                      </Button>
                    </div>
                    <div className="text-center mt-3">
                      Already have an account? <a href="/">Login</a>
                    </div>
                  </Col>
                </Row>
              </Form>
    
              
            </div>
          </div>
        </div>
      );
};

export default SignupForm;
