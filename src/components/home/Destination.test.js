import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Destination from './Destination';
import { useHistory } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));
describe('Destination Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });
  test('renders the Destination component', () => {
    render(
      <MemoryRouter>
        <Destination />
      </MemoryRouter>
    );
    const destinationComponent = screen.getByTestId('destination-component');
    expect(destinationComponent).toBeInTheDocument();
  });
  test('displays the correct heading text', () => {
    render(
      <MemoryRouter>
        <Destination />
      </MemoryRouter>
    );
    expect(screen.getByText(/Perfect destination to discover your soulmate/i)).toBeInTheDocument();
  });
  test('displays the correct paragraph text', () => {
    render(
      <MemoryRouter>
        <Destination />
      </MemoryRouter>
    );
    expect(screen.getByText(/From detailed profiles that capture the essence of who you are/i)).toBeInTheDocument();
  });
  test('navigates to /signup when the begin button is clicked', () => {
    const mockPush = jest.fn();
    useHistory.mockReturnValue({ push: mockPush });
    render(
      <MemoryRouter>
        <Destination />
      </MemoryRouter>
    );
    const beginButton = screen.getByText(/Let’s Begin/i);
    fireEvent.click(beginButton);
    expect(mockPush).toHaveBeenCalledWith('/signup');
  });
});
