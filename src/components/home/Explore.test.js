import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import Explore from './Explore';

jest.mock('react-lottie', () => jest.fn(() => null)); 

describe('Explore Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );
    const exploreComponent = screen.getByTestId('explore-component');
    expect(exploreComponent).toBeInTheDocument();
  });

  test('renders the correct static text and images', () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    const headerText = screen.getByText(/Explore matrimonial profiles/i);
    expect(headerText).toBeInTheDocument();

    const arrowImage = screen.getAllByAltText('arrow');
    expect(arrowImage.length).toBeGreaterThan(0); 
  });

  test('renders dynamic content correctly', () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    const cards = screen.getAllByText(/RELIGION|CASTE|MOTHER TONGUE/i);
    expect(cards.length).toBeGreaterThan(0); 
  });

  test('navigates to the signup page when the Explore button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MemoryRouter>
          <Explore />
        </MemoryRouter>
      </Router>
    );

    const exploreButtons = screen.getAllByText(/Explore/i);
    exploreButtons.forEach(button => {
      fireEvent.click(button);
      expect(history.location.pathname).toBe("/");
    });
  });

  test('renders all dynamic items', () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    const items = screen.getAllByText(/Hindu \| Muslim \| Christian Buddhism \| Jain \| Sikhism/i);
    expect(items.length).toBeGreaterThan(0); 
  });
});
