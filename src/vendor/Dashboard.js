import React, { useState, useEffect } from "react";

import { IoEyeOutline } from "react-icons/io5";
import "./Dashboard.css";
import SingleUser from "./SingleUser";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getAllAdminUsers } from "../redux/slices/AdminUsers";
import { MdDeleteOutline } from "react-icons/md";
import { Modal, ModalHeader, ModalBody, Input,  } from "reactstrap";

const Dashboard = (props) => {
  const {
    isShown,
    setIsShown, //searchTerm
  } = props;
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    console.log("Reason for deleting user:", reason);
    toggle();
  };
  const changehandler = (e)=>{
    setReason(e.target.value)
  }

  const fetchUser = async () => {
    const data = await dispatch(getAllAdminUsers());
    setData(data.payload?.object);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const filteredData = data.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="container-fluid">
      {!isShown && <h4 className="text">Users</h4>}
      <div className="table-1">
        {isShown ? (
          <SingleUser />
        ) : (
          <>
            <table className="table tab">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Mail Id</th>
                  <th>Caste</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, ind) => (
                  <tr key={user?.id}>
                    <td>{ind + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.mobile}</td>
                    <td>{user?.email}</td>
                    <td>{user?.caste}</td>
                    <td>
                      <button
                        id={
                          user?.userStatus === "Active" ? "active" : "inactive"
                        }
                      >
                        {user?.userStatus}
                      </button>
                    </td>
                    <td>
                      <div className="d-flex align-items-center  justify-content-center">
                        <i className="eye">
                          <IoEyeOutline onClick={() => setIsShown(!isShown)} />
                        </i>
                        <MdDeleteOutline
                          onClick={toggle}
                          className="delete-user-vendor"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-0 text1 ">
          Are you sure you want to Delete?
        </ModalHeader>
        <ModalBody className="modelbody1">
          <p className="border-0 text ">
            Please type the reason for deleting the user
          </p>
          <div className="container">
            <Input
              type="text"
              value={reason}

              onChange={changehandler}
              placeholder=""
              style={{ height: "140px", width: "410px", marginLeft: "7%" }}
            />
          </div>
        </ModalBody>

        <div className="footer-content">
          <span className="cancel-text" onClick={toggle}>
            Cancel
          </span>
          <span className="delete-text" onClick={handleDelete}>
            Delete
          </span>
        </div>
      </Modal>
    </div>
  );
};
Dashboard.propTypes = {
  isShown: PropTypes.bool.isRequired,
  setIsShown: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
export default Dashboard;
