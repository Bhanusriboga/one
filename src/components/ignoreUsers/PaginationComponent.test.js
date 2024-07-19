import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PaginationComponent from './PaginationComponent';

describe('PaginationComponent', () => {
  test('renders pagination correctly', () => {
    // Mock props
    const totalPages = 10;
    const currentPage = 1;
    const onPageChange = jest.fn();

    // Render PaginationComponent
    render(
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    // Verify pagination items
    const pagination = screen.getByRole('navigation', { name: /Page navigation example/i });
    expect(pagination).toBeInTheDocument();

    // Verify first and last buttons
    const firstButton = screen.getByRole('button', { name: /first/i });
    const lastButton = screen.getByRole('button', { name: /last/i });
    expect(firstButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();

    // Verify previous and next buttons
    const previousButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Simulate click on next button
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(currentPage + 1);

    // Simulate click on page number
    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
