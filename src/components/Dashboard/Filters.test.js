// src/components/Dashboard/Filters.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './filters'; // Ensure correct path
import '@testing-library/jest-dom';

describe('Filters Component', () => {
  const mockHandleBasic = jest.fn();
  const mockHandleFilters = jest.fn();

  beforeEach(() => {
    render(<Filters handleBasic={mockHandleBasic} handleFilters={mockHandleFilters} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render Filters component with all elements', () => {
    expect(screen.getByTestId('religion-select')).toBeInTheDocument();
    expect(screen.getByTestId('cast-input')).toBeInTheDocument();
    expect(screen.getByTestId('subcast-input')).toBeInTheDocument();
    expect(screen.getByTestId('basic-search-button')).toBeInTheDocument();
    expect(screen.getByTestId('advanced-filters-dropdown')).toBeInTheDocument();
  });

  test('should toggle the dropdown menu on click', () => {
    const dropdownToggle = screen.getByTestId('advanced-filters-dropdown');
    
    // Initially dropdown should be closed
    expect(screen.queryByText('Advanced Filters')).not.toBeVisible();
    
    // Open dropdown
    fireEvent.click(dropdownToggle);
    expect(screen.getByText('Advanced Filters')).toBeVisible();
    
    // Close dropdown
    fireEvent.click(dropdownToggle);
    expect(screen.queryByText('Advanced Filters')).not.toBeVisible();
  });

  test('should call handleBasic with the correct filters when basic search is clicked', () => {
    const basicSearchButton = screen.getByTestId('basic-search-button');
    
    // Simulate user interaction
    fireEvent.change(screen.getByTestId('religion-select'), { target: { value: 'Hindu' } });
    fireEvent.change(screen.getByTestId('cast-input'), { target: { value: 'Brahmin' } });
    fireEvent.change(screen.getByTestId('subcast-input'), { target: { value: 'Kshatriya' } });
    
    fireEvent.click(basicSearchButton);
    
    expect(mockHandleBasic).toHaveBeenCalledWith({
      religion: 'Hindu',
      cast: 'Brahmin',
      subcast: 'Kshatriya',
    });
  });

  test('should call handleFilters with the correct values when advanced search is clicked', () => {
    const advancedSearchButton = screen.getByTestId('advanced-search-button');

    // Simulate selecting radio options for marital status and occupation
    fireEvent.click(screen.getByTestId('marital-single'));
    fireEvent.click(screen.getByTestId('occupation-business-owner'));

    fireEvent.click(advancedSearchButton);
    expect(mockHandleFilters).toHaveBeenCalledWith({
      marital: 'Single',
      occupation: 'Bussiness Owener',
    });
  });

  test('should update the state when form fields change', () => {
    fireEvent.change(screen.getByTestId('religion-select'), { target: { value: 'Christianity' } });
    expect(screen.getByTestId('religion-select').value).toBe('Christianity');

    fireEvent.change(screen.getByTestId('cast-input'), { target: { value: 'General' } });
    expect(screen.getByTestId('cast-input').value).toBe('General');

    fireEvent.change(screen.getByTestId('subcast-input'), { target: { value: 'N/A' } });
    expect(screen.getByTestId('subcast-input').value).toBe('N/A');
  });

  test('should render correct dropdown items when dropdown is opened', () => {
    // Open the dropdown
    fireEvent.click(screen.getByTestId('advanced-filters-dropdown'));

    // Check for the visibility of dropdown items
    expect(screen.getByTestId('marital-single')).toBeInTheDocument();
    expect(screen.getByTestId('occupation-business-owner')).toBeInTheDocument();
    expect(screen.getByTestId('age-min')).toBeInTheDocument();
    expect(screen.getByTestId('city-input')).toBeInTheDocument();
  });
  test('should update state for cast and subcast inputs', () => {
    // Trigger change for cast input
    fireEvent.change(screen.getByTestId('cast-input'), { target: { value: 'OBC' } });
    expect(screen.getByTestId('cast-input').value).toBe('OBC');

    // Trigger change for subcast input
    fireEvent.change(screen.getByTestId('subcast-input'), { target: { value: 'Yadav' } });
    expect(screen.getByTestId('subcast-input').value).toBe('Yadav');
  });
});
