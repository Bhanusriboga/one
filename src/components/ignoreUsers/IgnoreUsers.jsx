
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { users } from '../shortlistedUsers/Data';
import { FaArrowLeft } from "react-icons/fa6";
import './Ignoreuser.css';

import IgnoreCard from './IgnoreCard';
import { toast } from 'react-toastify';
import PaginationComponent from './PaginationComponent';
import chat from '../../Assets/chat.svg'

function IgnoreUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [shortList, setShortList] = useState([]);
  const [pendingShortList, setPendingShortList] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [userIgnored,setUserIgnored] = useState([])
  

  const handleMoveToShortList = (userId) => {
    if (shortList.includes(userId) || pendingShortList.includes(userId)) {
      toast.error('User already in shortlist or pending', {
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
      setPendingShortList((prevList) => [...prevList, userId]);

      const toastId = toast.success(
        <div>
          User will be moved to shortlist. 
          <button data-testid ="undo-button" style={{border:'5px', borderRadius:'5px' ,float:'right', backgroundColor:'olive', fontSize:'12px',padding:'8px',color:'white'}} onClick={() => undoMoveToShortList(userId, toastId)}>Undo</button>
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
        setPendingShortList((prevList) => {
          if (prevList.includes(userId)) {
            setShortList((shortList) => [...shortList, userId]);
            toast.success('User moved to shortlist', {
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

  const undoMoveToShortList = (userId, toastId) => {
    setPendingShortList((prevList) => prevList.filter(id => id !== userId));
    toast.update(toastId, {
      render: 'User move to shortlist cancelled',
   
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const  removeUserFromIgnoreList = (userId)=>{
    setUserIgnored((prevList)=>[...prevList,userId])
    toast.error('User removed from ignore list!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    
  }

  const filteredUsers = users.filter(user => !shortList.includes(user.id) && !userIgnored.includes(user.id)
);
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
  }, [shortList, pendingShortList, currentPage, currentUsers.length]);

  return (
    <div>
     
      <div className="ignore-container">
       

        <div className='mobile-back-arrow-container'>
          <FaArrowLeft className='ignore-back-mobile' 
            />
          <h4 className='ignore-heading'>Ignorelisted</h4>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-4 g-md-3">
          {currentUsers.map((user, index) => {
            const even = index % 2 === 0;
            const styles = {
              background: even ? 'linear-gradient(#B88A44 0%,#E0AA3E 31%, #F9F295 55% ,#E0AA3E 71%,#B88A44 100%)' : '#780024',
              color: even ? '#780024' : '#FFFFFF',
              buttonBackgroundColor: even ? '#780024' : '#E0AA3E',
              viewButtonColor: even ? '#FFFFFF' : '#780024'
            };

            return (
              <Col key={user.id}>
                <IgnoreCard
                  user={user}
                  background={styles.background}
                  color={styles.color}
                  buttonBackgroundColor={styles.buttonBackgroundColor}
                  viewButtonColor={styles.viewButtonColor}
                  onMoveToShortList={() => handleMoveToShortList(user.id)}
                  removeUserFromIgnoreList= {()=> removeUserFromIgnoreList(user.id)}
                />
              </Col>
            );
          })}
        </Row>
     
        <div className='ignoredlisted-pagination'>
        <img src={chat} className='ignore-chatimage' />
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            data-testid="pagination-component"
          />
        </div>
      </div>
    </div>
  );
}

export default IgnoreUsers;
