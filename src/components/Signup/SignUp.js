        import React, { useState, useEffect } from 'react';
        import { Input, Button, Modal, ModalBody, ModalHeader, Form, FormGroup } from 'reactstrap';
        import { FaEye, FaEyeSlash } from 'react-icons/fa';
        import "./signup.css";
        import { pelli, more, tick, backgroundImg } from "./assets";
        const styles = {
        eyeIcon: {
        position: "absolute",
        right: "10px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        outline: "none"
        },
        verifiedIcon: {
        background: "#36A900",
        height: "60px",
        width: "60px"
        }
        };
        const text = {
        title: "Signup",
        gender:"I am",
        otpVerification: "OTP Verification",
        otpSent: "One - Time password sent to your registered mobile number",
        enterOtp: "Enter Otp",
        resendOtp: "Didn’t receive the OTP? Resend OTP",
        verify: "Verify",
        verifiedSuccessfully: "Verified Successfully",
        mobileVerified: "Your mobile number has been successfully verified",
        fullName: "Full Name",
        emailId: "Email Id",
        password: "Password",
        reenterPassword: "Re-enter password",
        enterNumber: "Enter Number",
        agreeTerms: "I agree to  ",
        terms_policy:"terms & privacy policy",
        alreadyAccount: "Already have an account? ",
        welcomeBack: "Welcome back to",
        description: "Our expert team provides comprehensive planning and personalized services to ensure your special day is perfect. Trust us to turn your dream wedding into reality. Contact us today!",
        login:"Login"
        };

        const SignUp = ({ signupState, setSignedUp }) => {
        const [modal, setModal] = useState(false);
        const [successModal, setSuccessModal] = useState(false);
        const [displayerr, setDisplayErr] = useState(false);
        const [btnCondition, setBtnCondition] = useState(true);
        const [passwordError, setPasswordError] = useState('');
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

        useEffect(() => {
        if (
        formData.userEmail === "" ||
        formData.fullname === "" ||
        formData.gender === "" ||
        formData.userPass === "" ||
        formData.repeatPass === "" ||
        formData.mobile === ""
        ) {
        setBtnCondition(true);
        } else {
        setBtnCondition(false);
        }
        }, [formData]);

        const toggle = () => setModal(!modal);

        const closeBox = () => {
        setSuccessModal(false);
        setModal(false);
        
        };
        const toggleSuccesfull = () => {
        if (formData.otp !== "") {
        setDisplayErr(false);
        setSuccessModal(!successModal);
        setModal(false);
        setFormData({ ...formData, otp: "" });
        } else {
        setDisplayErr(true);
        setSuccessModal(false);
        setModal(true);
        }
        };

        const togglePasswordVisibility = () => setShowPassword(!showPassword);

        const togglePasswordVisibilities = () => setRePassError(!rePassError);

        const handleSubmit = (e) => {
        e.preventDefault();
        setDisplayOtp(true);
        if (formData.userPass !== formData.repeatPass) {
        setPasswordError('Passwords do not match');
        setDisplayOtp(false);
        } else if (formData.userPass.length < 8 || formData.repeatPass.length < 8) {
        setPasswordError("password must be minimum 8 characters");
        } else if (formData.mobile.length !== 10) {
        setNumError("please enter valid 10 digit mobile number");
        setDisplayOtp(false);
        } else {
        setPasswordError('');
        setModal(true);
        setNumError("");
        setDisplayOtp(true);
        setSignedUp(true);
        toggle();
        }
        };

        const onCheck = (e) => setIsChecked(e.target.checked);

        const handleBlur = (e) => {
        switch (e.target.name) {
        case "userEmail":
        setEmailIdError(e.target.value === "");
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
        case "fullname":
        setFullNameError(e.target.value === "");
        break;
        case "gender":
        setGenderError(e.target.value === "");
        break;
        default:
        break;
        }
        };

        const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        };

        const closeBtn = (
        <button className="close" onClick={closeBox} type="button">
        &times;
        </button>
        );

        return (
        <div className='main-cont'>
        <img src={backgroundImg} className='main-img' alt="Background" />
        <Modal isOpen={modal} toggle={toggle}>
        <ModalBody className="d-flex flex-column align-items-center justify-content-center">
        <h5 className='otp-head'>{text.otpVerification}</h5>
        <p className='otp-para'>{text.otpSent}</p>
        <input type='text' className='otp-input pb-2' value={formData.otp} name='otp' onChange={handleChange} placeholder={text.enterOtp} />
        {displayerr && <p className='pt-2' style={{ color: "red" }}>please enter received otp</p>}
        <p className='didnt'>{text.resendOtp}</p>
        <button className='verify-button' onClick={toggleSuccesfull}>
        {text.verify}
        </button>
        </ModalBody>
        </Modal>
        <Modal isOpen={successModal} size='sm' toggle={toggle}>
        <ModalHeader toggle={toggleSuccesfull} close={closeBtn}></ModalHeader>
        <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='d-flex align-items-center justify-content-center rounded-circle align-self-center' style={styles.verifiedIcon}>
        <img src={tick} alt="Verified" />
        </div>
        <h5 className='verified-head text-center'>{text.verifiedSuccessfully}</h5>
        <p className='verified-para text-center'>{text.mobileVerified}</p>
        </div>
        </Modal>
        <Form onSubmit={handleSubmit}  className="forms d-flex flex-column justify-content-center align-items-center">
        <h1 className='star'>{text.title}</h1>
        <div className='fullname-cont'>
        <Input placeholder={text.fullName} bsSize="lg" className="form-control genderss" type='text' onChange={handleChange} value={formData.fullname} name='fullname' onBlur={handleBlur} required title='full name is required' />
        {formData.fullname === "" ? <p className='req'>*</p> : null}
        </div>
        {fullNameError && <p className='fullname-error'>please enter your full name</p>}
        {formData.fullname === "" && displayOtp && <p className='fullname-error'>please enter your full name</p>}
        {!fullNameError && <p> </p>}
        <div className='fullname-cont'>
        <Input type='select' className="form-control genderss select option place" value={formData.gender} onChange={handleChange} name="gender">
        <option value="">{text.gender}</option>
        <option value="male" className="opt-color">male</option>
        <option value="female" className="opt-color">female</option>
        <option value="others" className="opt-color">others</option>
        </Input>
        {formData.gender === "I am" ? <p className='req-iam'>*</p> : null}
        </div>
        {genderError && <p className='fullname-error'>please select a gender</p>}
        <p> </p>
        <div className='fullname-cont'>
        <Input bsSize="lg" type='email' className="form-control genderss" onChange={handleChange} value={formData.userEmail} name='userEmail' onBlur={handleBlur} placeholder={text.emailId} required />
        {formData.userEmail === "" ? <p className='req'>*</p> : null}
        </div>
        {emailIdError && <p className='email-error'>please enter email id</p>}
        {!emailIdError && <p> </p>}
        <div className='fullname-cont'>
        <Input bsSize="lg" className="form-control genderss" type={showPassword ? 'text' : 'password'} id="passwo" onChange={handleChange} onBlur={handleBlur} name='userPass' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={formData.userPass} placeholder={text.password} required />
        {formData.userPass === "" ? <p className='req'>*</p> : null}
        {passError && <p className='email-error' >please enter a password</p>}
        {!passError && <p> </p>}
        <button
        type="button"
        onClick={togglePasswordVisibility}
        className={`${showPassword ? "eye-icon-1" : "eye-icon-2"}`}
        style={{
        ...styles.eyeIcon,
        top: showPassword ? "25%" : "45%",
        transform: showPassword ? "translateY(-35%)" : "translateY(-85%)"
        }}
        >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        </div>
        <div className='password-cont'>
        <div>
        <Input bsSize="lg" className="form-control genderss" type={rePassError ? 'text' : 'password'} id="reenter" onChange={handleChange} onBlur={handleBlur} name='repeatPass' value={formData.repeatPass} placeholder={text.reenterPassword} required />
        {formData.repeatPass === "" ? <p className='req'>*</p> : null}
        </div>
        {repeatpassError && <p className='email-error'>please re-enter your password</p>}
        {!repeatpassError && <p> </p>}
        <button
        type="button"
        onClick={togglePasswordVisibilities}
        style={{
        ...styles.eyeIcon,
        top: rePassError ? "25%" : "45%",
        transform: rePassError ? "translateY(-35%)" : "translateY(-85%)"
        }}
        >
        {rePassError ? <FaEyeSlash /> : <FaEye />}
        </button>
        </div>
        {passwordError && <div className='pass-err'>{passwordError}</div>}
        <div  className='number-cont'>
        <FormGroup>
        <Input  type="select"  name="select" placeholder='+91' className="form-control genderss country" >
        <option value="+91">
        +91
        </option>
        </Input>
        </FormGroup>
        {/* <img src={more} className='drop' alt="Dropdown" />  */}
        <Input bsSize="lg" className="form-control genderss number" type='number' onChange={handleChange} value={formData.mobile} name='mobile' onBlur={handleBlur} placeholder={text.enterNumber} required />
        </div>
        {numError && <div className='pass-err'>{numError}</div>}
        <p> </p>
        <br />
        <br />
        <div className='check d-flex justify-content-space-between align-items-center align-self-start'>
        <input type='checkbox' onChange={onCheck} value={isChecked} className="check-2-checkin " />
        <div className='ml-2 '>
        <p className='para-terms' >{text.agreeTerms}<span style={{color:"#117FFF"}}>{text.terms_policy}</span></p>
        </div>
        </div>
        {displayOtp && <p> </p>}
        <Button className='form next-button' type='submit' disabled={btnCondition}>
        {text.title}
        </Button>
        <p> </p>
        <p className="already">{text.alreadyAccount}<span className='already already-login text-decoration-underline'>{text.login}</span></p>
        </Form>
        <div className='right-bg-cont d-flex flex-column justify-content-flex-start align-items-flex-start'>
        <div className="d-flex align-items-center justify-content-space-around">
        <h4 className="right-bg-head">{text.welcomeBack}</h4>
        <img src={pelli} className='pellisambandalu' alt="Pelli Sambandalu" />
        </div>
        <p className='right-bg-para'>{text.description}</p>
        </div>
        </div>
        );
        };
        export default SignUp;
