import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomSideBar from './CustomSideBar';

describe('CustomSideBar component', () => {
  test('renders all buttons with correct labels', () => {
    render(<CustomSideBar />);
    const buttonLabels = [
      'Edit Image',
      'Add Preferences',
      'Edit Profile',
      'Ignored Users',
      'Shortlisted',
      'Settings'
    ];

    buttonLabels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('renders the correct content when Edit Image button is clicked', () => {
    render(<CustomSideBar />);
    fireEvent.click(screen.getByText('Edit Image'));
    expect(screen.getByText('Edit Image Content')).toBeInTheDocument();
  });

  test('renders the correct content when Add Preferences button is clicked', () => {
    render(<CustomSideBar />);
    fireEvent.click(screen.getByText('Add Preferences'));
    expect(screen.getByText('Add Preferences Content')).toBeInTheDocument();
  });

  test('renders the correct content when Edit Profile button is clicked', () => {
    render(<CustomSideBar />);
    fireEvent.click(screen.getByText('Edit Profile'));
    expect(screen.getByText('Edit Profile Content')).toBeInTheDocument();
  });

  test('renders the correct content when Ignored Users button is clicked', () => {
    render(<CustomSideBar />);
    fireEvent.click(screen.getByText('Ignored Users'));
    expect(screen.getByText('Ignored Users Content')).toBeInTheDocument();
  });

  test('renders the correct content when Shortlisted button is clicked', () => {
    render(<CustomSideBar />);
    fireEvent.click(screen.getByText('Shortlisted'));
    expect(screen.getByText('Shortlisted Content')).toBeInTheDocument();
  });

  test('renders the Settings component when Settings button is clicked', () => {
    render(<CustomSideBar />);
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByTestId('settings')).toBeInTheDocument(); 
  });

  test('initially renders no content', () => {
    render(<CustomSideBar />);
    const contentElement = screen.getByTestId('content');
    expect(contentElement).toBeEmptyDOMElement();
  });
});
