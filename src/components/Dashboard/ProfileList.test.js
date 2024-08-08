import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProfileList from './ProfileList'; // Adjust the import based on your file structure
import rootReducer from '../../redux/slices/Users'; // Adjust based on your file structure

const store = createStore(rootReducer, {
  user: {
    data: [{ userId: 1, name: 'John Doe' }], // Mock data
  },
});

test('should render user cards when data is loaded', () => {
  const { getByText } = render(
    <Provider store={store}>
      <ProfileList />
    </Provider>
  );
  expect(getByText('John Doe')).toBeInTheDocument();
});
