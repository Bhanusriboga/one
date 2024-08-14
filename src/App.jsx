import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routes from './app.routes.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const App = () => {
  return (
    <div className='vh-100 w-100'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
