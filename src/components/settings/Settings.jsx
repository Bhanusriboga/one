import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FaArrowLeft } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { validateEmail,validatePhoneNumber } from "../../utils/validation";
import {logout as logoutAction} from "../../redux/slices/AuthSlice";
import { settings } from '../../utils/constants';
import DeleteAlert from './inner-components/DeleteAlert';
import "./Settings.scss"
import { requestEmailOtp, requestMobileOtp, verifyMobileOtp,changePassword,deleteAccount,verifyEmailOtp} from '../../redux/slices/Settings';
import { toast } from 'react-toastify';

const Settings = (props) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newMail, setNewMail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpPhone, setOtpPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showOtpPhone, setShowOtpPhone] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const dispatch=useDispatch() ;
  const handleCancel = () => {
    setShowAlert(false);
  };
  const handleDelete = () => {
    setShowAlert(true);
  }
  const handleDeleteConfirm = async() => { 
    // need to call delete api
  const data= await dispatch(deleteAccount(deleteReason));
  if("User Profile Deleted Successfully"===data?.payload?.message){
    toast.success("Account deleted successfully")
    setShowAlert(false);
    logout();
  }else{
    toast.error("Something went wrong..!")
  }
  };
  const handleInputChange = (setter) => (event) => setter(event.target.value);

  const handleEmailVerify = (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      if(sendOtp()){
        setEmailError('');
        setShowOtp(true);
      }else{
        toast.error("Something went wrong..!")
      }
    } else {
      setEmailError(settings.validEmailError);
    }
  };

  const handlePhoneVerify = (event) => {
    event.preventDefault();
    if (validatePhoneNumber(phone)) { 
      if(sendOtpPhone()){
        setPhoneError('');
        setShowOtpPhone(true);
      }else{
        toast.error("Something went wrong..!")
      }
    } else {
      setPhoneError(settings.validPhoneError);
    }
  };

  const sendOtp = async() => {
    // Add OTP sending logic here
    const data=await dispatch(requestEmailOtp(email));
    return data?.data?.message=="OTP sent to email successfully";
  };

  const sendOtpPhone = async() => {
    // Add OTP sending logic here
    const data=await dispatch(requestMobileOtp(phone));
    return data?.data?.message=="OTP sent to mobile successfully";
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (email) {
      if(!validateEmail(email)) {
        setEmailError('Invalid Email');
      }
      else if (showOtp && !/^\d{6}$/.test(otp)) {
        setEmailError(settings.otpError);
      } else {
        //api call for email change
        const data=await dispatch(verifyEmailOtp({newMail,otp}));
        if("OTP verified Successfully"===data?.payload?.message){
          toast.success("Email updated successfully")
          setEmailError('');
        }else{
          toast.error("Something went wrong..!")
        }
      }
    }

    if (phone) {
      if(!validatePhoneNumber(phone)) {
        setPhoneError('Invalid Phone Number');
      }
      else if (showOtpPhone && !/^\d{6}$/.test(otpPhone)) {
        setPhoneError(settings.otpError);
      } else {
        //api call for phone number change
        setPhoneError('');
       const data= await dispatch(verifyMobileOtp({newPhone,otpPhone}));
       if("OTP verified Successfully"===data?.payload?.message?.message){
          toast.success("Mobile number updated successfully")
       }else{
          toast.error("Something went wrong..!")
       }
      }
    }

    if (currentPassword !== "") {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setPasswordError(settings.passwordFieldsError);
      } else if (newPassword !== confirmPassword) {
        setPasswordError(settings.passwordMatchError);
      } else {
        //api call for password change
        const data=await dispatch(changePassword({currentPassword,newPassword}));
        if("Password Changed Successfully"==data?.payload?.message){
          toast.success("Password changed successfully")
        }else{
          toast.error(data?.payload?.message=="Invalid Password"?"Invalid Password":"Something went wrong..!")
        }
        setPasswordError('');
      }
    }
  };

  const logout = async() => {
   await dispatch(logoutAction());
  };

  const emailFields = [
    {
      id: 'email',
      type: 'email',
      placeholder: settings.emailPlaceholder,
      value: email,
      onChange: handleInputChange(setEmail),
      label: settings.emailLabel
    },
    showOtp && {
      id: 'otp',
      type: 'text',
      placeholder: settings.otpPlaceholder,
      value: otp,
      onChange: handleInputChange(setOtp),
      maxLength: 6
    },
    showOtp && {
      id: 'new-mail',
      type: 'text',
      placeholder: settings.newMailPlaceholder,
      value: newMail,
      onChange: handleInputChange(setNewMail),
    }
  ].filter(Boolean);

  const phoneFields = [
    {
      id: 'phone',
      type: 'text',
      placeholder: settings.phonePlaceholder,
      value: phone,
      onChange: handleInputChange(setPhone),
      label: settings.phoneLabel,
      maxLength: 10
    },
    showOtpPhone && {
      id: 'otpPhone',
      type: 'text',
      placeholder: settings.otpPlaceholder,
      value: otpPhone,
      onChange: handleInputChange(setOtpPhone),
      maxLength: 6
    },
    showOtpPhone && {
      id: 'new-phone',
      type: 'text',
      placeholder: settings.newPhonePlaceholder,
      value: newPhone,
      onChange: handleInputChange(setNewPhone),
      maxLength: 10
    }
  ].filter(Boolean);

  const passwordFields = [
    { id: 'currentPassword', type: 'password', placeholder: settings.currentPasswordPlaceholder, value: currentPassword, onChange: handleInputChange(setCurrentPassword) },
    { id: 'newPassword', type: 'password', placeholder: settings.newPasswordPlaceholder, value: newPassword, onChange: handleInputChange(setNewPassword) },
    { id: 'confirmPassword', type: 'password', placeholder: settings.confirmPasswordPlaceholder, value: confirmPassword, onChange: handleInputChange(setConfirmPassword) }
  ];

  return (
    <>
    {showAlert && <DeleteAlert onCancel={handleCancel} onDelete={handleDeleteConfirm} />}
      <Container fluid className={showAlert ? 'blur' : ''}>
        <div className='d-flex justify-content-left align-items-center gap-1'>
          <FaArrowLeft color='#780024' onClick={() => props.setActiveContent('')} size={20} className='arrow'/>
          <h1 className="title" data-testid="settings">{settings.settingsTitle}</h1>
        </div>
      <Form onSubmit={handleSubmit}>
        <section>
          <h2 className="subTitle">{settings.changeEmailTitle}</h2>
          {emailFields.map(({ id, type, placeholder, value, onChange, label, maxLength }) => (
            <FormGroup key={id}>
              {label && <Label for={id}>{label}</Label>}
              <div className='email-parent'>
                <input
                  type={type}
                  id={id}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  className={`${id !== 'email' ? 'input-otp' : 'input-email'} ${emailError && 'error'}`}
                  maxLength={maxLength}
                />
                {id === 'email' && (
                  <Button onClick={handleEmailVerify} className='verify bg-transparent h-75 d-flex align-items-center justify-content-center' data-testid="email-verify">
                    {settings.verifyButton}
                  </Button>
                )}
              </div>
              {id === 'email' && emailError && <div className="error-message">{emailError}</div>}
            </FormGroup>
          ))}
        </section>
       
        <section>
          <h2 className="subTitle">{settings.changePasswordTitle}</h2>
          {passwordFields.map(({ id, type, placeholder, value, onChange }) => (
            <FormGroup key={id} className='email-parent'>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`input-email input-style ${passwordError && 'error'}`}
              />
            </FormGroup>
          ))}
          {passwordError && <div className="error-message">{passwordError}</div>}
          
        </section>
        <section className="mt-2">
          <h2 className="subTitle">{settings.changePhoneTitle}</h2>
          {phoneFields.map(({ id, type, placeholder, value, onChange, label, maxLength }) => (
            <FormGroup key={id}>
              {label && <Label for={id}>{label}</Label>}
              <div className='email-parent'>
                <input
                  type={type}
                  id={id}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  className={`${id !== 'phone' ? 'input-otp' : 'input-email'} ${phoneError && 'error'}`}
                  maxLength={maxLength}
                />
                {id === 'phone' && (
                  <Button onClick={handlePhoneVerify} className='verify bg-transparent h-75 d-flex align-items-center justify-content-center' data-testid="phone-verify">
                    {settings.verifyButton}
                  </Button>
                )}
              </div>
              {id === 'phone' && phoneError && <div className="error-message">{phoneError}</div>}
            </FormGroup>
          ))}
        </section>
        <section>
          <h2 className="subTitle">{settings.deleteProfileTitle}</h2>
            <FormGroup>
              <div>{settings.deleteProfileCheckboxLabel}</div>
              <div className="radio-container">
                <Input
                  type="radio"
                  id="married"
                  name="deleteReason"
                  value={settings.foundAMatch}
                  checked={deleteReason === settings.foundAMatch}
                  onChange={handleInputChange(setDeleteReason)}
                />
                <Label for="married" className='radio-label'>{settings.foundAMatch}</Label>
              </div>
              <div className="radio-container">
                <Input
                  type="radio"
                  id="notInterested"
                  name="deleteReason"
                  value={settings.financeIssue}
                  checked={deleteReason === settings.financeIssue}
                  onChange={handleInputChange(setDeleteReason)}
                />
                <Label for="notInterested" className='radio-label'>
                  {settings.notInterestedLabel}
                </Label>
              </div>
              <div className="radio-container">
                <Input
                  type="radio"
                  id="trustIssues"
                  name="deleteReason"
                  value={settings.trustIssue}
                  checked={deleteReason === settings.trustIssue}
                  onChange={handleInputChange(setDeleteReason)}
                />
                <Label for="trustIssues" className='radio-label'>{settings.trustIssue}</Label>
              </div>
            </FormGroup>
              {deleteReason && <button onClick={handleDelete} className='logout logout-design'>
                {settings.deleteBtn}
              </button>}
          <h2 className="subTitle">{settings.logoutTitle}</h2>
          <div>
            {settings.logoutMessage}
          </div>
          <button onClick={logout} className='logout logout-design'>
            {settings.logoutButton}
          </button>
          <div className='save-button-container'>
            <Button className='save-button' type='submit'>
              {settings.saveAllButton}
            </Button>
          </div>
        </section>
      </Form>
    </Container>
    </>
  );
};

Settings.propTypes = {
  setActiveContent: PropTypes.func.isRequired,
}
export default Settings;
