import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomWidget from './CustomWidget';

jest.mock('./Icon.png', () => 'icon-mock.png');
jest.mock('./ChatBotIcon.png', () => 'chatbot-icon-mock.png');
jest.mock('./ChatBotCloseButton.png', () => 'chatbot-close-button-mock.png');

describe('CustomWidget', () => {
  test('renders the component without errors', () => {
    render(<CustomWidget />);
    expect(screen.getByAltText('Chat Button')).toBeInTheDocument();
  });

  test('toggles the chatbot visibility', () => {
    render(<CustomWidget />);
    const button = screen.getByAltText('Chat Button');

    expect(screen.queryByText('Chat with our Service Expert')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Chat with our Service Expert')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText('Chat with our Service Expert')).not.toBeInTheDocument();
  });

  test('initial steps of the chatbot', () => {
    render(<CustomWidget />);
    const button = screen.getByAltText('Chat Button');
    fireEvent.click(button);

    expect(screen.getByText('Welcome to Matchmaking Services. How can I assist you today?')).toBeInTheDocument();
  });

  test('user interaction with the chatbot', () => {
    render(<CustomWidget />);
    const button = screen.getByAltText('Chat Button');
    fireEvent.click(button);

    fireEvent.change(screen.getByPlaceholderText('Type Your Message'), { target: { value: 'I need help' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Type Your Message'), { key: 'Enter', code: 'Enter' });

    expect(screen.getByText("What kind of matchmaking service are you interested in?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Find a Life Partner"));

    expect(screen.getByText("Thank you for choosing our matchmaking services. We will assist you with finding a life partner.")).toBeInTheDocument();
  });

  test('restart and exit functionality', () => {
    render(<CustomWidget />);
    const button = screen.getByAltText('Chat Button');
    fireEvent.click(button);

    fireEvent.change(screen.getByPlaceholderText('Type Your Message'), { target: { value: 'I need help' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Type Your Message'), { key: 'Enter', code: 'Enter' });

    fireEvent.click(screen.getByText("Find a Life Partner"));
    fireEvent.click(screen.getByText("Yes"));

    expect(screen.getByText("Would you like to start over?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Yes, restart"));
    expect(screen.getByText("What kind of matchmaking service are you interested in?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("No, exit"));
    expect(screen.getByText("Thank you for using Matchmaking Services.")).toBeInTheDocument();
  });
});
