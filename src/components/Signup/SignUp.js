import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
} from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./signup.css";
import { useHistory } from "react-router-dom";
import { singnup, toastError } from "../../utils/constants";
import { validateEmail } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { registerlogo, tick, pelli } from "./assets/index.js";
import register2 from "./assets/register2.svg";
import TermsAndConditions from "./TermsAndConditions.jsx";
import { terms_conditios} from "./assets"
import { pdfjs } from "react-pdf";
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([pdfWorker], { type: 'application/javascript' }));
import {
  userSignup,
  otpverify,
  setToken,
  reSendOtp,
} from "../../redux/slices/AuthSlice";
import { toast } from "react-toastify";
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

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [displayerr, setDisplayErr] = useState(false);
  const [btnCondition, setBtnCondition] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [rePassError, setRePassError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: "",
    userPass: "",
    repeatPass: "",
    fullname: "",
    mobile: "",
    gender: "I am",
    otp: "",
  });
  const [emailIdError, setEmailIdError] = useState(false);
  const [repeatpassError, setRepeatPassError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [numError, setNumError] = useState(false);
  const [genderError, setGenderError] = useState("");
  const [displayOtp, setDisplayOtp] = useState(false);
  const [termsCondition, setTermsCondition] = useState(false);

  useEffect(() => {
    if (
      formData.userEmail === "" ||
      formData.fullname === "" ||
      formData.gender === "I am" ||
      formData.userPass === "" ||
      formData.repeatPass === "" ||
      formData.mobile === "" ||
      isChecked === false
    ) {
      setBtnCondition(true);
    } else {
      setBtnCondition(false);
    }
  }, [formData, isChecked]);
  const toggle = async () => {
    setModal(!modal);
  };
  const closeBox = async () => {
    setSuccessModal(false);
    setModal(false);
    await dispatch(setToken());
  };
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
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordVisibilities = () => setRePassError(!rePassError);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplayOtp(true);
    if (!validateEmail(formData.userEmail)) {
      setEmailIdError(true);
    } else {
      setEmailIdError(false);
    }
    if (formData.userPass !== formData.repeatPass) {
      setPasswordError("Passwords do not match");
      setDisplayOtp(false);
    } else if (formData.userPass.length < 8 || formData.repeatPass.length < 8) {
      setPasswordError("password must be minimum 8 characters");
    } else if (formData.mobile.length !== 10) {
      setNumError("please enter valid 10 digit mobile number");
      setDisplayOtp(false);
    } else {
      const data = await dispatch(userSignup(formData));
      if (
        data?.payload.message ==
        "User Already Exists with MobileNumber Please Login"
      ) {
        toast.error("User Already Exists with MobileNumber Please Login",toastError);
      } else if (data?.payload.message == "OTP Verification Is Pending") {
        setPasswordError("");
        setModal(true);
        setNumError("");
        setDisplayOtp(true);
        toggle();
      } else {
        toast.error("Something went wrong",toastError);
      }
    }
  };
  const resendotp = async () => {
    await dispatch(reSendOtp({ mobile: formData.mobile }));
  };
  const onCheck = (e) => setIsChecked(e.target.checked);
  const handleBlur = (e) => {
    switch (e.target.name) {
      case "fullname":
        setFullNameError(e.target.value === "");
        break;
      case "gender":
        setGenderError(e.target.value === "");
        break;
      case "userEmail":
        setEmailIdError(!validateEmail(e.target.value));
        break;
      case "userPass":
        setPassError(e.target.value === "");
        break;
      case "repeatPass":
        setRepeatPassError(e.target.value === "");
        break;
      case "mobile":
        setNumError(e.target.value === "");
        break;
      default:
        break;
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "fullname") {
      const alphabetRegex = /^[A-Za-z\s]*$/;
      if (alphabetRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "mobile") {
      const numberRegex = /^[0-9]*$/;
      if (numberRegex.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const closeBtn = (
    <button className="close" onClick={closeBox} type="button">
      &times;
    </button>
  );
  const navtoLogin = () => {
    history.push("/login");
  };
  console.log("formData------->",formData);
  return (
    <div className="main-cont">
     {termsCondition&& (
        <div className="terms-condition-parent overlay" onClick={() => setTermsCondition(false)}>
          <div className="terms-condition">
            <TermsAndConditions pdfUrl={terms_conditios} />
          </div>
        </div>
    )}
      <img src={registerlogo} alt="image" className="img-logo-signup" />
      <div className="left-section">
        <Form onSubmit={handleSubmit} className="forms">
          <div className="signup-main-tabview-heading">
          <h3>welcome to </h3>
          <h4>pellisambadalu </h4>
          </div>
          
          <p className="signup-heading">{singnup.title}</p>
          <div className="position-relative">
            <FormGroup className="signup-form-input">
              <Input
                placeholder={singnup.fullName}
                bsSize="lg"
                className={
                  fullNameError
                    ? "form-control-genderss"
                    : "form-control-genderss mb-3"
                }
                type="singnup"
                onChange={handleChange}
                value={formData.fullname}
                name="fullname"
                onBlur={handleBlur}
                required
                title="full name is required"
              />
              {formData.fullname === "" ? <p className="req">*</p> : null}
            </FormGroup>
          </div>
          {fullNameError && (
            <p className="fullname-error mb-3">please enter your full name</p>
          )}
          {formData.fullname === "" && displayOtp && (
            <p className="fullname-error">please enter your full name</p>
          )}
          <div className="position-relative">
            <FormGroup className="signup-form-input">
     
              <Input
                type="select"
                className={`signup-form-gender ${
                  formData.gender == "I am" ? "placeholder-color":"form-control-genders-color" 
                }`}
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
              {formData.gender === "I am" ? <p className="req">*</p> : null}
            </FormGroup>
          </div>
          {genderError && (
            <p className="fullname-error">please select a gender</p>
          )}
          <div className="position-relative">
            <FormGroup className="signup-form-input">
              <Input
                bsSize="lg"
                type="email"
                className={
                  !emailIdError
                    ? "form-control-genderss"
                    : "form-control-genderss"
                }
                onChange={handleChange}
                value={formData.userEmail}
                name="userEmail"
                onBlur={handleBlur}
                placeholder={singnup.emailId}
                required
              />
              {formData.userEmail === "" ? <p className="req">*</p> : null}
            </FormGroup>
          </div>
          {emailIdError && (
            <p className="email-error mb-3">please enter a valid email</p>
          )}
          <div>
            <div className="position-relative">
              <FormGroup className="signup-form-input">
                <Input
                  bsSize="lg"
                  className={
                    passError
                      ? "form-control-genderss mb-3"
                      : "form-control-genderss mb-3"
                  }
                  type={showPassword ? "text" : "password"}
                  id="passwo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="userPass"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  value={formData.userPass}
                  placeholder={singnup.password}
                  required
                />
                {formData.userPass === "" ? <p className="req">*</p> : null}
              </FormGroup>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="eye eye-icon-1">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="position-relative">
            <div>
              <Input
                bsSize="lg"
                className={
                  rePassError
                    ? "form-control-genderss mb-3"
                    : "form-control-genderss mb-3"
                }
                type={rePassError ? "text" : "password"}
                id="reenter"
                onChange={handleChange}
                onBlur={handleBlur}
                name="repeatPass"
                value={formData.repeatPass}
                placeholder={singnup.reenterPassword}
                required
              />
              {formData.repeatPass === "" ? <p className="req">*</p> : null}
            </div>
            {repeatpassError && (
              <p className="email-error">{singnup.rePassErr}</p>
            )}
            <button
              type="button"
              onClick={togglePasswordVisibilities}
              className="eye eye-icon-2">
              {rePassError ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {passwordError && <div className="pass-err">{passwordError}</div>}
          <div className="number-cont">
            <FormGroup className="country-code-option ">
              <Input
                type="select"
                name="select"
                placeholder="+91"
                className="signup-form-gender">
                <option value="+91">+91</option>
              </Input>
            </FormGroup>
            <FormGroup className="signup-phone-nbr">
              <div className="input-wrapper">
                <span className="required-asterisk">*</span>
                <Input
                  bsSize="lg"
                  type="number"
                  onChange={handleChange}
                  value={formData.mobile}
                  name="mobile"
                  placeholder="Enter Number"
                  required
                />
              </div>
            </FormGroup>
          </div>

          {numError && <div className="pass-err">{numError}</div>}
          <div className="check d-flex justify-content-space-between align-items-center align-self-start mb-2 gap-2">
            <input
              type="checkbox"
              onChange={onCheck}
              value={isChecked}
              className="check-2-checkin"
            />
            <p className="para-terms" >
              {singnup.agreeTerms}
              <button style={{background:"transparent",border:"none"}} onClick={()=>setTermsCondition(true)}>
              <span style={{ color: "#117FFF" }}>{singnup.terms_policy1} </span>
              <b>&</b>{" "}
              <span style={{ color: "#117FFF" }}>{singnup.terms_policy2} </span>
              </button>
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center ">
            <Button
              className="form-next-button mb-3 mt-2"
              type="submit"
              disabled={btnCondition}>
              {singnup.title}
            </Button>
          </div>

          <div className="already text-center d-flex align-items-center justify-content-center ">
            {singnup.alreadyAccount}
            <Button
              onClick={navtoLogin}
              className="btn btn-link text-decoration-none p-0">
              <span className="already-login text-center">{singnup.login}</span>
            </Button>
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
      <div className="right-section">
        <div className="right-section-text">
          <div className="d-flex gap-0.5 align-items-center  ">
            <h4>{singnup.welcomeBack}</h4>
            <img src={pelli} alt="Pelli Sambandalu" />
          </div>

          <p className="right-section-para">{singnup.description}</p>
        </div>
        <img src={register2} className="main-img" alt="Background" />
      </div>
    </div>
  );
};
export default SignUp;
