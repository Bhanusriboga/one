import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
// import store from './redux/store';
import configureStore from "redux-mock-store"
const mockStore = configureStore([]);
const store = mockStore({
    
});
 
const renderWithProvider = (component) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};
test('renders learn react link', () => {
  renderWithProvider(<Provider store={store}>
    <App />
    </Provider>);
});
