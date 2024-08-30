import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Form } from "reactstrap";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { Switch, Route, useHistory, useLocation,Redirect } from "react-router-dom";
import Settings from "../settings/Settings";
import IgnoreUsers from "../ignoreUsers/IgnoreUsers";
import ShortListedUsers from "../shortlistedUsers/ShortListedUsers";
import ProfileList from "../Dashboard/ProfileList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomSideBar.scss";
import Editprofile from "../editprofile/Editprofile";
import AddPreferences from "../AddPreferences/AddPreference";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/slices/AuthSlice";
import CustomWidget from "../ChatBot/CustomWidget";
import Userprofile from "../UserProfile/Userprofile";
import { getProfilePic, updateProfilePic } from "../../redux/slices/ProfilePic";
import UPIPayment from "../payment/Payment";
import { setIsOpen } from "../../redux/slices/users";
const CustomSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImg] = useState("");
  const fileInputRef = useRef(null);
  const [paymentPopup,setPaymentPopup]=useState(false);
  const togglePayment=()=>setPaymentPopup(!paymentPopup);
  const scrollToBottom=()=>{
    botRef?.current?.scrollIntoView({behavior:'smooth'})
  }
  const history = useHistory();
  const location = useLocation();
  const botRef=useRef(null)
  const dispatch = useDispatch();
  const logout = async () => {
    await dispatch(logoutAction());
    history.push("/home"); // Redirect to home or login after logout
  };
  const getImgage = async () => {
    const data = await dispatch(getProfilePic());
    if (data?.payload?.message !== "") {
      setImg(data?.payload?.message);
    }
  };
  useEffect(() => {
    getImgage();
  }, []);
  const buttonData = [
    { id: "editProfile", label: "Edit Profile", path: "edit-profile" },
    { id: "addPreferences", label: "Add Preferences", path: "add-preferences" },
    { id: "ignoredUsers", label: "Ignored Users", path: "ignored-users" },
    { id: "shortlisted", label: "Shortlisted", path: "shortlisted" },
    { id: "settings", label: "Settings", path: "settings" },
    { id: "singleUser", label: "single User", path: "user-details" },
  ];
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const data = await dispatch(updateProfilePic(formData));
      if (data?.payload?.message?.startsWith("File uploaded successfully")) {
        getImgage();
      }
    }
  };
  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const extraButtons = [
    { id: "Pricing", label: "Pricing", path: "payment",onclick:togglePayment },
    { id: "Chat with Us", label: "Chat with Us", path: "chat",onclick:()=>{
      dispatch(setIsOpen(true))
    } },
    { id: "Contact Us", label: "Contact Us", path: "contact",onclick:scrollToBottom },
  ];
  const RenderContent = () => {
    return (
      <Switch>
        <Route path="/dashboard" component={ProfileList} />
        <Route path="/add-preferences" component={AddPreferences} />
        <Route path="/edit-profile" component={Editprofile} />
        <Route path="/ignored-users" component={IgnoreUsers} />
        <Route path="/shortlisted" component={ShortListedUsers} />
        <Route path="/settings" component={Settings} />
        <Route path="/user-details/:id" component={Userprofile} />
        <Redirect path="/" to="/dashboard" /> 
      </Switch>
    );
  };

  return (
    <Container fluid className="outer-container mt-4 mb-4">
      <Row className=" w-100">
      <button onClick={togglePayment} className='border-0 bg-transparent'>
        {paymentPopup&&<UPIPayment/>}
        </button>
        <Col
          xs="12"
          className="d-flex flex-row justify-content-between d-md-none">
          <Button
            className="bg-transparent border-0"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              <RxCross2 size={30} color="#780024" />
            ) : (
              <FaBarsStaggered size={30} color="#780024" />
            )}
          </Button>
          <div className="image-container">
            {image !== "" && (
              <img
                src={image}
                alt="profile"
                className="w-100 h-100 rounded-circle"
              />
            )}

            <Form className="position-absolute bottom-0 end-0 bg-white d-flex align-items-center justify-content-center rounded-circle p-1">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <MdEdit onClick={handleClick} size={"15px"} className="mt-1" />
            </Form>
          </div>
        </Col>
        <Col
          xs={isSidebarOpen ? "12" : "3"}
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="image-container1">
            {image !== "" && (
              <img
                src={image}
                alt="profile"
                className="w-100 h-100 rounded-circle"
              />
            )}

            <Form>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // Hide the input field
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={handleClick}
                className="d-flex align-items-center justify-content-center border-0 position-absolute bottom-0 gap-1 add">
                Add
                <MdEdit size={"15px"} className="mt-1" />
              </Button>
            </Form>
          </div>
          {buttonData.map((button, index) =>
            index == buttonData.length - 1 ? null : (
              <div key={button.id} className="button-parent">
                <Button
                  block="true"
                  className="bg-transparent border-0 text-color"
                  onClick={() => {
                    history.push(`/${button.path}`);
                    setIsSidebarOpen(false);
                  }}>
                  {button.label}
                </Button>
                {index !== buttonData.length - 2 && <hr className="hr" />}
              </div>
            )
          )}
          {/* Render small screen navigation buttons after the sidebar content */}
          <div className="w-100 d-block d-md-none justify-content-end sidebar-nav">
            <hr className="hr" />
            {extraButtons.map((button, index) => (
                <div className="button-parent" key={button.id}>
                  <Button
                    block
                    className="bg-transparent border-0 text-color"
                    onClick={() => {
                      // history.push(`/${button.path}`)
                      button.onclick();
                      setIsSidebarOpen(false);
                      }}>
                    {button.label}
                  </Button>
                  {index !== extraButtons.length - 1 && <hr className="hr" />}
                </div>
            ))}
            <div className="button-parent">
              <hr className="hr" />
              <Button block className="text-color" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </Col>
        <Col
          xs="12"
          md="9"
          className="content  pt-0 ml-5"
          data-testid="content">
          {location.pathname !== "/dashboard" ? (
            <button
              onClick={() => history.push("/dashboard")}
              className="back-button bg-white gap-1">
              <FaArrowLeft color="#616161" size={15} />
              <span className="text-lightBlack">Back</span>
            </button>
          ) : null}
          <RenderContent />
        </Col>
      </Row>
      <CustomWidget />
      <div ref={botRef}/>
    </Container>
  );
};

export default CustomSideBar;
