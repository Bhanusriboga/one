import React, { useState } from 'react'
import './Login.scss'
import { Button, Input, Form, FormFeedback, FormGroup, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";

import { login, toastError, toastsuccess } from "../../utils/constants";
import { toast } from "react-toastify";
import { validatePhoneNumber } from "../../utils/validation";
import { userLogin } from "../../redux/slices/AuthSlice";
import "./Login.scss";
import ForgotPassword from '../Forgot/ForgotPassword';
import {LoginBack,LogoText,WelcomeText} from '../../commonSyles/LoginStyles.js'
import { pelli } from '../Signup/assets/index.js';
import { useHistory } from 'react-router-dom';
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory()
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
  const handleSignUp =()=>{
    history.push('/signUp')
  }
  const handleLogin = async () => {
    const logindata = await dispatch(userLogin({ mobileNumber: mobile, password }));
    if (logindata?.payload.jwt === "" || logindata?.payload.jwt === null || logindata?.payload.jwt === undefined) {
      toast.error("Invalid Credentials",toastError);
    } else {
      toast.success("Login Successful",toastsuccess);
    }
  }

  const handleMobile = (event) => {
    if (validatePhoneNumber(event.target.value)) {
      setMobileValid(true);
    } else {
      setMobileValid(false);
    }
    setMobile(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <LoginBack>
      <Form className="loginContent">
      <WelcomeText>Welcome back to <LogoText>  <img src={pelli} alt="Pelli Sambandalu" className='pellilogo' /></LogoText></WelcomeText>
        <h3 className="d-flex justify-content-center align-items-center loginhead">
          {login.login}
        </h3>
        <FormGroup className="mt-4 d-flex justify-content-center align-items-center ">
          <Col sm={9} className="letterIconplace">
            <Input
              id="exampleMobile"
              name="mobile"
              placeholder={login.mobilePlaceholder}
              onChange={handleMobile}
              value={mobile}
              type="number"
              className="mobileinput"
              invalid={!mobileValid}
            />
            <FaPhone color="#d3d3d3" className="emailicon" />
            {mobileValid && (
              <FormFeedback>Please Enter a Valid Mobile Number</FormFeedback>
            )}
          </Col>
        </FormGroup>
        <div className="d-flex justify-content-center mb-0">
          <Col sm={9} className="letterIconplace">
            <Input
              id="Password"
              name="password"
              placeholder={login.passwordPlaceholder}
              type={showPassword ? "text" : "password"}
              className="mobileinput"
              required
              onChange={handlePassword}
              value={password}
            />
            <button className="eyebutton" onClick={handleeyebtn}>
              {showPassword ? (
                <FaEye color="#d3d3d3" />
              ) : (
                <FaEyeSlash color="#d3d3d3" />
              )}
            </button>
          </Col>
        </div>
        <FormGroup row className="d-flex justify-content-center w-100">
          <Col sm={9} className="d-flex justify-content-end forgotwidth">
            <Button
              color="link"
              onClick={toggle}
              className="text-decoration-none pl-1 cButton loginhead">
              {login.forgot}
            </Button>
          </Col>
        </FormGroup>
        <FormGroup
          check
          row
          className="d-flex justify-content-center align-items-center p-0 w-100">
          <Button
            tag="a"
            className="w-25 mt-2 rounded-pill btnback"
            size="lg"
            onClick={handleLogin}>
            {login.login}
          </Button>
        </FormGroup>
        <FormGroup className="d-flex justify-content-center align-items-center p-4 loginhead">
          {" "}
          <span className="fitWidth text-black"> {login.noAccount}</span>
          <Button
            color="link"
            onClick={handleSignUp}
            tag="a"
            className="text-decoration-none p-0 cButton loginhead signupbtn">
            {login.signup}
          </Button>
        </FormGroup>
      </Form>
      <ForgotPassword modal={modal} toggle={toggle} />
    </LoginBack>
  );
};

export default LoginPage;
