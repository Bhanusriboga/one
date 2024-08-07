// SignUp.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SignUp from './SignUp';
import AuthSlice from '../../redux/slices/AuthSlice';
import '@testing-library/jest-dom';

// Create a mock store using configureStore
const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
  // Add additional options like middleware here if needed
});

// Mock redux actions
jest.mock('../../redux/slices/AuthSlice', () => ({
  userSignup: jest.fn(() => Promise.resolve({ payload: { message: 'OTP Verification Is Pending' } })),
  otpverify: jest.fn(() => Promise.resolve({ payload: { message: 'User registered successfully' } })),
  setToken: jest.fn(),
  reSendOtp: jest.fn(() => Promise.resolve()),
}));

// Test rendering of SignUp component
describe('SignUp Component', () => {
  test('renders SignUp component', () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    expect(screen.getByTestId('signup-title')).toBeInTheDocument();
  });
  
  // Test input changes
  test('handles input changes', () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    fireEvent.change(screen.getByTestId('fullname-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1' } });
    fireEvent.change(screen.getByTestId('repeat-password-input'), { target: { value: 'Password1' } });
    fireEvent.change(screen.getByTestId('mobile-input'), { target: { value: '1234567890' } });
    expect(screen.getByTestId('fullname-input')).toHaveValue('John Doe');
    expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
    expect(screen.getByTestId('password-input')).toHaveValue('Password1');
    expect(screen.getByTestId('repeat-password-input')).toHaveValue('Password1');
    expect(screen.getByTestId('mobile-input')).toHaveValue('1234567890');
  });
  
  // Test form submission with valid data
  test('submits form with valid data and opens OTP modal', async () => {
    // Fill out the form fields
    fireEvent.change(screen.getByTestId('fullname-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1' } });
    fireEvent.change(screen.getByTestId('repeat-password-input'), { target: { value: 'Password1' } });
    fireEvent.change(screen.getByTestId('mobile-input'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByTestId('terms-checkbox'));
  
    // Submit the form
    fireEvent.click(screen.getByTestId('signup-button'));
  
    // Wait for the OTP modal to appear
    await waitFor(() => {
      expect(screen.getByTestId('otp-modal')).toBeInTheDocument();
    });
  });
  
  
  // Test OTP verification
  test('handles OTP verification and shows success modal', async () => {
    // Mocking the dispatch responses
    jest.spyOn(AuthSlice, 'userSignup').mockImplementation(() => ({
      type: 'userSignup/fulfilled',
      payload: {
        message: 'OTP Verification Is Pending'
      }
    }));
  
    jest.spyOn(AuthSlice, 'otpverify').mockImplementation(() => ({
      type: 'otpverify/fulfilled',
      payload: {
        message: 'User registered successfully'
      }
    }));
  
    jest.spyOn(AuthSlice, 'setToken').mockImplementation(() => ({
      type: 'setToken'
    }));
  
    // Render the component
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
  
    // Fill out and submit the form
    fireEvent.change(screen.getByTestId('fullname-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1' } });
    fireEvent.change(screen.getByTestId('repeat-password-input'), { target: { value: 'Password1' } });
    fireEvent.change(screen.getByTestId('mobile-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('gender-select'), { target: { value: 'MALE' } });
    fireEvent.click(screen.getByTestId('terms-checkbox'));
  
    fireEvent.click(screen.getByTestId('signup-button'));
  
    // Wait for the OTP modal to appear
    await waitFor(() => {
      expect(screen.getByTestId('otp-head')).toHaveTextContent('OTP Verification');
      expect(screen.getByTestId('otp-para')).toHaveTextContent('One - Time password sent to your registered mobile number');
    });
  
    // Simulate entering OTP and clicking verify
    fireEvent.change(screen.getByTestId('otp-input'), { target: { value: '123456' } });
    fireEvent.click(screen.getByTestId('verify-button'));
  
    // Wait for the success modal to appear
    await waitFor(() => {
      expect(screen.getByTestId('verified-head')).toHaveTextContent('Verified Successfully');
      expect(screen.getByTestId('verified-para')).toHaveTextContent('Your mobile number has been successfully verified');
    });
  
    // Optionally verify if the token was set
    // expect(AuthSlice.setToken).toHaveBeenCalled(); // Checks if it was called at least once
    // expect(AuthSlice.setToken).toHaveBeenCalledWith('token'); // Checks if it was called with the correct argument
    expect(setTokenMock).toHaveBeenCalled();
  });
  
  
  // Test password visibility toggle
  test('should toggle password visibility', () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
  
    // Select elements
    const passwordInput = screen.getByTestId('password-input');
    const toggleButton = screen.getByTestId('toggle-visibility-button');
  
    // Ensure the initial type of the password input is 'password'
    expect(passwordInput).toHaveAttribute('type', 'password');
  
    // Click the toggle button to make the password visible
    fireEvent.click(toggleButton);
  
    // Check if the password input type is now 'text'
    expect(passwordInput).toHaveAttribute('type', 'text');
  
    // Click the toggle button again to hide the password
    fireEvent.click(toggleButton);
  
    // Ensure the password input type is 'password' again
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  
  // Test checkbox toggle
  test('handles terms checkbox toggle', () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    
    const checkbox = screen.getByTestId('terms-checkbox');
    
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
  
  // Test error messages for invalid data
  test('shows error messages for invalid data', async () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
  
    // Simulate form submission with invalid data
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: '' } });
    fireEvent.submit(screen.getByTestId('signup-form'));
  
    // Assert error messages
    expect(await screen.findByTestId('email-error')).toHaveTextContent('please enter a valid email');
  });
});
