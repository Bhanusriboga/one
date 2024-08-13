import React from 'react';
import loader from '../Assets/loader.gif'
const Loader = () => {
  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;