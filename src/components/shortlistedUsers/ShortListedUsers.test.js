import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShortListedUsers from './ShortListedUsers';

describe('ShortListedUsers Component', () => {
  test('renders ShortListedUsers component', () => {
    render(<ShortListedUsers />);
    
    // Check if Shortlisted heading is present
    expect(screen.getByText('Shortlisted')).toBeInTheDocument();

    // Check if initial users are rendered
    const users = screen.getAllByRole('article'); // Adjust based on your UsersCard structure
    expect(users.length).toBeGreaterThan(0);
  });

  test('handles moving a user to ignorelist', () => {
    render(<ShortListedUsers />);
    // Trigger move to ignorelist action
    fireEvent.click(screen.getByText('Move to Ignorelist')); // Adjust based on your UsersCard button text

    // Verify toast message
    expect(screen.getByText('User will be moved to ignorelist.')).toBeInTheDocument();

    // Simulate undo action
    fireEvent.click(screen.getByText('Undo'));
    expect(screen.getByText('User move to ignorelist cancelled')).toBeInTheDocument();
  });

  test('handles removing a user from shortlist', () => {
    render(<ShortListedUsers />);
    // Trigger remove from shortlist action
    fireEvent.click(screen.getByText('Remove from Shortlist')); // Adjust based on your UsersCard button text

    // Verify toast message
    expect(screen.getByText('User removed from shortlist! added to main list')).toBeInTheDocument();
  });

  test('paginates users correctly', () => {
    render(<ShortListedUsers />);
    
    // Mock pagination interaction
    fireEvent.click(screen.getByText('2'));

    // Verify if page 2 is active
    expect(screen.getByRole('button', { name: '2' })).toHaveClass('active');
  });
});
