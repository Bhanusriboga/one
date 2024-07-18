import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import IgnoreCard from './IgnoreCard';
import { BrowserRouter as Router } from 'react-router-dom';

const mockUserDetails = {
  user: {
    id: '1',
    name: 'John Doe',
    time_of_birth: '1990-01-01',
    religion: { religion_name: 'Christianity' }
  },
  background: '#fff',
  color: '#000',
  viewButtonColor: '#ff0000',
  buttonBackgroundColor: '#00ff00',
  onMoveToShortList: jest.fn(),
  removeUserFromIgnoreList: jest.fn()
};

const renderComponent = (props) => {
  return render(
    <Router>
      <IgnoreCard {...props} />
    </Router>
  );
};

describe('IgnoreCard Component', () => {
  test('renders without crashing', () => {
    renderComponent(mockUserDetails);
  });

  test('displays user name', () => {
    renderComponent(mockUserDetails);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('calculates and displays age correctly', () => {
    renderComponent(mockUserDetails);
    const age = new Date().getFullYear() - new Date(mockUserDetails.user.time_of_birth).getFullYear();
    expect(screen.getByText('Age :')).toBeInTheDocument();
    expect(screen.getByText(`${age}`)).toBeInTheDocument();
  });

  test('displays user religion', () => {
    renderComponent(mockUserDetails);
    expect(screen.getByText('Religion :')).toBeInTheDocument();
    expect(screen.getByText('Christianity')).toBeInTheDocument();
  });

  test('calls removeUserFromIgnoreList when ignore icon is clicked', () => {
    renderComponent(mockUserDetails);
    const ignoreIcon = screen.getByAltText('ignore');
    act(() => {
      fireEvent.click(ignoreIcon);
    });
    expect(mockUserDetails.removeUserFromIgnoreList).toHaveBeenCalledTimes(1);
  });

  test('calls onMoveToShortList when heart icon is clicked', () => {
    renderComponent(mockUserDetails);
    const heartIcon = screen.getByTestId('ignorecase-hearticon');
    act(() => {
      fireEvent.click(heartIcon);
    });
    expect(mockUserDetails.onMoveToShortList).toHaveBeenCalledTimes(1);
  });

  test('renders View Profile button with correct styles', () => {
    renderComponent(mockUserDetails);
    const viewProfileButton = screen.getAllByText('View Profile')[0].closest('button');
    expect(viewProfileButton).toHaveStyle(`background-color: ${mockUserDetails.buttonBackgroundColor}`);
    expect(viewProfileButton).toHaveStyle(`color: ${mockUserDetails.viewButtonColor}`);
  });

  test('View Profile button contains correct link', () => {
    renderComponent(mockUserDetails);
    const viewProfileLink = screen.getAllByText('View Profile')[0].closest('a');
    expect(viewProfileLink).toHaveAttribute('href', `/user/${mockUserDetails.user.id}`);
  });
});
