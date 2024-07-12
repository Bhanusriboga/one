import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Modal,ModalBody,ModalHeader } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import "./signup.css";
import tick from "../../utils/mdi_tick.png";
import circle from "../../utils/Ellipse 57.png";

import log from "../../utils/top-logo.jpeg";
import head from "../../utils/Group 302.png";
import pelli from "../../utils/Pellisambandalu 1.png";





// import axios from 'axios';
const SignUp = ({signupState,setSignedUp}) => {
    const [modal, setModal] = useState(false);
    const [successModal,setSuccessModal]=useState(false)
    const [displayerr,setDisplayErr]=useState(false)

    const toggle = () => {
        setModal(!modal)
        setFormData({userEmail: "",
            userPass: "",
            repeatPass: "",
            fullname: "",
            mobile: "",
            gender: "I am",
            otp: "",})
        
    };

    const toggleSuccesfull=()=>{
        
        if(formData.otp!==""){
            setDisplayErr(false)
            setSuccessModal(!successModal);
            setModal(false)
        }
        else{
            setDisplayErr(true)
            setSuccessModal(false)
            setModal(true)
            
        }
        
    }

    const [btnCondition, setBtnConditon] = useState(true);

    const [passwordError, setPasswordError] = useState('');

    const [rePassError, setRePassError] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [otpError, setOtpError] = useState(false);

    const myRef = useRef(null);

    const [isChecked, setIsChecked] = useState(false);
    
    const [formData, setFormData] = useState({
        userEmail: "",
        userPass: "",
        repeatPass: "",
        fullname: "",
        mobile: "",
        gender: "I am",
        otp: "",

    })
    const [emailIdError, setEmailIdError] = useState(false)
    const [repeatpassError, setRepeatPassError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [value, setValue] = useState('');
    const [token, setToken] = useState("")
    const [fullNameError, setFullNameError] = useState(false)
    const [numError, setNumError] = useState(false)
    const [genderError, setGenderError] = useState("")
    const [displayOtp, setdisplayOtp] = useState(false)
    const [width,setWidth]=useState(window.innerWidth)
    

    useEffect(() => {
        if (formData.userEmail == "" && formData.fullname == "" && formData.gender == "" && formData.mobile == "" && formData.userPass == "", formData.repeatPass == "") {
            setBtnConditon(true)
        }
        else {
            setBtnConditon(false)
        }
    }, [formData])
    
    useEffect(()=>{
        const update=()=>{
            setWidth(window.innerWidth)
            
        }
         window.addEventListener("resize",update)
         return () => window.removeEventListener("resize", update)
    },[])
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

    };

    const togglePasswordVisibilities = () => {
        setRePassError(!rePassError)

    }
    const navigator = useHistory()
    const onNext=()=>{

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setdisplayOtp(true)
        
        
        if (formData.userPass !== formData.repeatPass) {
            setPasswordError('Passwords do not match');
            setdisplayOtp(false)

        }
        else if (formData.userPass.length < 8 || formData.repeatPass.length < 8) {
            if (formData.userEmail == "" && formData.userPass == "" && formData.repeatPass == "") {
                setPasswordError("please fill all details")
            }
            else {
                setPasswordError("password must be minimum 8 charecters")
            }

        }
        else if(formData.mobile.length!==10){
            setNumError("please enter valid 10 digit mobile number")
            setdisplayOtp(false)
        }



        else {

            setPasswordError('');
            setOtpError(false)
            setNumError("")
            setdisplayOtp(true)
            setSignedUp(true)
            setFormData({userEmail: "",
                userPass: "",
                repeatPass: "",
                fullname: "",
                mobile: "",
                gender: "I am",
                otp: "",})
            
            
        };


        }


    
    const onCheck = (e) => {
        setIsChecked(e.target.checked)
    }


    const handleBlur = (e) => {

        switch (e.target.name) {
            case "userEmail":
                setEmailIdError(e.target.value == "")
                break;
            case "userPass":
                setPassError(e.target.value == "")
                break;
            case "repeatPass":
                setRepeatPassError(e.target.value == "")
                break;
            case "mobile": {
                    setNumError(e.target.value == "")
                break;
            }
            case "fullname": {
                    setFullNameError(e.target.value == "")
                break;
            }
            case "gender": {
                    setGenderError(e.target.value == "")
                break;
            }
            default:
                break;
        }
    }
    const handleOtp = () => {
        navigator.push('/dashboard')
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };
    const onsending = () => {
        if (formData.mobile.length === 10) {
            alert("otp sent successfully")
        }
        setdisplayOtp(formData.mobile.length === 10)

    }
    const onsubmitt = () => {
        if (formData.otp !== "") {
            alert("otp verified succsessfully")
            navigator.push("/dashboard")
        }
    }
    
    const closeBtn = (
        <button className="close" onClick={toggleSuccesfull} type="button">
         &times;
        </button>
      );


    return (

        <div className='main-cont'>
            <img src={log} className='top-logo' />
           
            <Modal isOpen={modal} toggle={toggle} >
            <ModalBody className="popup" >
                <h5 className='otp-head'>OTP Verification</h5>
                <p className='otp-para'>One - Time password sent to your registered mobile number</p>
                <input type='text' className='otp-input' value={formData.otp} name='otp' onChange={handleChange} placeholder='Enter Otp'/>
                {displayerr&&<p></p>}
                {displayerr&&<p style={{color:"red"}}>please enter received otp</p>}
                <p className='didnt'>Didn’t receive the OTP?<span className='didnt-span'>Resend OTP</span></p>
                <button className='verify-button' onClick={toggleSuccesfull}>
            Verify
          </button>
            
        </ModalBody>
            
      </Modal>
        <div >
        <Modal isOpen={successModal} size='sm'   toggle={toggle} >
      <ModalHeader toggle={toggleSuccesfull} close={closeBtn}></ModalHeader>
            <ModalBody className='verify-modal'>
                <div style={{position:"relative"}}>
                <img src={circle}   />
                <img src={tick} style={{position:"absolute",top:"1vh",left:"1vw"}}/>
                </div>
                
                <h5 className='verified-head'>Verified Successfully </h5>
                <p className='verified-para'>Your mobile number has been 
                successfully verified</p>
                
            
        </ModalBody>
            
      </Modal>
            
        </div>
     
            <form onSubmit={handleSubmit} className='forms'>
                <h1 className='star'>Signup</h1>
                <p> </p>

                <div className='fullname-cont'>
                    <Input placeholder='Full Name' bsSize="lg" className="form-control genderss" type='text' onChange={handleChange} value={formData.fullname} name='fullname' onBlur={handleBlur} required title='full name is required' />

                    {formData.fullname == "" ? <p className='req'>*</p> : null}
                </div>
                {fullNameError && <p className='fullname-error'>please enter your full name</p>}
                {formData.fullname == "" && displayOtp && <p className='fullname-error'>please enter your full name</p>}
                {!fullNameError && <p> </p>}
                <div className='fullname-cont'>
                    <Input type='select' className="form-control genderss select option place" value={formData.gender} onChange={handleChange} name="gender">
                    <option value="" >
                            I am
                        </option>
                        <option value="male" className="opt-color">
                            male
                        </option>
                        <option value="female" className="opt-color">
                            female
                        </option>
                        <option value="others" className="opt-color">
                            others
                        </option>
                    </Input>
                    
                    {formData.gender == "I am" ? <p className='req-iam'>*</p> : null}
                </div>
                {genderError && <p className='fullname-error'>please select a gender</p>}
                <p> </p>
                <div className='fullname-cont'>
                    <Input bsSize="lg" type='email' className="form-control genderss" onChange={handleChange} value={formData.userEmail} name='userEmail' onBlur={handleBlur} placeholder='Email Id' required />

                    {formData.userEmail == "" ? <p className='req-email'>*</p> : null}
                </div>
                {emailIdError ? <p className='email-error'>please enter email id</p> : null}

                {!emailIdError && <p> </p>}

                <div className='fullname-cont'>
                    <Input bsSize="lg" className="form-control genderss" type={showPassword ? 'text' : 'password'} id="passwo" onChange={handleChange} onBlur={handleBlur} name='userPass' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"   value={formData.userPass} placeholder='Password' required />
                    {formData.userPass == "" ? <p className='req-pass'>*</p> : null}
                    {passError && <p className='email-error' >please enter a password</p>}
                    {!passError && <p> </p>}
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={`${showPassword?"eye-icon-1":"eye-icon-2"}`}
                        style={showPassword?{position: "absolute",
                            right: "10px",
                            top: "25%",
                            transform: "translateY(-35%)",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            outline: "none"}:{position: "absolute",
                                right: "10px",
                                top: "45%",
                                transform: "translateY(-85%)",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                outline: "none"}}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div className='password-cont'>
                    <div>
                        <Input bsSize="lg" className="form-control genderss" type={rePassError ? 'text' : 'password'} id="reenter" onChange={handleChange} onBlur={handleBlur} name='repeatPass' value={formData.repeatPass} placeholder='Re-enter password' required />
                        {formData.repeatPass == "" ? <p className='req-repeat'>*</p> : null}
                    </div>
                    {repeatpassError ? <p className='email-error'>please re enter your password</p> : null}
                    {!repeatpassError && <p> </p>}
                    <button
                        type="button"
                        onClick={togglePasswordVisibilities}
                        style={showPassword?{position: "absolute",
                            right: "10px",
                            top: "25%",
                            transform: "translateY(-35%)",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            outline: "none"}:{position: "absolute",
                                right: "10px",
                                top: "45%",
                                transform: "translateY(-85%)",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                outline: "none"}}
                    >
                        {rePassError ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {passwordError && <div className='pass-err'>{passwordError}</div>}
                <div className='number-cont'>
          
                <Input placeholder='+91' className="form-control genderss country"/>
                <Input bsSize="lg" className="form-control genderss number" type='number' onChange={handleChange} value={formData.mobile} name='mobile' onBlur={handleBlur} placeholder='Enter Number' required  />
                </div>
                {numError&& <div className='pass-err'>{numError}</div>}
                <p> </p>
              
                <br/>
                <br/>
                <div className='check'>
                    <input type='checkbox' onChanged={onCheck} value={isChecked} className={`${displayOtp?"check-1":"check-2"}`}  />
                    <div>
                        <p> I agree to <span className='span-class'>terms</span> & <span className='span-class'>privacy policy</span></p>

                    </div>
                </div>

                {displayOtp && <p> </p>}

                 <Button className='form next-button'
                    type='submit'
                    disabled={btnCondition}
                    onClick={toggle}
                >
                    Signup
                </Button>


                <p> </p>

                <p className="already">
                    Already have an account? <span><a href='/login'className='already-login'>Login</a></span></p>
                    
            </form>
            {width>900 && <div className='right-bg'>
        <div className='right-bg-row'>
           <h5 className='right-bg-head'>Welcome back to </h5>
           <img src={pelli} className='pellisambandalu'/>
        </div>
           <p className='right-bg-para'>Our expert team provides comprehensive planning and personalized services to ensure your special day is perfect. Trust us to turn your dream wedding into reality. Contact us today!</p>
            </div>}
            
              
        </div>
    )
}

export default SignUp;
