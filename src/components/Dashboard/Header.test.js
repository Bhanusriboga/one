import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import logo from '../../Assets/Logo.png';

describe('Header Component', () => {
  test('renders Header component', () => {
    render(<Header />);
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', logo);
    const pricingLink = screen.getByRole('link', { name: /pricing/i });
    expect(pricingLink).toBeInTheDocument();
    expect(pricingLink).toHaveAttribute('href', '/payment');
    const chatLink = screen.getByRole('link', { name: /chat with us/i });
    expect(chatLink).toBeInTheDocument();
    expect(chatLink).toHaveAttribute('href', '/components');
    const contactLink = screen.getByRole('link', { name: /contact us/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/components');
    const logoutLink = screen.getByRole('link', { name: /logout/i });
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveAttribute('href', '/login');
  });

  test('checks layout structure', () => {
    render(<Header />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    const navItems = screen.getAllByRole('link');
    expect(navItems.length).toBe(5);
    const navButtons = navItems.filter(item => item.classList.contains('navBtn'));
    expect(navButtons.length).toBe(4); 
    navButtons.forEach((item) => {
      expect(item).toHaveClass('navBtn');
    });
  });
});
