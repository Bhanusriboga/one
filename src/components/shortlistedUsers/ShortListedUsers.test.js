import React from "react"
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';
import ShortListedUsers from './ShortListedUsers';

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: ()=>{
    return jest.fn();
  },
  useSelector: jest.fn((selector) => selector({
    users: {
      shortlisted: [] // Adjust this based on the expected state
    }
  })),
}));
const mockStore = configureStore([]);
const store = mockStore({
  users: {
    shortlisted: [] // Add appropriate initial state here
  }
});

test('renders ShortListedUsers component without crashing', () => {
  render(
    <Provider store={store}>
      <ShortListedUsers />
    </Provider>
  );
  // expect(screen.getByText('User will be moved to ignore list.')).toBeInTheDocument();
});

// test('dispatches getShortListedUsers action on mount', () => {
//   const dispatch = jest.fn();
//   useDispatch.mockReturnValue(dispatch);
//   useSelector.mockReturnValue({ shortlisted: [] });

//   render(
//     <Provider store={store}>
//       <ShortListedUsers />
//     </Provider>
//   );

//   expect(dispatch).toHaveBeenCalledWith(getShortListedUsers());
// });

// test('moves user to ignore list and shows toast', async () => {
//   const dispatch = jest.fn();
//   useDispatch.mockReturnValue(dispatch);
//   useSelector.mockReturnValue({
//     shortlisted: [{ userId: 1, name: 'John Doe' }],
//   });

//   render(
//     <Provider store={store}>
//       <ShortListedUsers />
//     </Provider>
//   );

//   fireEvent.click(screen.getByText('Move to Ignore List'));

//   await waitFor(() => {
//     expect(dispatch).toHaveBeenCalledWith(getIgnoredUsers('shortlisted'));
//     expect(toast.success).toHaveBeenCalledWith('User moved to ignore list', {
//       position: 'top-center',
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   });
// });

// test('undo move to ignore list and shows toast', async () => {
//   const dispatch = jest.fn();
//   useDispatch.mockReturnValue(dispatch);
//   useSelector.mockReturnValue({
//     shortlisted: [{ userId: 1, name: 'John Doe' }],
//   });

//   render(
//     <Provider store={store}>
//       <ShortListedUsers />
//     </Provider>
//   );

//   fireEvent.click(screen.getByText('Move to Ignore List'));
//   fireEvent.click(screen.getByText('Undo'));

//   await waitFor(() => {
//     expect(dispatch).toHaveBeenCalledWith(getShortListedUsers('shortlisted'));
//     expect(toast.update).toHaveBeenCalledWith(expect.any(String), {
//       render: 'User move to ignore list cancelled',
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   });
// });

// test('changes page correctly', () => {
//   render(
//     <Provider store={store}>
//       <ShortListedUsers />
//     </Provider>
//   );

//   fireEvent.click(screen.getByText('Next Page')); // Adjust text based on your pagination component

//   // Add assertions based on the expected behavior
// });

// test('displays message when no shortlisted users are present', () => {
//   render(
//     <Provider store={store}>
//       <ShortListedUsers />
//     </Provider>
//   );

//   // Assuming there's a message or a specific UI element for when no users are present
//   expect(screen.getByText('No shortlisted users')).toBeInTheDocument();
// });