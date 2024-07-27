import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from "redux-mock-store"
import Finish from './Finish'; // Adjust the import path as needed
import rootReducer from '../../redux/reducers'; // Adjust the import path as needed
import { saveTextArea, prevStep } from '../../redux/slices/RegistrationDetails'; // Adjust the import path as needed
import '@testing-library/jest-dom';
const mockStore = configureStore([]);
const store = mockStore({
    
});
 
const renderWithProvider = (component) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(fn => fn()),
}));

jest.mock('../../redux/slices/FinishSlice', () => ({
  saveTextArea: jest.fn(),
  prevStep: jest.fn(),
}));

const renderWithRedux = (component) => {
  const store = createStore(rootReducer);
  return renderWithProvider(<Provider store={store}>{component}</Provider>);
};

describe('Finish Component', () => {
  beforeEach(() => {
    renderWithRedux(<Finish />);
  });

  test('renders the text area and initial elements', () => {
    expect(screen.getByText('Describe Yourself')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('previous')).toBeInTheDocument();
    expect(screen.getByText('Skip & Register later')).toBeInTheDocument();
  });

  test('shows error message for less than 10 characters', () => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('Please describe yourself in at least 10 characters.')).toBeInTheDocument();
  });

  test('saves text and shows modal for valid input', () => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'This is a valid description.' } });
    fireEvent.click(screen.getByText('Save'));

    expect(saveTextArea).toHaveBeenCalledWith('This is a valid description.');
    expect(screen.getByText('Registered Successfully')).toBeInTheDocument();
  });

  test('modal can be toggled', () => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'This is a valid description.' } });
    fireEvent.click(screen.getByText('Save'));

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Registered Successfully')).not.toBeInTheDocument();
  });

  test('previous button dispatches prevStep action', () => {
    fireEvent.click(screen.getByText('previous'));
    expect(prevStep).toHaveBeenCalled();
  });

  test('skip link is rendered', () => {
    const skipLink = screen.getByText('Skip & Register later');
    expect(skipLink).toBeInTheDocument();
  });
});
