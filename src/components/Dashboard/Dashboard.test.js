import React from 'react';
import { render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import Dashboard from './Dashboard';
import Header from './Header';
import FooterBar from './FooterBar';
import PageContainer from './PageContainer';
import { fetchUserInfo } from '../../redux/slices/AuthSlice';
import { getShortListedUsers, getIgnoredUsers } from '../../redux/slices/users';

// Mock components and actions
jest.mock('./Header', () => () => <div>Header Mock</div>);
jest.mock('./FooterBar', () => () => <div>FooterBar Mock</div>);
jest.mock('./PageContainer', () => () => <div data-testid="page-container">PageContainer Mock</div>);
jest.mock('../../redux/slices/AuthSlice', () => ({
  fetchUserInfo: jest.fn(),
}));
jest.mock('../../redux/slices/users', () => ({
  getIgnoredUsers: jest.fn(),
  getShortListedUsers: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Dashboard Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render Header, PageContainer, and FooterBar components', () => {
    render(<Dashboard />);
    expect(screen.getByText('Header Mock')).toBeInTheDocument();
    expect(screen.getByText('PageContainer Mock')).toBeInTheDocument();
    expect(screen.getByText('FooterBar Mock')).toBeInTheDocument();
  });

  test('should dispatch fetchUserInfo, getIgnoredUsers, and getShortListedUsers actions on mount', () => {
    render(<Dashboard />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchUserInfo());
    expect(mockDispatch).toHaveBeenCalledWith(getIgnoredUsers());
    expect(mockDispatch).toHaveBeenCalledWith(getShortListedUsers());
  });
  test('should have correct structure and class names', () => {
    const { container } = render(<Dashboard />);
    expect(container.querySelector('.h-100.w-100.pgback')).toBeInTheDocument();
    expect(container.querySelector('.pageHeader')).toBeInTheDocument();
    expect(container.querySelector('.pageContainer.conwidth')).toBeInTheDocument();
    expect(container.querySelector('.pageFooter')).toBeInTheDocument();
  });
test('should contain PageContainer component with correct data-testid', () => {
    render(<Dashboard />);
    const pageContainerElement = screen.getByTestId('page-container');
    expect(pageContainerElement).toBeInTheDocument();
  });
});
