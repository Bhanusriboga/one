import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, InputGroup, InputGroupText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ForgotPassword.css'; 
import PropTypes from 'prop-types';
import topImage from '../../Assets/forgotlogo.svg';
import logout from '../../Assets/topImageforgot.png';
import { requestOtpForgetApi,otpverifyForgetApi ,changePasswordForgotApi } from '../../redux/slices/AuthSlice';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ForgotPassword = (props) => {
  const {  modal, toggle } = props
  const [formData, setFormData] = useState({
    mobile: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch()


  const [errors, setErrors] = useState({
    mobile: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setFormData({ ...formData, mobile: value });
      setErrors({ ...errors, mobile: '' });
    }
  };

  const handleOtpChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setFormData({ ...formData, otp: value });
      setErrors({ ...errors, otp: '' });
    }
  };

  const validateMobile = () => {
    if (!formData.mobile) {
      return 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      return 'Mobile number must be 10 digits';
    }
    return '';
  };

  const validateOTP = () => {
    if (!formData.otp) {
      return 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      return 'OTP must be 6 digits';
    }
    return '';
  };

  const validateNewPassword = () => {
    const password = formData.newPassword;
    if (!password) {
      return 'New password is required';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      return 'Password must include at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      return 'Password must include at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must include at least one special character';
    }
    return '';
  };

  const validateConfirmPassword = () => {
    if (!formData.confirmPassword) {
      return 'Confirm password is required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validateAllFields = () => {
    const mobileError = validateMobile();
    const otpError = validateOTP();
    const newPasswordError = validateNewPassword();
    const confirmPasswordError = validateConfirmPassword();
    
    // Check if any error exists
    const hasError = mobileError || otpError || newPasswordError || confirmPasswordError;
    
    // Enable the Save button if no errors are found and all fields are filled
    const allFieldsFilled = formData.mobile && formData.otp && formData.newPassword && formData.confirmPassword;
    
    return !hasError && allFieldsFilled;
  };

  useEffect(() => {
    setIsSaveButtonDisabled(!validateAllFields());
  }, [formData]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const mobileError = validateMobile();
    if (mobileError) {
      setErrors({ mobile: mobileError, otp: '', newPassword: '', confirmPassword: '' });
      return;
    }

    const otpError = validateOTP();
    if (otpError) {
      setErrors({ mobile: '', otp: otpError, newPassword: '', confirmPassword: '' });
      return;
    }
    const data= await dispatch(otpverifyForgetApi(formData));
    if('User registered successfully'==data?.payload?.message){
      toast.success("OTP  Verified successfully")
    }else{
      toast.error("Something went wrong..!")
    }

  };

  const handleSave = async(e) => {
    e.preventDefault();

    const mobileError = validateMobile();
    if (mobileError) {
      setErrors({ mobile: mobileError, otp: '', newPassword: '', confirmPassword: '' });
      return;
    }

    const newPasswordError = validateNewPassword();
    if (newPasswordError) {
      setErrors({ mobile: '', otp: '', newPassword: newPasswordError, confirmPassword: '' });
      return;
    }

    const confirmPasswordError = validateConfirmPassword();
    if (confirmPasswordError) {
      setErrors({ mobile: '', otp: '', newPassword: '', confirmPassword: confirmPasswordError });
      return;
    }
    const data =  await dispatch(changePasswordForgotApi(formData));
    if('Password Changed Successfully'==data?.payload?.message){
      toast.success("password updated successfully")
      toggle();
    }else{
      toast.error("Something went wrong..!")
    }

   
  };

  const handleVerify = async() => {
    const mobileError = validateMobile();
    if (mobileError) {
      setErrors({ mobile: mobileError, otp: '', newPassword: '', confirmPassword: '' });
      return;
    }
   const data=await dispatch(requestOtpForgetApi(formData))
    if ("OTP sent to mobile successfully" == data?.payload?.message) {
      toast.success('OTP sent successfully!')
    }else if("User Not Found try SignUp"==data?.payload?.message){
      toast.error("User Not Found try SignUp")
    } else {
      toast.error("Something went wrong..!")
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <img src={topImage} alt="Background" className="background-image-forgot" />
      <div className="text-center header-no-border">
        <div className="header-content1-forgot">
          <img src={logout} alt='logout' className='logout-img' />
          <h5 className="header-title">Forgot Password</h5>
        </div>
      </div>
      <span className='close-icon' onClick={toggle}>x</span>
      <ModalBody className="modal-body-forgot" >
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="mobile" className="d-block text-center mb-10">
              Enter your mobile number to reset your password
            </Label>
            <InputGroup className='forget-input'>
              <Input
                type="tel"
                name="mobile"
                id="mobile"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleMobileChange}
                inputMode="numeric"
                maxLength="10"
                className={`input-field ${errors.mobile ? 'is-invalid' : ''}`}
              />
              <InputGroupText>
                <span onClick={handleVerify} style={{ cursor: 'pointer' }}>Verify</span>
              </InputGroupText>
            </InputGroup>
            {errors.mobile && <div className="invalid-feedback d-block">{errors.mobile}</div>}
          </FormGroup>
          <FormGroup className="d-flex align-items-center forget-input">
            <Input
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleOtpChange}
              inputMode="numeric"
              maxLength="6"
              className={`input-field otp-input ${errors.otp ? 'is-invalid' : 'forget-input'}`}
            />
            <Button className="submit-button" type="submit">Submit</Button>
          </FormGroup>
          {errors.otp && <div className="invalid-feedback d-block">{errors.otp}</div>}
        </Form>
        <Form onSubmit={handleSave}>
          <FormGroup >
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`input-field mb-10 ${errors.newPassword ? 'is-invalid' : 'forget-input'}`}
            />
            {errors.newPassword && <div className="invalid-feedback d-block">{errors.newPassword}</div>}
          </FormGroup>
          <FormGroup className='forget-input'>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`input-field mb-10 ${errors.confirmPassword ? 'is-invalid' : 'forget-input'}`}
            />
            {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
          </FormGroup>
          <Button block className="save-button" type="submit" disabled={isSaveButtonDisabled}>Save</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};
ForgotPassword.propTypes = {
  modal: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ForgotPassword;
