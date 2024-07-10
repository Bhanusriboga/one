import React from 'react';
import  { useEffect, useState } from 'react';
import { Col, Row} from 'reactstrap';
import { users } from "./Data";
import UsersCard from "./UsersCard";
import { FaArrowLeft } from "react-icons/fa6";

import './Usercard.css';
import { toast } from 'react-toastify';
import PaginationComponent from '../ignoreUsers/PaginationComponent';


import chat from '../../Assets/chat.svg'
function ShortListedUsers() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [ignoreList ,setIgnoreList] = useState([]);
  const [pendingIgnoreList, setPendingIgnoreList] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [removeFromShortList,setRemoveFromShortList] = useState([])
const removeUserFromShortList= (userId)=>{
    setRemoveFromShortList((prevList)=>[...prevList,userId])
    toast.error('User removedmoved from shortlist! added to main list', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  
  }
  const handleMoveToIgnoreList = (userId) => {
    if (ignoreList.includes(userId)|| pendingIgnoreList.includes(userId)) {
      toast.error('User already in shortlist', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const userExists = users.some((user) => user.id === userId);
    if (userExists) {
      setPendingIgnoreList((prevList) => [...prevList, userId]);

      const toastId = toast.success(
        <div>
          User will be moved to ignorelist. 
          <button  style={{border:'5px', borderRadius:'5px' ,float:'right', backgroundColor:'olive', fontSize:'12px',padding:'8px',color:'white'}} onClick={() =>  undoMoveToIgnoreList(userId, toastId)}>Undo</button>
        </div>,
        {
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setTimeout(() => {
        setPendingIgnoreList((prevList) => {
          if (prevList.includes(userId)) {
            setIgnoreList((shortList) => [...shortList, userId]);
            toast.success('User moved to ignorelist', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return prevList.filter(id => id !== userId);
          }
          return prevList;
        });
      }, 8000);
    } else {
      toast.error('User not found', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const undoMoveToIgnoreList = (userId, toastId) => {
    setPendingIgnoreList((prevList) => prevList.filter(id => id !== userId));
    toast.update(toastId, {
      render: 'User move to ignorelist cancelled',
      // type: toast.TYPE.INFO,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const filteredUsers = users.filter(user => !ignoreList.includes(user.id) && !removeFromShortList.includes(user.id));
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setUsersPerPage(4);
      } else if (window.innerWidth < 768) {
        setUsersPerPage(6);
      } else {
        setUsersPerPage(10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentUsers.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [ignoreList, currentPage, currentUsers.length]);
  return (
    <div style={{position:"relative"}} >
     
   
      <div className="shortlist-container">

      <div className='shortlist-mobile-back-arrow-container'>
      <FaArrowLeft className='shortlist-back-mobile' 
       />
      <h4 className='shortlist-heading'
      >Shortlisted</h4>
      </div>
    
      <Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-2 g-md-3">
        {currentUsers.map((user, index) => {
          if(ignoreList.includes(user.id)){
          
            return null
          }
          let background;
          let color;
          let buttonBackgroundColor;
          let viewButtonColor;

          if (index % 2 === 0) {
            background = 'linear-gradient(#B88A44 0%,#E0AA3E 31%, #F9F295 55% ,#E0AA3E 71%,#B88A44 100%)';
            color = '#780024';
            buttonBackgroundColor= '#780024';
            viewButtonColor = '#FFFFFF';
          } else {
            background = '#780024';
            color = '#FFFFFF';
            buttonBackgroundColor = '#E0AA3E';
            viewButtonColor = '#780024';
          }

          return (
            <Col key={user.id}>
              <UsersCard 
                user={user}
                background={background}
                color={color}
                buttonBackgroundColor={buttonBackgroundColor}
                viewButtonColor={viewButtonColor}
                onMoveToIgnoreList={()=>handleMoveToIgnoreList(user.id)}
                removeUserFromShortList={()=>removeUserFromShortList(user.id)}
          
             
              />
            </Col>
          );
        })}
      </Row>
    
      <div className='shortlisted-pagination'>
      <img src={chat}className='chat-image' 
      />
    
      <PaginationComponent
       totalPages={totalPages}
       currentPage={currentPage}
       onPageChange={handlePageChange}/>
      </div>
      </div>
   
    </div>
  );
}

export default ShortListedUsers;
