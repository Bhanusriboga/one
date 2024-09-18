import React from 'react';
import { render, screen } from '@testing-library/react';
import ChooseUs from './HomePageContainer/ChooseUs';


describe('Choose Component', () => {
  test('renders the Choose component', () => {
    render(<ChooseUs  />);
    const chooseComponent = screen.getByTestId('choose-component');
    expect(chooseComponent).toBeInTheDocument();
  });

  test('displays the Why Choose Us? text', () => {
    render(<ChooseUs  />);
    expect(screen.getByText('Why Choose Us ?')).toBeInTheDocument();
  });
});
