import React, { useState, useRef, useEffect } from 'react'
import { Input, Button, Label } from 'reactstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import "./signup.css";


import logo from "../../utils/Screenshot_10-6-2024_154733_.png"
import log from "../../utils/Screenshot_10-6-2024_173546_.jpeg"



// import axios from 'axios';
const SignUp = ({signupState,setSignedUp}) => {
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

    useEffect(() => {
        if (formData.userEmail == "" && formData.fullname == "" && formData.gender == "" && formData.mobile == "" && formData.userPass == "", formData.repeatPass == "") {
            setBtnConditon(true)
        }
        else {
            setBtnConditon(false)
        }
    }, [formData])
    const onSignUp = async () => {
        // const options={
        //     method: 'POST',
        //     body: JSON.stringify({
        //       title: 'foo',
        //       body: {hashedPassword},
        //       userId: 2,
        //     }), 
        //     headers: {
        //       'Content-type': 'application/json; charset=UTF-8',

        //     }
        // }
        // const resp=await fetch('https://jsonplaceholder.typicode.com/posts', options)
        //     const data= await resp.json()
        //     console.log(data)
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

    };

    const togglePasswordVisibilities = () => {
        setRePassError(!rePassError)

    }
    const navigator = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        setdisplayOtp(true)
        console.log(!displayOtp && formData.otp == "")
        //console.log(localStorage.getItem(token))

        if (formData.userPass !== formData.repeatPass) {
            setPasswordError('Passwords do not match');

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
            alert("otp sent succesfully")
            setdisplayOtp(true)
            setSignedUp(true)



        }

        console.log(formData)

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
        console.log(myRef.current)
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
    const onNext=()=>{

    }
    const onsubmitt = () => {
        if (formData.otp !== "") {
            alert("otp verified succsessfully")
            navigator.push("/dashboard")
        }
    }


    return (

        <div className='main-cont'>


            <img src={log} className='top-logo' />



            <form onSubmit={handleSubmit} className='forms'>
                <h1 className='star'>Signup</h1>
                <br />

                <div style={{ position: "relative" }}>
                    <Input placeholder='Full Name' bsSize="lg" className="form-control genderss" type='text' onChange={handleChange} value={formData.fullname} name='fullname' onBlur={handleBlur} required title='full name is required' />

                    {formData.fullname == "" ? <p className='req'>*</p> : null}
                </div>
                {fullNameError && <p style={{ color: "red", alignSelf: "flex-start" }}>please enter your full name</p>}
                {formData.fullname == "" && displayOtp && <p style={{ color: "red" }}>please enter your full name</p>}
                {!fullNameError && <br />}
                <div style={{ position: "relative" }}>
                    <select className="form-control genderss select"
                        placeholder="I am"
                        value={formData.gender} onChange={handleChange} name="gender">
                        <option style={{ color: "rgb(174, 172, 172)"}} value="">
                            I am
                        </option>
                        <option value="male" style={{ color: "black" }}>
                            male
                        </option>
                        <option value="female" style={{ color: "black" }}>
                            female
                        </option>
                        <option value="others" style={{ color: "black" }}>
                            others
                        </option>
                    </select>
                    {formData.gender == "I am" ? <p className='req-iam'>*</p> : null}
                </div>
                {genderError && <p style={{ color: "red", alignSelf: "flex-start" }}>please select a gender</p>}
                <br />
                <div style={{ position: "relative" }}>
                    <Input bsSize="lg" type='email' className="form-control genderss" onChange={handleChange} value={formData.userEmail} name='userEmail' onBlur={handleBlur} placeholder='Email Id' required />

                    {formData.userEmail == "" ? <p className='req-email'>*</p> : null}
                </div>
                {emailIdError ? <p style={{ color: "red", fontFamily: "monospace", alignSelf: "flex-start" }}>please enter email id</p> : null}

                {!emailIdError && <br />}

                <div style={{ position: "relative" }}>


                    <Input bsSize="lg" className="form-control genderss" type={showPassword ? 'text' : 'password'} id="passwo" onChange={handleChange} onBlur={handleBlur} name='userPass' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"   value={formData.userPass} placeholder='Password' required />
                    {formData.userPass == "" ? <p className='req-pass'>*</p> : null}


                    {passError && <p style={{ color: "red", fontFamily: "monospace", alignSelf: "flex-start" }}>please enter a password</p>}
                    {!passError && <br />}
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={showPassword ? {
                            position: 'absolute',
                            right: '10px',
                            top: '25%',
                            transform: 'translateY(-35%)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        } : {
                            position: 'absolute',
                            right: '10px',
                            top: '45%',
                            transform: 'translateY(-80%)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div className='password-cont'>
                    <div>
                        <Input bsSize="lg" className="form-control genderss" type={rePassError ? 'text' : 'password'} id="reenter" onChange={handleChange} onBlur={handleBlur} name='repeatPass' value={formData.repeatPass} placeholder='Re-enter password' required />
                        {formData.repeatPass == "" ? <p className='req-repeat'>*</p> : null}

                    </div>


                    {repeatpassError ? <p style={{ color: "red", fontFamily: "monospace", alignSelf: "flex-start" }}>please re enter your password</p> : null}
                    {!repeatpassError && <br />}



                    <button
                        type="button"
                        onClick={togglePasswordVisibilities}
                        style={repeatpassError ? {
                            position: 'absolute',
                            right: '10px',
                            top: '25%',
                            transform: 'translateY(-35%)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        } : {
                            position: 'absolute',
                            right: '10px',
                            top: '45%',
                            transform: 'translateY(-80%)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        {rePassError ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                <Input bsSize="lg" className="form-control genderss" type='number' onChange={handleChange} value={formData.mobile} name='mobile' onBlur={handleBlur} placeholder='Enter Number' required  />
                {numError&& <div style={{ color: 'red' }}>{numError}</div>}
                <br />

                {displayOtp && <div className='otp-cont' style={{ alignSelf: "flex-start" }}>

                    <Input bsSize="lg" className='form otpbox' style={{ borderStyle: "solid", borderWidth: "1.5px", borderColor: "grey", height: "9vh", width: "20vw" }} type="text" id="otp" onChange={handleChange} onBlur={handleBlur} name='otp' value={formData.otp} placeholder=' Enter Otp' required />
                </div>}
                <br />
                <div className='check'>
                    <input type='checkbox' onChanged={onCheck} value={isChecked} style={displayOtp ? { marginTop: "-10px", borderRadius: "10px", height: "10vh" } : { marginTop: "-12px", borderRadius: "10px", height: "10vh" }} />
                    <div>
                        <p> I agree to <span style={{ color: "blue" }}>terms</span> & <span style={{ color: "blue" }}>privacy policy</span></p>

                    </div>
                </div>

                {displayOtp && <br />}

                {displayOtp ? <Button className='form next-button'
                    type='submit'
                    onClick={onsubmitt}

                >
                    Signup
                </Button> :
                    < Button className='form next-button'
                        type='submit'
                        disabled={btnCondition}
                        onClick={onNext}>
                        Next
                    </Button>}


                <br />

                <p className="already">
                    Already have an account? <span><a href='/login' style={{ color: "rgb(121, 1, 37)" }}>Login</a></span></p>



            </form>

            <img className='imgs' src={logo} />
        </div>

    )
}

export default SignUp;
