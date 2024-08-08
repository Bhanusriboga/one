import React from 'react';
import { render, screen } from '@testing-library/react';
import PageContainer from './PageContainer';

jest.mock('../custom-side-bar/CustomSideBar', () => () => <div>Mocked SideBar</div>);
describe('PageContainer Component', () => {
  test('renders PageContainer component', () => {
    render(<PageContainer />);
    const pageContainer = screen.queryByTestId('page-container');
    expect(pageContainer).toBeInTheDocument();
  });

  test('renders CustomSideBar component', () => {
    render(<PageContainer />);
    const sideBar = screen.getByText('Mocked SideBar');
    expect(sideBar).toBeInTheDocument();
  });

  test('contains correct class names', () => {
    render(<PageContainer />);
    const pageContainer = screen.queryByTestId('page-container');
    expect(pageContainer).toBeInTheDocument(); 
    if (pageContainer) {
      expect(pageContainer).toHaveClass('dashbcg');
    }
    const childDiv = screen.queryByTestId('child-div');
    expect(childDiv).toBeInTheDocument(); 
    if (childDiv) {
      expect(childDiv).toHaveClass('d-flex');
      expect(childDiv).toHaveClass('justify-content-center');
    }
  });
});
