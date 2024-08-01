import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Couple from './Couple';
import animation from './assets/Animation - 1720516602656.json';
import Lottie from 'react-lottie';

jest.mock('react-lottie', () => jest.fn(() => null));

describe('Couple Component', () => {
  test('renders without crashing', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Couple />
      </Router>
    );
    const coupleComponent = screen.getByTestId('couple-component');
    expect(coupleComponent).toBeInTheDocument();
  });

  test('renders the correct heading and paragraph', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Couple />
      </Router>
    );

    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toHaveTextContent('Discover the');
    expect(heading).toHaveTextContent('Magic of True Connection');

    const paragraph = screen.getByText(/With a blend of modern technology and timeless matchmaking expertise/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('renders the couple image', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Couple />
      </Router>
    );
    const coupleImage = screen.getByAltText('couple image');
    expect(coupleImage).toBeInTheDocument();
    expect(coupleImage).toHaveClass('couple-img');
  });

  test('renders the Lottie animation with the correct options', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Couple />
      </Router>
    );

    expect(Lottie).toHaveBeenCalledWith(
      expect.objectContaining({
        options: {
          loop: true,
          autoplay: true,
          animationData: animation,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        },
        height: 40,
        width: 40,
      }),
      {}
    );
  });

  test('navigates to the signup page when the Engage button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Couple />
      </Router>
    );
    const engageButton = screen.getByText(/Engage/i);
    fireEvent.click(engageButton);
    expect(history.location.pathname).toBe('/signup');
  });
});
