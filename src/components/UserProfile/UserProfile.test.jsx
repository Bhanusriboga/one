import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Userprofile1 from './Userprofile1';

describe('Userprofile1 Component', () => {
  test('renders the component and initial image', () => {
    render(<Userprofile1 />);
    
    
    const initialImage = screen.getByRole('img', { name: /clickable card/i });
    expect(initialImage).toHaveAttribute('src', 'Image1.jpeg');
  });

  test('changes the main image when a side image is clicked', () => {
    render(<Userprofile1 />);
    
   
    const secondImage = screen.getAllByRole('img', { name: /clickable card/i })[0];
    fireEvent.click(secondImage);
    
   
    const mainImage = screen.getByRole('img', { name: /clickable card/i });
    expect(mainImage).toHaveAttribute('src', 'Image2.jpeg');
  });

  test('toggles heart icon', () => {
    render(<Userprofile1 />);
    
    const heartIcon = screen.getByTestId('heart-icon');
    fireEvent.click(heartIcon);
    expect(heartIcon).toHaveClass('fa-heart');
    
    fireEvent.click(heartIcon);
    expect(heartIcon).toHaveClass('ci-heart');
  });

  test('toggles minus icon', () => {
    render(<Userprofile1 />);
    
    const minusIcon = screen.getByTestId('minus-icon');
    fireEvent.click(minusIcon);
    expect(minusIcon).toHaveClass('fa-minus-square');
    
    fireEvent.click(minusIcon);
    expect(minusIcon).toHaveClass('ci-square-minus');
  });

  test('renders the back button', () => {
    render(<Userprofile1 />);
    
    const backButton = screen.getByText(/back/i);
    expect(backButton).toBeInTheDocument();
  });

  test('renders profile details', () => {
    render(<Userprofile1 />);
    
    const dobText = screen.getByText(/date of birth:/i);
    expect(dobText).toBeInTheDocument();
    
    const timeOfBirthText = screen.getByText(/time of birth:/i);
    expect(timeOfBirthText).toBeInTheDocument();
    
    const religionText = screen.getByText(/religion:/i);
    expect(religionText).toBeInTheDocument();

    const MothertoungueText = screen.getByText(/Mother Tongue :/i);
    expect(MothertoungueText).toBeInTheDocument();

    const LanguageProficiencyText = screen.getByText(/Language Proficiency :/i);
    expect(LanguageProficiencyText).toBeInTheDocument();

    const InstagramidText = screen.getByText(/Instagram id :/i);
    expect(InstagramidText).toBeInTheDocument();

    const LinkedInidText = screen.getByText(/LinkedIn id:/i);
    expect(LinkedInidText).toBeInTheDocument();

    const AddressText = screen.getByText(/Address:/i);
    expect(AddressText).toBeInTheDocument();

    const CitizenshipText = screen.getByText(/Citizenship:/i);
    expect(CitizenshipText).toBeInTheDocument();
  });

  
});
