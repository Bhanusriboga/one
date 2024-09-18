import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Couple from './Couple';
import animation from './assets/Animation - 1720516602656.json';
import Lottie from 'react-lottie';
import CoupleData from './HomePageContainer/CoupleData';

jest.mock('react-lottie', () => jest.fn(() => null));

describe('Couple Component', () => {
  test('Couple Component', () => {
    render(<CoupleData  />);
    const chooseComponent = screen.getAllByTestId('CoupleData-component');
    expect(chooseComponent).toBeInTheDocument();
  });
});
