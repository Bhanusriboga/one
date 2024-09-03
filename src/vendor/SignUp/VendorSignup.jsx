import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom"
import "./SignupForm.css";
import { useDispatch } from "react-redux";
import { vendorSignup,otpverify,
  // setToken,
  reSendOtp, } from "../../redux/slices/AuthSlice";


import { singnup } from "../../utils/constants.js";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader
  // FormGroup,
} from "reactstrap";
import {  tick } from "../../components/Signup/assets/index.js";

const styles = {
  eyeIcon: {
    position: "absolute",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
  },
  verifiedIcon: {
    background: "#36A900",
    height: "60px",
    width: "60px",
  },
};




const VendorSignup = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [successModal, setSuccessModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [displayerr, setDisplayErr] = useState(false);



  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender:""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const alphabetOnlyFields = ["fatherName", "name"]; 
    if (alphabetOnlyFields.includes(name)) {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        return;
      }
      setFormData({ ...formData, [name]: value });
      return;
    }
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }

  };


  const toggle = async () => {
    setModal(!modal);

  };

 
  const closeBox = async () => {
    setSuccessModal(false);
    setModal(false);
    // await dispatch(setToken());
    history.push("/admin-signup2")
    
  };
  const closeBtn = (
    <button className="close" onClick={closeBox} type="button">
      &times;
    </button>
  
  );

  const toggleSuccesfull = async () => {
    if (formData.otp !== "") {
      const data = await dispatch(
        otpverify({ mobile: formData.mobile, otp: formData.otp })
      );
      if (data?.payload.message == "User registered successfully") {
        setDisplayErr(false);
        setSuccessModal(!successModal);
        setModal(false);
        setFormData({ ...formData, otp: "" });
      } else {
        setDisplayErr(true);
        setSuccessModal(false);
        setModal(true);
      }
    } else {
      setDisplayErr(true);
      setSuccessModal(false);
      setModal(true);
    }
  };
  const resendotp = async () => {
    await dispatch(reSendOtp({ mobile: formData.mobile }));
  };


  const validateForm = () => {
    let tempErrors = {};
    const namePattern = /^[A-Za-z]+$/;
    const mobilePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!formData.name) {
      tempErrors.name = "Name is required";
    }
     else if (!namePattern.test(formData.name)) {
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
    }else if(!formData.gender){
      tempErrors.gender="Gender is required"
    }

    return tempErrors;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (formData.password != "") {
      setErrors({});
    }
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const data=await dispatch(vendorSignup(formData))
      console.log("----- ",{data})
      toggle()
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
              <Col md={6}>
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
              <Col md={6}>
                  <Form.Label>Gender</Form.Label>
                  <FormGroup className="signup-form-input">
              <Input
                type="select"
                className="custom-input"
                value={formData.gender}
                onChange={handleChange}
                name="gender">
                <option value="" selected={formData.gender === ""} hidden>
                  &nbsp;I am
                </option>
                <option value="MALE" className="opt-color">
                  Male
                </option>
                <option value="Female" className="opt-color">
                  Female
                </option>
                <option value="Others" className="opt-color">
                  Others
                </option>
              </Input>
              {errors.name && <div className="text-danger">{errors.name}</div>}
              </FormGroup>
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
                        className="custom-input" />
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



          <div className="container-xl">
          <Modal isOpen={modal} toggle={toggle}>
            <div className="modal-lg modal-xs">
              <ModalBody className="d-flex flex-column align-items-center justify-content-evenly signup-modal ">
                <h5 className="otp-head">{singnup.otpVerification}</h5>
                <p className="otp-para">{singnup.otpSent}</p>
                <Input
                  type="text"
                  className="otp-input pb-2"
                  value={formData.otp}
                  name="otp"
                  onChange={handleChange}
                  placeholder={singnup.enterOtp}></Input>
                {displayerr && (
                  <p className="pt-2" style={{ color: "red" }}>
                    Please enter received OTP
                  </p>
                )}
                <p className="didnt">
                  {singnup.resendOtp}
                  <button
                    onClick={resendotp}
                    className="resend-otp bg-transparent border-0">
                    {singnup.resend}
                  </button>
                </p>
                <Button className="verify-button" onClick={toggleSuccesfull}>
                  {singnup.verify}
                </Button>
              </ModalBody>
            </div>
          </Modal>
        </div>

        <Modal isOpen={successModal} size="md" toggle={toggle}>
          <ModalHeader toggle={toggleSuccesfull} close={closeBtn}></ModalHeader>
          <div className="d-flex flex-column align-items-center justify-content-center text-center p-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle align-self-center"
              style={styles.verifiedIcon}>
              <img src={tick} alt="Verified" />
            </div>
            <h5 className="otp-head">{singnup.verifiedSuccessfully}</h5>
            <p className="otp-para">{singnup.mobileVerified}</p>
          </div>
        </Modal> 
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;