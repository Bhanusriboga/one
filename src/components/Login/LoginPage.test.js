import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';
import {login} from "../../utils/constants"
describe('LoginPage', () => {
  test('renders the component correctly', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account? Sign Up")).toBeInTheDocument();
  });

  test('validates email correctly', () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(screen.getByText('Please Enter a Valid Email')).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(screen.queryByText('Please Enter a Valid Email')).not.toBeInTheDocument();
  });

  test('toggles password visibility with handleeyebtn', () => {
    render(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByTestId('eye')
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('navigates to dashboard on handleLogin', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}><LoginPage /></Router>
    );
    const loginButton = screen.getByTestId('login')
    fireEvent.click(loginButton);
    expect(history.location.pathname).toBe('/dashboard');
  });

  test('toggles forgot password modal with toggle', () => {
    render(<LoginPage />);
    const forgotPasswordButton = screen.getByText(login.forgot);
    fireEvent.click(forgotPasswordButton);
   
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText('Forgot your password?')).not.toBeInTheDocument();
  });
});
