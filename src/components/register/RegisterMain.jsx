import React from "react";
import "./Registermain.css";

import image1 from "../../Assets/signup2.png";
import { registerMain } from "../../utils/constants";
import Stepper from "./Stepper";
import logo from "../../Assets/registelogo.png";
function RegisterMain() {
  return (
    <div className="d-flex align-item-center justify-content-between main-container">
      <img src={logo} alt="logo" className="img-logo" />

      <div className="content">
        <h1 className=" mb-3 font-weight-bold  fs-1 mb-md-5  register-text">
        
          Register
        </h1> 
        <Stepper />
      </div>
      <div className="img-container1">
        <div className="position-absolute text-block">
          <p className="img-text">
            {registerMain.imgHeading} <b>{registerMain.textIlaic}</b>
          </p>
          <p className="img-text1">{registerMain.imgtext}</p>
        </div>

        <img src={image1} alt="image" className=" img-container" />
      </div>
    </div>
  );
}

export default RegisterMain;
