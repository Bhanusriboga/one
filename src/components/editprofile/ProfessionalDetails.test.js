import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfessionalDetails from './ProfessionalDetails';
import { EditProfile } from '../../utils/constants';

jest.mock('../../utils/constants', () => ({
  EditProfile: {
    professionaldetails: 'Professional Details',
    edit: 'Edit',
  },
}));

describe('ProfessionalDetails Component', () => {
  test('renders professional details in view mode', () => {
    render(<ProfessionalDetails />);
    expect(screen.getByText('Highest Education:')).toBeInTheDocument();
    expect(screen.getByText('B.Tech')).toBeInTheDocument();
    expect(screen.getByText('Year Of Passing:')).toBeInTheDocument();
    expect(screen.getByText('2222')).toBeInTheDocument();
    expect(screen.getByText('Name Of the Institute:')).toBeInTheDocument();
    expect(screen.getByText('abcdefgk')).toBeInTheDocument();
    expect(screen.getByText('Occupation:')).toBeInTheDocument();
    expect(screen.getByText('xyz')).toBeInTheDocument();
    expect(screen.getByText('Employment Status:')).toBeInTheDocument();
    expect(screen.getByText('xyz')).toBeInTheDocument();
    expect(screen.getByText('Employed in:')).toBeInTheDocument();
    expect(screen.getByText('yxzxyz')).toBeInTheDocument();
    expect(screen.getByText('Work Location:')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
    expect(screen.getByText('State:')).toBeInTheDocument();
    expect(screen.getByText('yhhhhhhh')).toBeInTheDocument();
    expect(screen.getByText('City:')).toBeInTheDocument();
    expect(screen.getByText('Xyz')).toBeInTheDocument();
  });

  test('allows editing of professional details', () => {
    render(<ProfessionalDetails />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('B.Tech')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2222')).toBeInTheDocument();
    expect(screen.getByDisplayValue('abcdefgk')).toBeInTheDocument();
    expect(screen.getByDisplayValue('xyz')).toBeInTheDocument();
    expect(screen.getByDisplayValue('xyz')).toBeInTheDocument();
    expect(screen.getByDisplayValue('yxzxyz')).toBeInTheDocument();
    expect(screen.getByDisplayValue('India')).toBeInTheDocument();
    expect(screen.getByDisplayValue('yhhhhhhh')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Xyz')).toBeInTheDocument();
  });

  test('handles changes in input fields', () => {
    render(<ProfessionalDetails />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByDisplayValue('B.Tech'), { target: { value: 'M.Tech' } });
    fireEvent.change(screen.getByDisplayValue('2222'), { target: { value: '2024' } });
    fireEvent.change(screen.getByDisplayValue('abcdefgk'), { target: { value: 'new institute' } });
    fireEvent.change(screen.getByDisplayValue('xyz'), { target: { value: 'new occupation' } });
    
    expect(screen.getByDisplayValue('M.Tech')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024')).toBeInTheDocument();
    expect(screen.getByDisplayValue('new institute')).toBeInTheDocument();
    expect(screen.getByDisplayValue('new occupation')).toBeInTheDocument();
  });

  test('validates required fields and handles errors', () => {
    render(<ProfessionalDetails />);
    
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByDisplayValue('B.Tech'), { target: { value: '' } });
    fireEvent.change(screen.getByDisplayValue('2222'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('Highest Education is required')).toBeInTheDocument();
    expect(screen.getByText('Year Of Passing is required')).toBeInTheDocument();
  });

  test('handles the switch between edit and view mode', () => {
    render(<ProfessionalDetails />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('B.Tech')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));
    expect(screen.queryByDisplayValue('B.Tech')).not.toBeInTheDocument();
  });
});
