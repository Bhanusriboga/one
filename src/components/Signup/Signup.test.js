import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SignUp from './SignUp'; // Import your SignUp component
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../redux/slices/AuthSlice';

// Create a mock store
const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

describe('SignUp Component', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  test('should handle form inputs correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SignUp />
        </Router>
      </Provider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email id/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/reenter password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/enter number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByDisplayValue(/I am/i), { target: { value: 'MALE' } });

    // Check if values are set correctly
    expect(screen.getByPlaceholderText(/full name/i).value).toBe('John Doe');
    expect(screen.getByPlaceholderText(/email id/i).value).toBe('test@example.com');
    expect(screen.getByPlaceholderText(/password/i).value).toBe('Password123');
    expect(screen.getByPlaceholderText(/reenter password/i).value).toBe('Password123');
    expect(screen.getByPlaceholderText(/enter number/i).value).toBe('1234567890');
    expect(screen.getByDisplayValue(/MALE/i).value).toBe('MALE');
  });

  test('should show and handle the OTP modal correctly', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SignUp />
        </Router>
      </Provider>
    );

    // Fill in the form and submit
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email id/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/reenter password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/enter number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByDisplayValue(/I am/i), { target: { value: 'MALE' } });

    fireEvent.click(screen.getByText(/sign up/i)); // Submit the form

    // Check if OTP modal is displayed
    expect(screen.getByText(/otp verification/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/enter otp/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByText(/verify/i)); // Click verify button

    // Check if success modal is displayed
    expect(screen.getByText(/verified successfully/i)).toBeInTheDocument();
  });

  test('should navigate to login page when already have an account link is clicked', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SignUp />
        </Router>
      </Provider>
    );

    // Click on the already have an account link
    fireEvent.click(screen.getByText(/already have an account/i));

    // Verify that navigation to login page occurred
    expect(history.location.pathname).toBe('/login');
  });

  test('should handle password visibility toggle', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SignUp />
        </Router>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    // Initially, the password should be hidden
    expect(passwordInput.type).toBe('password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    // Click to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  test('should handle password confirmation validation', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SignUp />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText(/reenter password/i), { target: { value: 'Password321' } });
    fireEvent.click(screen.getByText(/sign up/i)); // Submit the form

    // Check if password error is displayed
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });
});
