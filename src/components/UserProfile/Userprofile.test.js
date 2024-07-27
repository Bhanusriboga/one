import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Userprofile from './Userprofile';
import { personalData, userName, buttons } from './Data';

jest.mock('./Userinnerprofile', () => () => <div>UserInnerProfile Mock</div>);

describe('Userprofile Component', () => {
  beforeEach(() => {
    window.innerWidth = 1024; 
  });

  test('renders Userprofile component and checks initial icon states', () => {
    render(<Userprofile />);

    // Check if the initial state of the heart and minus icons are not clicked
    expect(screen.getByTestId('heart-icon')).toHaveClass('ci ci-heart');
    expect(screen.getByTestId('minus-icon')).toHaveClass('ci ci-square-minus');
  });

  test('renders Userprofile component and checks mobile view', () => {
    window.innerWidth = 500; // Set window width to mobile view
    window.dispatchEvent(new Event('resize'));
    render(<Userprofile />);

    // Check if the component renders userName
    userName.forEach(item => {
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });

    // Check if the component renders images in mobile view
    const images = screen.getAllByAltText('Clickable card');
    expect(images).toHaveLength(4);

    // Check if the component renders UserInnerProfile
    expect(screen.getByText('UserInnerProfile Mock')).toBeInTheDocument();
  });

  test('renders Userprofile component and checks desktop view', () => {
    render(<Userprofile />);

    // Check if the component renders userName
    userName.forEach(item => {
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });

    // Check if the component renders buttons
    buttons.forEach(item => {
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });

    // Check if the component renders images in desktop view
    const images = screen.getAllByAltText('Clickable card');
    expect(images).toHaveLength(4);

    // Check if the component renders UserInnerProfile
    expect(screen.getByText('UserInnerProfile Mock')).toBeInTheDocument();
  });

  test('handles heart and minus button clicks', () => {
    render(<Userprofile />);

    // Check initial state of heart and minus buttons
    expect(screen.getByTestId('heart-icon')).toHaveClass('ci ci-heart');
    expect(screen.getByTestId('minus-icon')).toHaveClass('ci ci-square-minus');

    // Click heart button and check the updated state
    fireEvent.click(screen.getByTestId('heart-icon'));
    expect(screen.getByTestId('heart-icon')).toHaveClass('fa fa-heart');

    // Click minus button and check the updated state
    fireEvent.click(screen.getByTestId('minus-icon'));
    expect(screen.getByTestId('minus-icon')).toHaveClass('fa fa-minus-square');
  });

  test('displays personal data correctly', () => {
    render(<Userprofile />);

    // Check if personal data is displayed
    personalData.forEach(user => {
      expect(screen.getByText(user.key)).toBeInTheDocument();
      expect(screen.getByText(user.value)).toBeInTheDocument();
    });
  });

  test('handles image card clicks', () => {
    render(<Userprofile />);

    // Initial image src
    expect(screen.getByAltText('Card image cap').src).toContain('Image1.jpeg');

    // Click on another image
    fireEvent.click(screen.getAllByAltText('Clickable card')[1]);
    expect(screen.getByAltText('Card image cap').src).toContain('Image3.jpeg');


    const heart=screen.getByTestId('clickheart')
    fireEvent.click(heart)

   
  });
});