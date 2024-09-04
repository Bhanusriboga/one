import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Input,  } from "reactstrap";
import { MdDeleteOutline } from "react-icons/md";
import "./Dashboard.css";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { adminDirectDeleteUser, getAllAdminDeleteUsers } from "../redux/slices/AdminUsers";
import { toast } from "react-toastify";
import { toastError, toastsuccess } from "../utils/constants";

const DeleteUsers= (props) => {
  const { isShown, //setIsShown, //searchTerm
   } = props;
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedUserId,setSelectedUserId]=useState(null)
 const dispatch = useDispatch()
 const toggle = () => setModal(!modal);
 const changehandler = (e)=>{
  setReason(e.target.value)
}
const deleteRequest = (userId) => {
  setSelectedUserId(userId);
  toggle();
};
 const handleDelete =async() => {
  const deleteData = {
    selectedUserId,
    reason
  };
  const data = await dispatch(adminDirectDeleteUser(deleteData))
  if(data.payload?.message == "User Profile Deleted Successfully"){
    toast.success("User Profile Deleted Successfully",toastsuccess)  
     }else{
       toast.error('something went wrong',toastError)
     }

  toggle();
 }
  const fetchUser = async () => {
    const resp = await dispatch(getAllAdminDeleteUsers())
    setData(resp.payload?.object || []);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const filteredData = data?.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="container-fluid">
      {!isShown && <h4 className="text"> Deleted Users</h4>}
      <div className="table-1">
       
          <>
          {data?.length == 0 ? <h1 className="text-center pt-5">No  Users Data Found</h1>:           
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
                {data?.map((user ,index) => (
                  <tr key={user?.id}>
                    <td>{index+1}</td>
                    <td>{user?.vendorName}</td>
                    <td>{user?.mobileNumber}</td>
                    <td>{user?.email}</td>
                    <td>{user?.userId}</td>
                    <td>{user?.reason}</td>
                    
                    <td>
                      <i className="eye">
                        <MdDeleteOutline className="delete-user-vendor"   onClick={()=>deleteRequest(user?.userId)} />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
          </>
       
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
DeleteUsers.propTypes = {
  isShown: PropTypes.bool.isRequired,         
  setIsShown: PropTypes.func.isRequired,     
  searchTerm: PropTypes.string.isRequired,    
};
export default DeleteUsers;
