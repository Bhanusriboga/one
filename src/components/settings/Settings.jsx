import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Settings.css';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newMail, setNewMail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [profilePrivacy, setProfilePrivacy] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleCheckboxChange = (setter) => (e) => setter(e.target.checked);

  const handleEmailVerify = (e) => {
    e.preventDefault();
    if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailError('');
      setShowOtp(true);
      sendOtp();
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  const sendOtp = () => {
    // Add OTP sending logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (showOtp && !/^\d{6}$/.test(otp)) {
      setEmailError('OTP must be a 6-digit number');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All password fields are required');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setPasswordError('New Password and Confirm Password do not match');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Handle form submission logic
    }
  };
  const logout=()=>{

  }
  const emailFields = [
    {
      id: 'email',
      type: 'email',
      placeholder: 'accumenta@gmail.com',
      value: email,
      onChange: handleInputChange(setEmail),
      label: 'Email'
    },
    showOtp && {
      id: 'otp',
      type: 'text',
      placeholder: 'Enter OTP',
      value: otp,
      onChange: (event) => {
        if (event.target.value.match(/^[0-9]*$/)) {
          handleInputChange(setOtp(event));
        }
      },
      maxLength: 6
    },
    showOtp && {
      id: 'new-mail',
      type: 'text',
      placeholder: 'Enter New Mail',
      value: newMail,
      onChange: handleInputChange(setNewMail),
    }
  ].filter(Boolean);

  const passwordFields = [
    { id: 'currentPassword', type: 'password', placeholder: 'Enter Current Password', value: currentPassword, onChange: handleInputChange(setCurrentPassword) },
    { id: 'newPassword', type: 'password', placeholder: 'Enter New Password', value: newPassword, onChange: handleInputChange(setNewPassword) },
    { id: 'confirmPassword', type: 'password', placeholder: 'Confirm Password', value: confirmPassword, onChange: handleInputChange(setConfirmPassword) }
  ];

  return (
    <Container 
    style={{ background: '#D9D9D9', paddingBottom: '20px' }}
     fluid>
      <h1 className="title" data-testid="settings">Settings</h1>
      <Form onSubmit={handleSubmit}>
        <section>
          <h2 className="subTitle">Change your email</h2>
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
                  <button onClick={handleEmailVerify} className='logout verify'>
                    Verify
                  </button>
                )}
              </div>
              {id === 'email' && emailError && <div className="error-message">{emailError}</div>}
            </FormGroup>
          ))}
        </section>
        <section>
          <h2 className="subTitle">Change Password</h2>
          {passwordFields.map(({ id, type, placeholder, value, onChange }) => (
            <FormGroup key={id}>
              <input
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
            Save Password
          </Button>
        </section>
        <section>
          <h2 className="subTitle">Your Profile Privacy</h2>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" checked={profilePrivacy} onChange={handleCheckboxChange(setProfilePrivacy)} />{' '}
              Let others know that I shortlisted their profile
            </Label>
          </FormGroup>
        </section>
        <section>
          <h2 className="subTitle">Delete Profile</h2>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" checked={deleteProfile} onChange={handleCheckboxChange(setDeleteProfile)} />{' '}
              Please choose a reason for profile deletion
            </Label>
          </FormGroup>
          {deleteProfile && (
            <FormGroup>
              <div>Reason for deletion</div>
              <div className="radio-container">
                <Input
                  type="radio"
                  id="married"
                  name="deleteReason"
                  value="married"
                  checked={deleteReason === 'married'}
                  onChange={handleInputChange(setDeleteReason)}
                />
                <Label for="married" className='radio-label'>Married</Label>
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
                  Not interested
                </Label>
              </div>
            </FormGroup>
          )}
          <h2 className="subTitle">Log out</h2>
          <div>
            If you have any questions or need further assistance, please feel free to contact our support team
          </div>
          <button onClick={logout} className='logout logout-design'>
            Logout
          </button>
          <div className='save-button-container'>
            <Button className='save-button' type='submit'>
              Save All
            </Button>
          </div>
        </section>
      </Form>
    </Container>
  );
};

export default Settings;
