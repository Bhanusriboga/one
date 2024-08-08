import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Settings from './Settings';
import { settings } from '../../utils/constants';

// Mock store
const mockStore = configureStore([]);
const store = mockStore({});

const renderWithProvider = (component) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('Settings Component', () => {
  it('renders without crashing', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    expect(screen.getByTestId('settings')).toBeInTheDocument();
  });



  it('updates email state on input change', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const emailInput = screen.getByPlaceholderText(settings.emailPlaceholder);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates OTP state on input change when showOtp is true', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(settings.emailPlaceholder), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByTestId('email-verify'));
    const otpInput = screen.getByPlaceholderText(settings.otpPlaceholder);
    fireEvent.change(otpInput, { target: { value: '123456' } });
    expect(otpInput.value).toBe('123456');
  });

  it('shows error message for invalid email on verify', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const emailInput = screen.getByPlaceholderText(settings.emailPlaceholder);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByTestId('email-verify'));
    expect(screen.getByText(settings.validEmailError)).toBeInTheDocument();
  });

  it('shows OTP inputs when verify button is clicked for valid email', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const emailInput = screen.getByPlaceholderText(settings.emailPlaceholder);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByTestId('email-verify'));
    expect(screen.getByPlaceholderText(settings.otpPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(settings.newMailPlaceholder)).toBeInTheDocument();
  });

  it('updates phone state on input change', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const phoneInput = screen.getByPlaceholderText(settings.phonePlaceholder);
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    expect(phoneInput.value).toBe('1234567890');
  });

  it('shows error message for invalid phone number on verify', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const phoneInput = screen.getByPlaceholderText(settings.phonePlaceholder);
    fireEvent.change(phoneInput, { target: { value: '099' } });
    fireEvent.click(screen.getByTestId('phone-verify'));
    expect(screen.getByText(settings.validPhoneError)).toBeInTheDocument();
  });

  it('shows OTP inputs when verify button is clicked for valid phone number', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const phoneInput = screen.getByPlaceholderText(settings.phonePlaceholder);
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.click(screen.getByTestId('phone-verify'));
    expect(screen.getByPlaceholderText(settings.otpPlaceholder)).toBeInTheDocument();
  });

  it('updates password state on input change', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const currentPasswordInput = screen.getByPlaceholderText(settings.currentPasswordPlaceholder);
    fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword' } });
    expect(currentPasswordInput.value).toBe('currentPassword');
  });

  it('shows error message if new password and confirm password do not match', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const currentPasswordInput = screen.getByPlaceholderText(settings.currentPasswordPlaceholder);
    const newPasswordInput = screen.getByPlaceholderText(settings.newPasswordPlaceholder);
    const confirmPasswordInput = screen.getByPlaceholderText(settings.confirmPasswordPlaceholder);
    fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });
    fireEvent.click(screen.getByText(settings.savePasswordButton));
    expect(screen.getByText(settings.passwordMatchError)).toBeInTheDocument();
  });

  it('toggles profile privacy checkbox', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const checkbox = screen.getByLabelText(settings.profilePrivacyLabel);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('updates delete reason on radio button change', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const radio = screen.getByLabelText(settings.foundAMatch);
    fireEvent.click(radio);
    expect(radio.checked).toBe(true);
  });

  it('shows delete alert when delete button is clicked', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const radio = screen.getByLabelText(settings.foundAMatch);
    fireEvent.click(radio);
    const deleteButton = screen.getByText(settings.deleteBtn);
    fireEvent.click(deleteButton);
    expect(screen.getByText(settings.deleteTitle)).toBeInTheDocument();
  });

  it('calls logout action when logout button is clicked', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const logoutButton = screen.getByText(settings.logoutButton);
    fireEvent.click(logoutButton);
    const actions = store.getActions();
    expect(actions[0].type).toBe('auth/logout');
  });

  it('shows error message if required fields are missing on submit', () => {
    renderWithProvider(<Settings setActiveContent={jest.fn()} />);
    const emailInput = screen.getByPlaceholderText(settings.emailPlaceholder);
    fireEvent.change(emailInput, { target: { value: 'sfdsf' } });
    const saveButton = screen.getByText(settings.saveAllButton);
    fireEvent.click(saveButton);
  });
});