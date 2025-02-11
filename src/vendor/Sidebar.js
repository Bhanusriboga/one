import React, { useState } from "react";
import "./SideBar.css";
import Dash from "./Dash";
import { LuUsers } from "react-icons/lu";
import {
  RiCompass2Line,
  RiSearchLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import { IoPower } from "react-icons/io5";
import Dashboard from "./Dashboard";
import AdminPopup from "./AdminPopup";
import DeleteUsers from "./DeleteUsers";
import { AiOutlineStop } from "react-icons/ai";
import ApprovalUsers from "./ApprovalUsers";
import Storage from "../utils/Storage";
import { useDispatch, useSelector } from "react-redux";
import { usersFilter } from "../redux/slices/AdminUsers";

const Sidebar = () => {
  const role=Storage.get("role")
  const [activeContent, setActiveContent] = useState(role=="ADMIN"?"DashBoard":"Filter");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { Mydata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const RenderContent = () => {
    switch (activeContent) {
      case "DashBoard":
        return <Dash />;
      case "Filter":
        return (
          <Dashboard
            isShown={isSidebarOpen}
            setIsShown={setIsSidebarOpen}
            searchTerm={searchTerm}
          />
        );
      case "Delete Users":
        return (
          <DeleteUsers
            isShown={isSidebarOpen}
            setIsShown={setIsSidebarOpen}
            searchTerm={searchTerm}
          />
        );
      case "Approvals":
        return (
          <ApprovalUsers
            isShown={isSidebarOpen}
            setIsShown={setIsSidebarOpen}
            searchTerm={searchTerm}
          />
        );
      default:
        return null;
    }
  };

  const logo = { id: "Logo", title: "LOGO" };
  const roleList = Storage.get("role");
  const buttonData =
    roleList == "ADMIN"
      ? [
          { id: "DashBoard", label: "Dashboard", icon: <RiCompass2Line /> },
          { id: "Filter", label: "All Users", icon: <LuUsers /> },
          {
            id: "Delete Users",
            label: "Delete Users",
            icon: <AiOutlineStop />,
          },
          { id: "Approvals", label: "Approvals", icon: <AiOutlineStop /> },
        ]
      : [{ id: "Filter", label: "All Users", icon: <LuUsers /> }];

  const handlePopupVisibility = (action) => {
    setIsPopupVisible(action === "show");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearch = async(event) => {
    // Allow only digits and limit to 10 characters
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setSearchTerm(value);
       await dispatch(usersFilter(searchTerm)) 
    }
  };

  return (
    <div className="app-container">
      <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo">
          {isSidebarOpen && (
            <RiCloseLine className="close-icon" onClick={toggleSidebar} />
          )}
          <div className="logo-title">{logo.title}</div>
        </div>

        <ul className="nav flex-column">
          {buttonData?.map((button) => (
            <li
              key={button.id}
              className={`nav-item ${
                activeContent === button.id ? "active" : ""
              }`}
            >
              <button
                className="btn btn-link"
                onClick={() => {
                  setActiveContent(button.id);
                  setIsSidebarOpen(false);
                }}
              >
                <span className="icon">{button.icon}</span>
                <button
                  className="label"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {button.label}
                </button>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <div className="top-navbar">
          <div className="hamburger-icon" onClick={toggleSidebar}>
            <RiMenuLine />
          </div>
          <div className="top-nav-search">
            <RiSearchLine className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="top-nav-icons">
            <button
              className="top-nav-button"
              onClick={() => handlePopupVisibility("show")}
            >
              <IoPower />
            </button>
            <div className="profile-circle">{Mydata?.userName?.charAt(0)}</div>
            <span className="profile-name">{Mydata?.userName}</span>
          </div>
        </div>
        <RenderContent />
      </div>
      {isPopupVisible && (
        <div className="popup-container">
          <AdminPopup />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
