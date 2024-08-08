import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => {
    return {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(() => ({ data: new Array(4) })),
      putImageData: jest.fn(),
      createImageData: jest.fn(() => []),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    };
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('react-lottie', () => () => <div data-testid="mocked-lottie" />);

describe('Home Component', () => {
  test('renders the navbar with logo', () => {
    render(<Home />);
    const logoElement = screen.getByRole('img', { name: /logo/i }); 
    expect(logoElement).toBeInTheDocument();
  });

  test('navbar should apply blur class when scrolled down', () => {
    render(<Home />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).not.toHaveClass('navbar-blur');
    fireEvent.scroll(window, { target: { scrollY: 150 } });
    expect(navElement).toHaveClass('navbar-blur');
  });

  test('navbar removes blur class when scrolled to the top', () => {
    render(<Home />);
      fireEvent.scroll(window, { target: { scrollY: 100 } });
      const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('navbar-blur');
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(navElement).not.toHaveClass('navbar-blur');
  });

  test('renders the navbar with logo', () => {
    render(<Home />);
    const logoElement = screen.getByRole('img', { name: /company logo/i });
    expect(logoElement).toBeInTheDocument();
  });
  
  test('renders Choose component based on window width', () => {
    render(<Home />);
    const chooseElement = screen.getByTestId('choose-component');
    expect(chooseElement).toBeInTheDocument();
  });

  test('renders the Explore component', () => {
    render(<Home />);
    const exploreElement = screen.getByTestId('explore-component');
    expect(exploreElement).toBeInTheDocument();
  });
  test('renders all arrow buttons', () => {
    render(<Home />);
  
    const allBtnArrows = screen.getAllByRole('img', { className: 'btn-arrow' });
  
    expect(allBtnArrows).toHaveLength(324); 
    expect(allBtnArrows[0]).toHaveClass('btn-arrow');
  });
  test('sets scrolled to false when window is scrolled back to top', () => {
    const setScrolled = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((init) => [init, setScrolled]);
    render(<Home />);
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));
    window.scrollY = 0;
    window.dispatchEvent(new Event('scroll'));
    expect(setScrolled).toHaveBeenCalledWith(false);
  
    jest.restoreAllMocks();
  });
  
  
  
  test('renders the Endorse component', () => {
    render(<Home />);
    const endorseElement = screen.getByTestId('endorse-component');
    expect(endorseElement).toBeInTheDocument();
  });

  test('renders the Destination component', () => {
    render(<Home />);
    const destinationElement = screen.getByTestId('destination-component');
    expect(destinationElement).toBeInTheDocument();
  });

  test('updates window width on resize', () => {
    render(<Home />);
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    const chooseElement = screen.getByTestId('choose-component');
    expect(chooseElement).toBeInTheDocument();
  });
});
