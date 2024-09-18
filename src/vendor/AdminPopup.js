import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
const AdminPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const handlePopupVisibility = (action) => {
    if (action === "hide") {
      setIsPopupVisible(false);
    } else {
      setIsPopupVisible(true);
    }
  };

  const handleLogoutClick = async () => {
    await dispatch(logout());
    history.go(0);
  };

  return (
    <div className="container">
      {isPopupVisible && (
        <div className="card popup_content">
          <div className="card-body">
            <div className="d-flex justify-content-center align-items-center mb-6">
              Are you sure you want to logout?
            </div>
          </div>
          <div className="card-footer">
            <div className="card-text">
              <div className="d-flex justify-content-center">
                <div className="d-flex flex-grow-1 justify-content-center align-items-center border-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => handlePopupVisibility("hide")}
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                  <button className="btn btn-light" onClick={handleLogoutClick}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPopup;
