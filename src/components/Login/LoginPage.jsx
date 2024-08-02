import React, {  useState } from 'react'
import { Button, Input, Form, FormFeedback, FormGroup, Col } from 'reactstrap';
import {  useDispatch } from 'react-redux';
import { FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPage from '../Forgot/ForgotPage';
import { login } from '../../utils/constants';
import {toast} from "react-toastify"
import { validatePhoneNumber } from "../../utils/validation"
import { userLogin } from '../../redux/slices/AuthSlice';
import './Login.scss'

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [modal, setModal] = useState(false);
    const [mobileValid, setMobileValid] = useState(true)
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const dispatch = useDispatch()
    const handleeyebtn = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
    }

    const toggle = () => setModal(!modal);

    const handleLogin = async () => {
       const logindata= await dispatch(userLogin({ mobileNumber:mobile, password }));
       if(logindata?.payload.jwt === "" || logindata?.payload.jwt === null || logindata?.payload.jwt === undefined){
        toast.error("Invalid Credentials",
            {
                position:"top-center",
                autoClose:2000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:false,
            });
       }else{
        toast.success("Login Successful",
            {
                position:"top-center",
                autoClose:2000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:false,
            });
       }
    }

    const handleMobile = (event) => {
        if (validatePhoneNumber(event.target.value)) {
            setMobileValid(true)
        } else {
            setMobileValid(false)
        }
        setMobile(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className='bcgimg'>
            <Form className='loginContent'>
                <h3 className="d-flex justify-content-center align-items-center loginhead">{login.login}</h3>
                <FormGroup className='mt-4 d-flex justify-content-center align-items-center '>
                    <Col sm={9} className='letterIconplace'>
                        <Input
                            id="exampleMobile"
                            name="mobile"
                            placeholder={login.mobilePlaceholder}
                            onChange={handleMobile}
                            value={mobile}
                            type="number"
                            className='mobileinput'
                            invalid={!mobileValid}
                        />
                        <FaPhone color='#d3d3d3' className='emailicon' />
                        {!mobileValid && <FormFeedback>
                            Please Enter a Valid Mobile Number
                        </FormFeedback>}
                    </Col>
                </FormGroup>
                <div className='d-flex justify-content-center mb-0'>
                    <Col sm={9} className='letterIconplace'>
                        <Input
                            id="Password"
                            name="password"
                            placeholder={login.passwordPlaceholder}
                            type={showPassword ? 'text' : 'password'}
                            className='mobileinput'
                            required
                            onChange={handlePassword}
                            value={password}
                        />
                        <button className='eyebutton' onClick={handleeyebtn}>{showPassword ? <FaEye color='#d3d3d3' /> : <FaEyeSlash color='#d3d3d3' />}</button>
                    </Col>
                </div>
                <FormGroup
                    row
                    className='d-flex justify-content-center'
                >
                    <Col sm={9} className='d-flex justify-content-end forgotwidth'>
                        <Button
                            color='link'
                            onClick={toggle}
                            className='text-decoration-none pl-1 cButton loginhead'
                        >
                            {login.forgot}
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup
                    check
                    row
                    className='d-flex justify-content-center align-items-center p-0'
                >
                    <Button
                        tag="a"
                        className='w-25 mt-2 rounded-pill btnback'
                        size="lg"
                        onClick={handleLogin}
                    >
                        {login.login}
                    </Button>
                </FormGroup>
                <FormGroup
                    className='d-flex justify-content-center align-items-center p-4 loginhead'
                > <span className='fitWidth text-black'> {login.noAccount}</span>
                    <Button
                        color='link'
                        href="/signUp"
                        tag="a"
                        className='text-decoration-none p-0 cButton loginhead signupbtn'
                    >
                        {login.signup}
                    </Button>
                </FormGroup>
            </Form >
            <ForgotPage
                modal={modal}
                toggle={toggle}
            />
        </div>
    )
}

export default LoginPage
