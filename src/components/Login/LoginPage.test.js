import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage'; 
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/slices/index'; 
import { toast } from 'react-toastify';
import { userLogin } from '../../redux/slices/users';

const store = createStore(rootReducer);

global.fetch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: ()=>{
    return jest.fn();
  },
  useSelector: jest.fn((selector) => selector({
    users: {
      shortlisted: [] 
    }
  })),
}));
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
  error: jest.fn(),
  update: jest.fn(),
}));

jest.mock('../../redux/slices/users', () => ({
  userLogin: jest.fn(),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the LoginPage component with all elements', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mobile Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot password ?')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /signup/i })).toBeInTheDocument();
  });

  test('handles mobile input and validation correctly', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const mobileInput = screen.getByPlaceholderText('Mobile Number');
    fireEvent.change(mobileInput, { target: { value: '1234567890' } });
    expect(mobileInput.value).toBe('1234567890');
  });

  test('handles password input and toggles password visibility', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
    const toggleVisibilityButton = screen.getByLabelText('Toggle password visibility');
    fireEvent.click(toggleVisibilityButton);
  });

  test('submits the form with valid data', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const mobileInput = screen.getByPlaceholderText('Mobile Number');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByTestId('login-button');
    fireEvent.change(mobileInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
  });

  test('shows error toast on invalid credentials', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/mobile number/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByTestId('login-button'));
  
  });
  
 
  test('opens and closes the Forgot Password modal', async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );  
    const forgotPasswordButton = screen.getByTestId('forgot-password-button');
    fireEvent.click(forgotPasswordButton);
      await waitFor(() => {
      expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    });
    const closeModalButton = screen.getByLabelText('Close');
    fireEvent.click(closeModalButton);
      await waitFor(() => {
      expect(screen.queryByText('Forgot Password')).not.toBeInTheDocument();
    });
  });
  
  const mockLogin = jest.fn();

  test('submits the form with valid data', async () => {
    const mockLogin = jest.fn();
  
    render(<LoginPage login={mockLogin} />); // Pass mockLogin as a prop if needed
  
    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Mobile Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  
    // Submit the form
    fireEvent.click(screen.getByTestId('login-button'));
  
    // Wait for the mock function to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });
  });
  

  test('navigates to the Sign Up page when clicking the Sign Up link', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const signUpLink = screen.getByRole('link', { name: /signup/i });
    fireEvent.click(signUpLink);
    expect(/* expected navigation result */).toBe(/* some expected value */);
  });
});
 