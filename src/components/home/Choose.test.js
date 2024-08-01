import React from 'react';
import { render, screen } from '@testing-library/react';
import Choose from './choose';

describe('Choose Component', () => {
  test('renders the Choose component', () => {
    render(<Choose width={800} />);
    const chooseComponent = screen.getByTestId('choose-component');
    expect(chooseComponent).toBeInTheDocument();
  });

  test('displays the Why Choose Us? text', () => {
    render(<Choose width={800} />);
    expect(screen.getByText('Why Choose Us ?')).toBeInTheDocument();
  });

  test('displays the rings frame image when width is more than 600', () => {
    render(<Choose width={800} />);
    const ringsFrameImage = screen.getByAltText('Rings Frame'); 
    expect(ringsFrameImage).toHaveClass('d-block w-75 mt-5');
  });

  test('hides the rings frame image when width is less than 600', () => {
    render(<Choose width={500} />);
    const ringsFrameImage = screen.getByAltText('Rings Frame'); 
    expect(ringsFrameImage).toHaveClass('d-none');
  });

  test('renders ring-con divs when width is less than 600', () => {
    render(<Choose width={500} />);
    const ringConDivs = screen.getAllByText(/Trust Worthy|Stake Holders|Franchise|Vendors/i);
    expect(ringConDivs.length).toBe(4); 
  });
});
