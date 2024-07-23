import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { validateEmail } from "../../utils/validation";
import { settings } from '../../utils/constants';
import "./Settings.scss"
import DeleteAlert from './inner-components/DeleteAlert';
const Settings = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newMail, setNewMail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [profilePrivacy, setProfilePrivacy] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleCancel = () => {
    setShowAlert(false);
  };
  const handleDelete=()=>{
      setShowAlert(true);
      // need to call delete api
  }
  const handleDeleteConfirm = () => { 
    setShowAlert(false);
  };
  const handleInputChange = (setter) => (event) => setter(event.target.value);
  const handleCheckboxChange = (setter) => (event) => setter(event.target.checked);

  const handleEmailVerify = (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      setEmailError('');
      setShowOtp(true);
      sendOtp();
    } else {
      setEmailError(settings.validEmailError);
    }
  };

  const sendOtp = () => {
    // Add OTP sending logic here
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(deleteProfile){
      setShowAlert(true);
    }
    else if (email) {
      if (showOtp && !/^\d{6}$/.test(otp)) {
        setEmailError(settings.otpError);
      } else {
        setEmailError('');
      }
    }
    if (currentPassword !== "") {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setPasswordError(settings.passwordFieldsError);
      } else if (newPassword !== confirmPassword) {
        setPasswordError(settings.passwordMatchError);
      } else {
        setPasswordError('');
      }
    }
  };

  const logout = () => {
    // Add logout logic here
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

  const passwordFields = [
    { id: 'currentPassword', type: 'password', placeholder: settings.currentPasswordPlaceholder, value: currentPassword, onChange: handleInputChange(setCurrentPassword) },
    { id: 'newPassword', type: 'password', placeholder: settings.newPasswordPlaceholder, value: newPassword, onChange: handleInputChange(setNewPassword) },
    { id: 'confirmPassword', type: 'password', placeholder: settings.confirmPasswordPlaceholder, value: confirmPassword, onChange: handleInputChange(setConfirmPassword) }
  ];

  return (
    <>
    {showAlert&&<DeleteAlert onCancel={handleCancel} onDelete={handleDeleteConfirm} />}
    <Container fluid className={showAlert?'blur':''}>
      <h1 className="title" data-testid="settings">{settings.settingsTitle}</h1>
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
                  <Button onClick={handleEmailVerify} className='verify bg-transparent h-75 d-flex align-items-center justify-content-center'>
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
            <FormGroup key={id}>
              <Input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`input-style ${passwordError && 'error'}`}
              />
            </FormGroup>
          ))}
          {passwordError && <div className="error-message">{passwordError}</div>}
          <Button className='save-button' onClick={handleSubmit}>
            {settings.savePasswordButton}
          </Button>
        </section>
        <section>
          <h2 className="subTitle">{settings.profilePrivacyTitle}</h2>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" checked={profilePrivacy} onChange={handleCheckboxChange(setProfilePrivacy)} />{' '}
              {settings.profilePrivacyLabel}
            </Label>
          </FormGroup>
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
                  value="married"
                  checked={deleteReason === 'married'}
                  onChange={handleInputChange(setDeleteReason)}
                />
                <Label for="married" className='radio-label'>{settings.marriedLabel}</Label>
              </div>
              <div className="radio-container">
                <Input
                  type="radio"
                  id="notInterested"
                  name="deleteReason"
                  value="notInterested"
                  checked={deleteReason === 'notInterested'}
                  onChange={handleInputChange(setDeleteReason)}
                />
                <Label for="notInterested" className='radio-label'>
                  {settings.notInterestedLabel}
                </Label>
              </div>
            </FormGroup>
              {deleteReason&&<button onClick={handleDelete} className='logout logout-design'>
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

export default Settings;
