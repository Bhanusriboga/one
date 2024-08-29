import React, { useState } from "react";
import "./SideBar.css";
import Dash from "./Dash";
import { LuUsers } from "react-icons/lu";
import { RiCompass2Line, RiSearchLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { IoPower } from "react-icons/io5";
import Dashboard from "./Dashboard";
import AdminPopup from "./AdminPopup";
import DeleteUsers from "./DeleteUsers";
import { AiOutlineStop } from "react-icons/ai";
import ApprovalUsers from "./ApprovalUsers";

const Sidebar = () => {
  const [activeContent, setActiveContent] = useState("DashBoard");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const RenderContent = () => {
    switch (activeContent) {
      case "DashBoard":
        return <Dash />;
      case "Filter":
        return <Dashboard isShown={isSidebarOpen} setIsShown={setIsSidebarOpen} searchTerm={searchTerm} />;
      case 'Delete Users':
        return <DeleteUsers isShown={isSidebarOpen} setIsShown={setIsSidebarOpen} searchTerm={searchTerm} />;
      case "Approvals":
        return <ApprovalUsers isShown={isSidebarOpen} setIsShown={setIsSidebarOpen} searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  const logo = { id: "Logo", title: "LOGO" };

  const buttonData = [
    { id: "DashBoard", label: "Dashboard", icon: <RiCompass2Line /> },
    { id: "Filter", label: "All Users", icon: <LuUsers /> },
    { id: "Delete Users", label: "Delete Users", icon: <AiOutlineStop /> },
    { id: "Approvals", label: "Approvals", icon: <AiOutlineStop /> }
  ];

  const handlePopupVisibility = (action) => {
    setIsPopupVisible(action === "show");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
      <div className="logo">
  {isSidebarOpen && (
    <RiCloseLine className="close-icon" onClick={toggleSidebar} />
  )}
  <div className="logo-title">
    {logo.title}
  </div>
</div>

        <ul className="nav flex-column">
          {buttonData.map((button) => (
            <li
              key={button.id}
              className={`nav-item ${activeContent === button.id ? "active" : ""}`}
            >
              <button
                className="btn btn-link"
                onClick={() => {
                  setActiveContent(button.id);
                  setIsSidebarOpen(false); 
                }}
              >
                <span className="icon">{button.icon}</span>
                <button className="label" onClick={() => setIsSidebarOpen(false)}>{button.label}</button>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="top-nav-icons">
            <button
              className="top-nav-button"
              onClick={() => handlePopupVisibility("show")}
            >
              <IoPower />
            </button>
            <div className="profile-circle">M</div>
            <span className="profile-name">Moni Roy</span>
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
