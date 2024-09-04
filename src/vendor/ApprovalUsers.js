import React, { useState, useEffect } from "react";

// import { MdDeleteOutline } from "react-icons/md";
import "./Dashboard.css";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import {  getAllVendorApproveUsers,approveUsersByAdmin } from "../redux/slices/AdminUsers";
import ApproveModal from "../vendor/ApproveModal";

const ApprovalUsers = (props) => {
  const { isShown,  //searchTerm 

  } = props;
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [singleUser , setUser] = useState({})
  const dispatch = useDispatch()
 
  const toggle = () => setModal(!modal);
 
  const handleApprove = async(user) => {
   setUser(user)
    toggle();
  };
 
const Approved=async()=>{
  await dispatch(approveUsersByAdmin({...singleUser,userStatus:"Active"}))
  toggle();

}
const Rejected=async()=>{
  await dispatch(approveUsersByAdmin({...singleUser,userStatus:"Inactive"}))
  toggle();
}
  const fetchUser = async () => {
    const resp = await dispatch(getAllVendorApproveUsers())
    setData(resp?.payload?.object||[]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const filteredData = data?.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm)
  // );

  return (
    <div className="container-fluid">
      {!isShown && <h4 className="text"> Approve Users</h4>}
      <div className="table-1">
       
          {data?.length == 0 ? <h1 className="text-center pt-5">No  Users Data Found </h1>:
            (<table className="table tab">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Vendor Name</th>
                  <th>Mobile Number</th>
                  <th>Address</th>
                  <th>Aadhar Number</th>
                  <th>Pan Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user ,index) => (
                  <tr key={user?.id}>
                    <td>{index+1}</td>
                    <td>{user?.vendorName}</td>
                    <td>{user?.mobileNumber}</td>
                    <td>{user?.address}</td>
                    <td>{user?.aadhaarNumber}</td>
                    <td>{user?.panNumber}</td>
                    {/* <td>
                    
                        {user?.userStatus}
                     
                    </td> */}
                    <td>
                      <button onClick = {() => handleApprove(user)} className="approve-user">
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>)
          }
       
      </div>
    <ApproveModal modal={modal} toggle={toggle} handleApprove={Approved} Rejected={Rejected} />
    </div>
  );
};
ApprovalUsers.propTypes = {
  isShown: PropTypes.bool.isRequired,         
  setIsShown: PropTypes.func,                 
  searchTerm: PropTypes.string.isRequired,    
};
export default ApprovalUsers;
