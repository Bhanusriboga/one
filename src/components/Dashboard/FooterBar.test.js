import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterBar from './FooterBar';
import { footerContent } from '../../utils/constants';
import logo from '../../Assets/Logo.png';

describe('FooterBar Component', () => {
  test('renders FooterBar component', () => {
    render(<FooterBar />);
    expect(screen.getByText(footerContent.infoText)).toBeInTheDocument();
    expect(screen.getByText(footerContent.contactLabel)).toBeInTheDocument();
    expect(screen.getByText(footerContent.Mobile)).toBeInTheDocument();
    expect(screen.getByText(footerContent.Email)).toBeInTheDocument();
    expect(screen.getByText(footerContent.privacyLabel)).toBeInTheDocument();
    expect(screen.getByText(footerContent.pp)).toBeInTheDocument();
    expect(screen.getByText(footerContent.TermsC)).toBeInTheDocument();
    expect(screen.getByText(footerContent.copyright)).toBeInTheDocument();
  });

  test('renders logo image', () => {
    render(<FooterBar />);
    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('src', logo);  
  });

  test('renders footer content correctly', () => {
    render(<FooterBar />);    
    expect(screen.getByText(footerContent.infoText)).toBeInTheDocument();
    expect(screen.getByText(footerContent.Mobile)).toBeInTheDocument();
    expect(screen.getByText(footerContent.Email)).toBeInTheDocument();
    expect(screen.getByText(footerContent.pp)).toBeInTheDocument();
    expect(screen.getByText(footerContent.TermsC)).toBeInTheDocument();
    expect(screen.getByText(footerContent.copyright)).toBeInTheDocument();
  });

  test('checks layout structure', () => {
    render(<FooterBar />);
    const logoImage = screen.getByRole('img');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('alt', 'logo');
    const parentDiv = logoImage.closest('div');
    expect(parentDiv).toBeInTheDocument();
  });
  
  
});
