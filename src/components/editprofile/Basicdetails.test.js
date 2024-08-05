import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Basicdetails from './Basicdetails';


jest.mock('../../utils/constants', () => ({
  EditProfile: {
    basicdetails: 'Basic Details',
    edit: 'Edit',
  },
}));

describe('Basicdetails Component', () => {
  test('Renders All Fields', () => {
    render(<Basicdetails />);
    expect(screen.getByText('Basic Details')).toBeInTheDocument();
    const initialDetailsKeys = [
      'Date of Birth', 'Place of Birth', 'Time of Birth', 'Mother Tongue', 
      'Religion', 'Citizenship', 'Language Proficiency', 'Instagram id', 'LinkedIn id'
    ];
    initialDetailsKeys.forEach(key => {
      expect(screen.getByText(`${key}:`)).toBeInTheDocument();
    });
    const addressKeys = ['Door no&Street Name', 'City', 'State', 'Country', 'Postal code'];
    addressKeys.forEach(key => {
      expect(screen.getByText(`${key}:`)).toBeInTheDocument();
    });
  });

  test('edit button toggles editing mode', () => {
    render(<Basicdetails />);
    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(screen.getByText('Save')).toBeInTheDocument();
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('input fields appear and can editable', () => {
    render(<Basicdetails />);
    fireEvent.click(screen.getByText('Edit'));
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
    fireEvent.change(inputs[0], { target: { value: 'new value' } });
    expect(inputs[0].value).toBe('new value');
  });

  test('validation errors when field is empty', () => {
    render(<Basicdetails />);
    fireEvent.click(screen.getByText('Edit'));
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      fireEvent.change(input, { target: { value: '' } });
    });
    fireEvent.click(screen.getByText('Save'));
    const errorMessages = screen.getAllByText(/is required/);
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test('updating the fields', () => {
    render(<Basicdetails />);
    fireEvent.click(screen.getByText('Edit'));
    const detailInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(detailInput, { target: { value: 'New Date of Birth' } });
    expect(detailInput.value).toBe('New Date of Birth');
    const addressInput = screen.getAllByRole('textbox')[10]; 
    fireEvent.change(addressInput, { target: { value: 'New City' } });
    expect(addressInput.value).toBe('New City');
  });

  test('clears address field error when input is changed', () => {
    render(<Basicdetails />);
    fireEvent.click(screen.getByText('Edit'));
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      fireEvent.change(input, { target: { value: '' } });
    });
    fireEvent.click(screen.getByText('Save'));
    const errorMessages = screen.getAllByText(/is required/);
    expect(errorMessages.length).toBeGreaterThan(0);
    const addressInput = screen.getAllByRole('textbox')[10];
    fireEvent.change(addressInput, { target: { value: 'New City' } });
    expect(screen.queryByText('City is required')).not.toBeInTheDocument();
  });
});
