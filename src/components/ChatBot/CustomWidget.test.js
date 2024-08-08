import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomWidget from './CustomWidget';

describe('CustomWidget Component', () => {
  test('renders the chatbot button initially on small devices', () => {
    render(<CustomWidget />);
    const chatButton = screen.getByTestId('chat-button-sm');
    expect(chatButton).toBeInTheDocument();
  });

  test('renders the chatbot button initially on small devices and hides after click', () => {
    render(<CustomWidget />);
    const chatButton = screen.getByTestId('chat-button-sm');
    expect(chatButton).toBeInTheDocument();

    fireEvent.click(chatButton);
    expect(chatButton).not.toBeInTheDocument();
  });

  test('hides the button after clicking to open the chatbot', () => {
    render(<CustomWidget />);
    const chatButton = screen.getByTestId('chat-button-sm');
    fireEvent.click(chatButton);
    expect(chatButton).not.toBeInTheDocument();
  });

  test('toggles button visibility correctly on small devices', () => {
    render(<CustomWidget />);
    const chatButton = screen.getByTestId('chat-button-sm');
    expect(chatButton).toBeInTheDocument();
  });

  test('toggles button visibility correctly on medium devices', () => {
    render(<CustomWidget />);
    const chatButton = screen.getByTestId('chat-button-md');
    fireEvent.click(chatButton);
    expect(chatButton).toBeInTheDocument();
    fireEvent.click(chatButton);
  });

  test('renders the chatbot when the button is clicked', () => {
    render(<CustomWidget />);
    const chatButton = screen.getByTestId('chat-button-md');
    fireEvent.click(chatButton);
    expect(chatButton).toBeInTheDocument();
  });
});
