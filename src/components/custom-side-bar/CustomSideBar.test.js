import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomSideBar from './CustomSideBar';

describe('CustomSideBar component', () => {
  test('renders CustomSideBar component', () => {
    const { getByText } = render(<CustomSideBar />);

    expect(getByText('Edit Image')).toBeInTheDocument();
    expect(getByText('Add Preferences')).toBeInTheDocument();
    expect(getByText('Edit Profile')).toBeInTheDocument();
    expect(getByText('Ignored Users')).toBeInTheDocument();
    expect(getByText('Shortlisted')).toBeInTheDocument();
    expect(getByText('Settings')).toBeInTheDocument();
  });

  test('switches content on button click', () => {
    const { getByText, getByTestId } = render(<CustomSideBar />);

    expect(getByText('Edit Image Content')).toBeInTheDocument();

    fireEvent.click(getByText('Add Preferences'));
    expect(getByText('Add Preferences Content')).toBeInTheDocument();

    fireEvent.click(getByText('Settings'));
    expect(getByTestId('settings-component')).toBeInTheDocument();
  });
  test('test navigation between pages', () => {
    const { getByText } = render(<CustomSideBar />);
    const editImage = getByText('Edit Image')
    fireEvent.click(editImage)
  })
});
