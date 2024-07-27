import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Personaldetails from './Personaldetails';
import { EditProfile } from '../../utils/constants';

// Mock EditProfile object
jest.mock('../../utils/constants', () => ({
  EditProfile: {
    personaldetails: 'Personal Details',
    edit: 'Edit',
  },
}));

describe('Personaldetails Component', () => {
  beforeEach(() => {
    // Render the component before each test
    render(<Personaldetails />);
  });

  test('renders initial details correctly in view mode', () => {
    expect(screen.getByText('Caste:')).toBeInTheDocument();
    expect(screen.getByText('xyzxyz')).toBeInTheDocument();
    expect(screen.getByText('Sub-Caste:')).toBeInTheDocument();
    expect(screen.getByText('xyzxyz')).toBeInTheDocument();
    // Continue for all other fields in all sections...
  });

  test('renders input fields and textarea in edit mode', () => {
    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Check if input fields and textarea are rendered in edit mode
    expect(screen.getByRole('textbox', { name: 'Caste:' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'About me:' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('xyzxyz')).toBeInTheDocument(); // Check for specific value in input field
    expect(screen.getByDisplayValue('xyzxyz')).toBeInTheDocument(); // Check for specific value in textarea
  });

  test('handleChange updates state and clears errors', () => {
    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Get input field and textarea elements
    const casteInput = screen.getByDisplayValue('xyzxyz');
    const aboutMeTextarea = screen.getByDisplayValue('xyzxyz');

    // Clear existing errors by setting some fields to empty
    fireEvent.change(casteInput, { target: { value: '' } });
    fireEvent.change(aboutMeTextarea, { target: { value: '' } });

    // Trigger save to validate fields
    fireEvent.click(screen.getByText('Save'));

    // Check if error messages are shown
    expect(screen.getByText('Caste is required')).toBeInTheDocument();
    expect(screen.getByText('About me is required')).toBeInTheDocument();

    // Update value and check if the error is cleared
    fireEvent.change(casteInput, { target: { value: 'new caste' } });
    fireEvent.change(aboutMeTextarea, { target: { value: 'new about me' } });

    // Ensure the error messages are cleared
    expect(screen.queryByText('Caste is required')).not.toBeInTheDocument();
    expect(screen.queryByText('About me is required')).not.toBeInTheDocument();

    // Ensure that the state update is correct
    expect(screen.getByDisplayValue('new caste')).toBeInTheDocument();
    expect(screen.getByDisplayValue('new about me')).toBeInTheDocument();
  });

  test('handleEdit validates fields and updates isEditing state correctly', () => {
    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Get input fields and textarea
    const casteInput = screen.getByDisplayValue('xyzxyz');
    const aboutMeTextarea = screen.getByDisplayValue('xyzxyz');

    // Clear values to trigger validation
    fireEvent.change(casteInput, { target: { value: '' } });
    fireEvent.change(aboutMeTextarea, { target: { value: '' } });

    // Trigger save to validate fields
    fireEvent.click(screen.getByText('Save'));

    // Check for validation errors
    expect(screen.getByText('Caste is required')).toBeInTheDocument();
    expect(screen.getByText('About me is required')).toBeInTheDocument();

    // Update field with a valid value
    fireEvent.change(casteInput, { target: { value: 'valid caste' } });
    fireEvent.change(aboutMeTextarea, { target: { value: 'valid about me' } });

    // Trigger save again
    fireEvent.click(screen.getByText('Save'));

    // Ensure error messages are cleared and isEditing state is updated
    expect(screen.queryByText('Caste is required')).not.toBeInTheDocument();
    expect(screen.queryByText('About me is required')).not.toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument(); // Check if button text changed back to 'Edit'
  });

  test('handleChange clears validation errors on field update', () => {
    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Get input field and textarea
    const casteInput = screen.getByDisplayValue('xyzxyz');
    const aboutMeTextarea = screen.getByDisplayValue('xyzxyz');

    // Set empty values to trigger validation
    fireEvent.change(casteInput, { target: { value: '' } });
    fireEvent.change(aboutMeTextarea, { target: { value: '' } });

    // Trigger save to validate fields
    fireEvent.click(screen.getByText('Save'));

    // Check for validation errors
    expect(screen.getByText('Caste is required')).toBeInTheDocument();
    expect(screen.getByText('About me is required')).toBeInTheDocument();

    // Update fields with valid values
    fireEvent.change(casteInput, { target: { value: 'valid caste' } });
    fireEvent.change(aboutMeTextarea, { target: { value: 'valid about me' } });

    // Ensure error messages are cleared
    expect(screen.queryByText('Caste is required')).not.toBeInTheDocument();
    expect(screen.queryByText('About me is required')).not.toBeInTheDocument();
  });

  test('toggling between edit and view modes works correctly', () => {
    // Click edit button
    fireEvent.click(screen.getByText('Edit'));

    // Check if the button text changes to 'Save'
    expect(screen.getByText('Save')).toBeInTheDocument();

    // Check if input fields and textarea are displayed
    expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);

    // Click save button
    fireEvent.click(screen.getByText('Save'));

    // Check if the button text changes back to 'Edit'
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
