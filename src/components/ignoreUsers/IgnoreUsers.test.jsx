
import React from 'react';
import { render, screen, fireEvent, waitFor, act, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IgnoreUsers from './IgnoreUsers';
import { users } from '../shortlistedUsers/Data';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('./IgnoreCard', () => ({ user, onMoveToShortList, removeUserFromIgnoreList }) => (
  <div data-testid={`ignore-card-${user.id}`}>
    <div>{user.name}</div>
    <button onClick={onMoveToShortList}>Move to Shortlist</button>
    <button onClick={removeUserFromIgnoreList}>Remove from Ignore List</button>
    <button onClick={() => removeUserFromIgnoreList(user.id)}>Undo</button>
  </div>
));
const mockData = {
  // Mock data structure relevant to your component
  pagination: {
    totalPages: 3,
    currentPage: 1,
    // Add more fields as per your component's needs
  },
  // Other mock data properties as needed
};

describe('IgnoreUsers component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders IgnoreUsers component', () => {
    render(<IgnoreUsers />);
    expect(screen.getByText('Ignorelisted')).toBeInTheDocument();
  });
  
  test('cancels user move to shortlist', async () => {
    // Mock the toast function (you can use jest.fn() or a library like react-toastify/testing)
    const mockToastUpdate = jest.fn();
  
    // Mock the toastId (you can generate a unique ID or use a placeholder)
    const toastId = 'some-unique-id';
  
    // Render your component (make sure to set the initial state accordingly)
    const { getByText } = render(<IgnoreUsers />);
  
    // Simulate the undo action
    fireEvent.click(getByTestId('undo-button'));
  
    // Verify that setPendingShortList was called with the correct updated list
    // You'll need to mock setPendingShortList and check the state change
  
    // Verify that toast.update was called with the correct parameters
    expect(mockToastUpdate).toHaveBeenCalledWith(toastId, {
      render: 'User move to shortlist cancelled',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });
  
  

  test('handles undo moving a user to shortlist', async () => {
    render(<IgnoreUsers />);
  
    const firstUser = users[0];
  
    // Find the specific Undo button for the first user
    const undoButton = screen.getByTestId(`ignore-card-${firstUser.id}`).querySelector('button:last-of-type');
    fireEvent.click(undoButton);
  
    // Wait for toast.update to be called
    await waitFor(() => {
      expect(toast.update).toHaveBeenCalled();
    });
  });
  

  
  test('pagination renders correctly', async () => {
    // Mocking asynchronous operations example:
    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   json: async () => mockData,
    // });
  
    render(<IgnoreUsers />);
  
    // Wait for the component to finish rendering and for pagination to appear
    await waitFor(() => {
      // const paginationComponent = screen.getByTestId('pagination-component');
      // expect(paginationComponent).toBeInTheDocument();
    });
  
    // Optionally, you can assert other aspects of your component's behavior using the mocked data
    // For example:
    // const ignoreCards = screen.queryAllByTestId(/^ignore-card-/);
    // expect(ignoreCards.length).toBe(6); // Adjust based on your component's behavior
  });
  
  afterEach(() => {
    // Clean up mock after each test to ensure clean state
    jest.restoreAllMocks();
  });
  
  afterEach(() => {
    // Clean up mock after each test to ensure clean state
    jest.restoreAllMocks();
  });
  
  afterEach(() => {
    // Clean up mock after each test to ensure clean state
    jest.restoreAllMocks();
  });
  

  test('resizes user per page based on window size', async () => {
    render(<IgnoreUsers />);
  
    // Wait for the component to finish rendering
    await screen.findByTestId('ignore-card-1'); // Adjust the test ID as per your component
  
    // Check initial rendering based on default window width
    let ignoreCards = screen.queryAllByTestId(/^ignore-card-/);
    expect(ignoreCards.length).toBe(10); // Adjust based on your component's behavior
  
    // Resize window to test different users per page
    act(() => {
      window.innerWidth = 1024; // Adjust window size as per your testing requirements
      window.dispatchEvent(new Event('resize'));
    });
  
    // Wait for re-rendering after window resize
    await screen.findByTestId('ignore-card-1'); // Adjust the test ID as per your component
  
    // Check the number of cards rendered after resize
    ignoreCards = screen.queryAllByTestId(/^ignore-card-/);
    expect(ignoreCards.length).toBe(10); // Adjust based on your component's behavior
  });

  // Additional tests for resizing, error handling, and other functionality can be added here
});

