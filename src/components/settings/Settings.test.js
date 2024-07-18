import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Settings';

describe('Settings Component', () => {
  beforeEach(() => {
    render(<Settings />);
  });

  test('shows error when verifying email without input', () => {
    const verifyButton = screen.getByText('Verify');
    fireEvent.click(verifyButton);
    const emailInput = screen.getByPlaceholderText('accumenta@gmail.com');
    expect(emailInput).toHaveClass('error');
    const emailError = screen.getByText('Please enter a valid email address');
    expect(emailError).toBeInTheDocument();
  });

  test('changes email and verifies', () => {
    const emailInput = screen.getByPlaceholderText('accumenta@gmail.com');
    const verifyButton = screen.getByText('Verify');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    fireEvent.click(verifyButton);
    const otp = screen.getByPlaceholderText('Enter OTP');
    expect(otp).toBeInTheDocument();
  });

  test('shows error when submitting invalid OTP', () => {
    const emailInput = screen.getByPlaceholderText('accumenta@gmail.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const verifyButton = screen.getByText('Verify');
    fireEvent.click(verifyButton);

    const otpInput = screen.getByPlaceholderText('Enter OTP');
    fireEvent.change(otpInput, { target: { value: '123' } });

    const saveButton = screen.getByText('Save All');
    fireEvent.click(saveButton);

    const emailError = screen.getByText('OTP must be a 6-digit number');
    expect(emailError).toBeInTheDocument();
    expect(otpInput).toHaveClass('error');
  });

  test('changes password fields', () => {
    const currentPasswordInput = screen.getByPlaceholderText('Enter Current Password');
    const newPasswordInput = screen.getByPlaceholderText('Enter New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });

    expect(currentPasswordInput.value).toBe('currentPassword123');
    expect(newPasswordInput.value).toBe('newPassword123');
    expect(confirmPasswordInput.value).toBe('newPassword123');
  });

  test('shows error when submitting password fields without filling all details', () => {
    const saveButton = screen.getByText('Save Password');
    fireEvent.click(saveButton);

    const passwordError = screen.getByText('All password fields are required');
    expect(passwordError).toBeInTheDocument();
  });

  test('shows error when new password and confirm password do not match', () => {
    const currentPasswordInput = screen.getByPlaceholderText('Enter Current Password');
    const newPasswordInput = screen.getByPlaceholderText('Enter New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword123' } });

    const saveButton = screen.getByText('Save Password');
    fireEvent.click(saveButton);

    const passwordError = screen.getByText('New Password and Confirm Password do not match');
    expect(passwordError).toBeInTheDocument();
  });

  test('toggles profile privacy', () => {
    const privacyCheckbox = screen.getByLabelText('Let others know that I shortlisted their profile');
    fireEvent.click(privacyCheckbox);
    expect(privacyCheckbox.checked).toBe(true);
    fireEvent.click(privacyCheckbox);
    expect(privacyCheckbox.checked).toBe(false);
  });

  test('toggles delete profile and selects a reason', () => {
    const deleteProfileCheckbox = screen.getByLabelText('Please choose a reason for profile deletion');
    fireEvent.click(deleteProfileCheckbox);
    expect(deleteProfileCheckbox.checked).toBe(true);

    const marriedRadio = screen.getByLabelText('Married');
    fireEvent.click(marriedRadio);
    expect(marriedRadio.checked).toBe(true);

    const notInterestedRadio = screen.getByLabelText('Not interested');
    fireEvent.click(notInterestedRadio);
    expect(notInterestedRadio.checked).toBe(true);
  });

  test('logs out', () => {
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
  });

  test('submits form with valid data', () => {
    const emailInput = screen.getByPlaceholderText('accumenta@gmail.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const verifyButton = screen.getByText('Verify');
    fireEvent.click(verifyButton);

    const otpInput = screen.getByPlaceholderText('Enter OTP');
    fireEvent.change(otpInput, { target: { value: '123456' } });
    const newMailInput = screen.getByPlaceholderText('Enter New Mail');
    fireEvent.change(newMailInput, { target: { value: 'newtest@example.com' } });

    const currentPasswordInput = screen.getByPlaceholderText('Enter Current Password');
    const newPasswordInput = screen.getByPlaceholderText('Enter New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });

    const saveButton = screen.getByText('Save All');
    fireEvent.click(saveButton);

    // Assuming there will be no errors shown and the form will be submitted successfully
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    // expect(screen.queryByText('OTP must be a 6-digit number')).not.toBeInTheDocument();
    expect(screen.queryByText('All password fields are required')).not.toBeInTheDocument();
    expect(screen.queryByText('New Password and Confirm Password do not match')).not.toBeInTheDocument();
  });
});
