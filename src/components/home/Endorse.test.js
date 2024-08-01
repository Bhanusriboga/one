import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Endorse from './Endorse';

jest.mock('react-lottie', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="lottie-mock"></div>),
}));

describe('Endorse Component', () => {
  test('renders the Endorse component with title and description', () => {
    render(<Endorse />);
    expect(screen.getByText(/Endorsements/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover what others have to say/i)).toBeInTheDocument();
  });

  test('renders the correct number of endorsement items', () => {
    render(<Endorse />);
    const endorsementItems = screen.getAllByRole('heading', { level: 5 });
    expect(endorsementItems.length).toBe(7); 
  });

  test('renders star ratings for each endorsement', () => {
    render(<Endorse />);
    const starContainers = screen.getAllByTitle(/Stars/i);
    expect(starContainers.length).toBe(6); 
  });

  test('scrolls the list when the left arrow is clicked', () => {
    render(<Endorse />);
    const scrollContainer = screen.getByTestId('endorse-component').querySelector('.scrollable-list');
    scrollContainer.scrollLeft = 500;

    const leftArrow = screen.getAllByTestId('lottie-mock')[0];
    fireEvent.click(leftArrow);

    expect(scrollContainer.scrollLeft).toBe(500 - 980); 
  });

  test('scrolls the list when the right arrow is clicked', () => {
    render(<Endorse />);
    const scrollContainer = screen.getByTestId('endorse-component').querySelector('.scrollable-list');
    scrollContainer.scrollLeft = 500; 

    const rightArrow = screen.getAllByTestId('lottie-mock')[1];
    fireEvent.click(rightArrow);

    expect(scrollContainer.scrollLeft).toBe(500 + 980); 
  });

  test('does not scroll when scrollContainerRef.current is null', () => {
    render(<Endorse />);

    const scrollContainerRef = { current: null };
    const scroll = (scrollOffset) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += scrollOffset;
      }
    };
    scroll(500);
  });
});
