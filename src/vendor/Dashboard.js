import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import "./Dashboard.css";
import SingleUser from "./SingleUser";
import PropTypes from 'prop-types';
const Dashboard = (props) => {
  const { isShown, setIsShown, searchTerm } = props;
  const [data, setData] = useState([]);

  const fetchUser = async () => {
    const resp = await axios.get("http://localhost:8000/users");
    setData(resp.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                {filteredData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.mobile}</td>
                    <td>{user.mailid}</td>
                    <td>{user.caste}</td>
                    <td>
                      <button id={user.status === "Active" ? "active" : "inactive"}>
                        {user.status}
                      </button>
                    </td>
                    <td>
                      <i className="eye">
                        <IoEyeOutline onClick={() => setIsShown(!isShown)} />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
Dashboard.propTypes = {
  isShown: PropTypes.bool.isRequired,         
  setIsShown: PropTypes.func.isRequired,     
  searchTerm: PropTypes.string.isRequired,    
};
export default Dashboard;
