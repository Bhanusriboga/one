import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import IgnoreUsers from './IgnoreUsers'; // Adjust import path
import { moveToShortlist, undoAction, removeUser, changePage } from '../../redux/slices/Users'; // Adjust import path

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('IgnoreUsers Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        ignoredUsers: [], // Provide initial state here
        shortlistedUsers: [],
        loading: false,
      },
    });
  });

  test('renders IgnoreUsers component', () => {
    render(
      <Provider store={store}>
        <IgnoreUsers />
      </Provider>
    );

    expect(screen.getByText(/Ignored Users/i)).toBeInTheDocument(); // Adjust text based on component
  });

  test('handles move to shortlist action', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <IgnoreUsers />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Move to Shortlist/i)); // Adjust text based on component

    expect(store.dispatch).toHaveBeenCalledWith(moveToShortlist(expect.anything())); // Adjust action and arguments
  });

  test('handles undo action', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <IgnoreUsers />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Undo/i)); // Adjust text based on component

    expect(store.dispatch).toHaveBeenCalledWith(undoAction(expect.anything())); // Adjust action and arguments
  });

  test('handles remove user from ignore list', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <IgnoreUsers />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Remove/i)); // Adjust text based on component

    expect(store.dispatch).toHaveBeenCalledWith(removeUser(expect.anything())); // Adjust action and arguments
  });

  test('handles page change', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <IgnoreUsers />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Next/i)); // Adjust text based on component

    expect(store.dispatch).toHaveBeenCalledWith(changePage(expect.anything())); // Adjust action and arguments
  });
});
