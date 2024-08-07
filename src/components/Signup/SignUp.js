import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, ModalBody, ModalHeader, Form, FormGroup } from 'reactstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./signup.css";
import { useHistory } from "react-router-dom";
import { pelli, tick, backgroundImg } from "./assets";
import { singnup } from "../../utils/constants"
import { validateEmail } from "../../utils/validation"
import { useDispatch } from "react-redux"
import { userSignup, otpverify, setToken, reSendOtp } from "../../redux/slices/AuthSlice"
import { toast } from 'react-toastify';
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

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory()
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
    const toggle = async () => {
        setModal(!modal)
    };
    const closeBox = async () => {
        setSuccessModal(false);
        setModal(false);
        await dispatch(setToken())
    };
    const toggleSuccesfull = async () => {
        if (formData.otp !== "") {
            const data = await dispatch(otpverify({ mobile: formData.mobile, otp: formData.otp }));
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
            setEmailIdError(true)
        }
        if (formData.userPass !== formData.repeatPass) {
            setPasswordError('Passwords do not match');
            setDisplayOtp(false);
        } else if (formData.userPass.length < 8 || formData.repeatPass.length < 8) {
            setPasswordError("password must be minimum 8 characters");
        } else if (formData.mobile.length !== 10) {
            setNumError("please enter valid 10 digit mobile number");
            setDisplayOtp(false);
        } else {
            const data = await dispatch(userSignup(formData))
            if (data?.payload.message == "User Already Exists with MobileNumber Please Login") {
                toast.error("User Already Exists with MobileNumber Please Login")
            }
            else if (data?.payload.message == "OTP Verification Is Pending") {
                setPasswordError('');
                setModal(true);
                setNumError("");
                setDisplayOtp(true);
                toggle();
            } else {
                toast.error("Something went wrong")
            }
        }
    };
    const resendotp = async () => {
        await dispatch(reSendOtp({ mobile: formData.mobile }))
    }
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
    const navtoLogin = () => {
        history.push("/login")
    }
    return (
        <div className='main-cont'>
            <img src={backgroundImg} className='main-img' alt="Background" data-testid="background-img" />
            <div className='container-xl'>
                <Modal isOpen={modal} toggle={toggle} data-testid="otp-modal">
                    <div className="modal-lg modal-xs">
                        <ModalBody className="d-flex flex-column align-items-center justify-content-evenly ">
                            <h5 className='otp-head' data-testid="otp-head">{singnup.otpVerification}</h5>
                            <p className='otp-para' data-testid="otp-para">{singnup.otpSent}</p>
                            <Input
                                type='text'
                                className='otp-input pb-2'
                                value={formData.otp}
                                name='otp'
                                onChange={handleChange}
                                placeholder={singnup.enterOtp}
                                data-testid="otp-input"
                            ></Input>
                            {displayerr && <p className='pt-2' style={{ color: "red" }} data-testid="otp-error">Please enter received OTP</p>}
                            <p className='didnt' data-testid="resend-otp">
                                {singnup.resendOtp}
                                <button onClick={resendotp} className='resend-otp bg-transparent border-0'>
                                    {singnup.resend}
                                </button>
                            </p>
                            <Button className='verify-button' onClick={toggleSuccesfull} data-testid="verify-button">
                                {singnup.verify}
                            </Button>
                        </ModalBody>
                    </div>
                </Modal>
            </div>

            <Modal isOpen={successModal} size='md' toggle={toggle}>
                <ModalHeader toggle={toggleSuccesfull} close={closeBtn}></ModalHeader>
                <div className='d-flex flex-column align-items-center justify-content-center text-center p-3'>
                    <div className='d-flex align-items-center justify-content-center rounded-circle align-self-center' style={styles.verifiedIcon}>
                        <img src={tick} alt="Verified" data-testid="verified-img" />
                    </div>
                    <h5 className='otp-head' data-testid="verified-head">{singnup.verifiedSuccessfully}</h5>
                    <p className='otp-para' data-testid="verified-para">{singnup.mobileVerified}</p>
                </div>
            </Modal>
            <Form onSubmit={handleSubmit} className="forms d-flex flex-column justify-content-evenly align-items-center" data-testid="signup-form">
                <h1 className='star' data-testid="signup-title">{singnup.title}</h1>
                <div className='position-relative'>
                    <Input placeholder={singnup.fullName} bsSize="lg" className={fullNameError ? "form-control genderss" : "form-control genderss mb-3"} type='singnup' onChange={handleChange} data-testid="fullname-input" value={formData.fullname} name='fullname' onBlur={handleBlur} required title='full name is required' />
                    {formData.fullname === "" ? <p className='req'>*</p> : null}
                </div>
                {fullNameError && <p className='fullname-error mb-3' data-testid="fullname-error">please enter your full name</p>}
                {formData.fullname === "" && displayOtp && <p className='fullname-error'>please enter your full name</p>}
                <div className='position-relative'>
                    <Input type='select' className="form-control genderss select option place mb-3" value={formData.gender} onChange={handleChange} name="gender" data-testid="gender-select">
                        <option value="">{singnup.gender}</option>
                        <option value="MALE" className="opt-color">male</option>
                        <option value="Female" className="opt-color">female</option>
                        <option value="Others" className="opt-color">others</option>
                    </Input>
                    {formData.gender === "I am" ? <p className='req'>*</p> : null}
                </div>
                {genderError && <p className='fullname-error' data-testid="gender-error">please select a gender</p>}
                <div className='position-relative'>
                    <Input bsSize="lg" type='email' className={!emailIdError ? "form-control genderss mb-3" : "form-control genderss"} onChange={handleChange} value={formData.userEmail} name='userEmail' onBlur={handleBlur} placeholder={singnup.emailId} required data-testid="email-input" />
                    {formData.userEmail === "" ? <p className='req'>*</p> : null}
                </div>
                {emailIdError && <p className='email-error' data-testid="email-error">please enter a valid email</p>}
                <div>
                    <div className='position-relative'>
                        <Input
                            bsSize="lg"
                            className={passError ? "form-control genderss mb-3" : "form-control genderss mb-3"}
                            type={showPassword ? 'singnup' : 'password'}
                            id="passwo" onChange={handleChange}
                            onBlur={handleBlur}
                            name='userPass'
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            value={formData.userPass} placeholder={singnup.password}
                            required
                            data-testid="password-input"
                        />
                        {formData.userPass === "" ? <p className='req'>*</p> : null}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className='eye eye-icon-1'
                            data-testid="toggle-password-visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className='position-relative'>
                    <div>
                        <Input bsSize="lg" className={rePassError ? "form-control genderss mb-3" : "form-control genderss mb-3"} type={rePassError ? 'singnup' : 'password'} id="reenter" onChange={handleChange} onBlur={handleBlur} name='repeatPass' value={formData.repeatPass} placeholder={singnup.reenterPassword} required data-testid="repeat-password-input" />
                        {formData.repeatPass === "" ? <p className='req'>*</p> : null}
                    </div>
                    {repeatpassError && <p className='email-error'>{singnup.rePassErr}</p>}
                    <button
                        type="button"
                        onClick={togglePasswordVisibilities}
                        className='eye eye-icon-2'
                        data-testid="toggle-repeat-password-visibility"
                    >
                        {rePassError ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {passwordError && <div className='pass-err' data-testid="repeat-password-error">{passwordError}</div>}
                <div className='number-cont'>
                    <FormGroup>
                        <Input type="select" name="select" placeholder='+91' className="form-control genderss country" >
                            <option value="+91">
                                +91
                            </option>
                        </Input>
                    </FormGroup>
                    <Input bsSize="lg" className="form-control genderss number mb-5" type='number' onChange={handleChange} value={formData.mobile} name='mobile' onBlur={handleBlur} placeholder={singnup.enterNumber} required data-testid="mobile-input" />
                    {formData.mobile === "" ? <p className='req'>*</p> : null}
                </div>
                {numError && <div className='pass-err' data-testid="mobile-error">{numError}</div>}
                <div className='check d-flex justify-content-space-between align-items-center align-self-start mb-2 gap-2'>
                    <input type='checkbox' onChange={onCheck} value={isChecked} className="check-2-checkin" data-testid="terms-checkbox" />
                    <p className='para-terms' >{singnup.agreeTerms}<span style={{ color: "#117FFF" }}>{singnup.terms_policy}</span></p>
                </div>
                <Button className='form next-button mb-3' type='submit' disabled={btnCondition} data-testid="signup-button">
                    {singnup.title}
                </Button>
                <p className="already d-flex align-item-center gap-1">{singnup.alreadyAccount}
                    <Button onClick={navtoLogin} className='btn btn-link text-decoration-none p-0'>
                        <span className='already already-login'>{singnup.login}</span>
                    </Button>
                </p>
            </Form>
            <div className='right-bg-cont'>
                <div className="d-flex align-items-center justify-content-space-around">
                    <h4 className="right-bg-head">{singnup.welcomeBack}</h4>
                    <img src={pelli} className='pellisambandalu' alt="Pelli Sambandalu" />
                </div>
                <p className='right-bg-para'>{singnup.description}</p>
            </div>
        </div>
    );
};
export default SignUp;
