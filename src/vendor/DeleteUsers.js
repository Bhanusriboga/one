import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import "./Dashboard.css";
import PropTypes from 'prop-types';

const DeleteUsers= (props) => {
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
      {!isShown && <h4 className="text"> Deleted Users</h4>}
      <div className="table-1">
       
          <>
            <table className="table tab">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Vendor Name</th>
                  <th>Mobile Number</th>
                  <th>Mail Id</th>
                  <th>User Id</th>
                  <th>Reason for the delete</th>
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
                      <text>
                        {user.status}
                      </text>
                    </td>
                    <td>
                      <i className="eye">
                        <MdDeleteOutline className="delete-user-vendor" onClick={() => setIsShown(!isShown)} />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
       
      </div>
    </div>
  );
};
DeleteUsers.propTypes = {
  isShown: PropTypes.bool.isRequired,         
  setIsShown: PropTypes.func.isRequired,     
  searchTerm: PropTypes.string.isRequired,    
};
export default DeleteUsers;
