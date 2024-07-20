import React, { useState } from 'react'
import './Login.scss'
import { Button, Input, Form, FormFeedback, FormGroup, Col } from 'reactstrap';
import { Button, Input, Form, FormFeedback, FormGroup, Col } from 'reactstrap';
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from '../../utils/constants';
import ForgotPage from '../Forgot/ForgotPage';
import { useHistory } from "react-router-dom";
import {validateEmail} from "../../utils/validation"
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [emailValid, setEmailValid]= useState(true)
    const handleeyebtn = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
    }
    const toggle = () => setModal(!modal);
    const handleLogin = () => {
        history.push('/dashboard');
    }
    const handleemail=(e)=>{
        if(validateEmail(e.target.value)){
            setEmailValid(true)
        } else{
            setEmailValid(false)
        }

    }
    return (
        <div className='bcgimg'>
            <Form className='loginContent'>
                <h3 className="d-flex justify-content-center align-items-center loginhead">{login.login}</h3>
                <FormGroup className='mt-4 d-flex justify-content-center align-items-center '>
                    <Col sm={9} className='letterIconplace'>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder={login.emailPlaceholder}
                            onChange={handleemail}
                            type="email"
                            className='emailinput'
                            invalid = {!emailValid}
                        />
                        {emailValid? <FaEnvelope color='#d3d3d3' className='emailicon' /> :   <FormFeedback>
                            Please Enter a Valid Email
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
                            className='emailinput'
                            required
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
                            className=' text-decoration-none pl-1 cButton loginhead'
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
                > <span className='fitWidth'> {login.noAccount}</span>
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