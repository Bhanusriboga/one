import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import { ignoreUserText } from '../../utils/constants';
import { toast } from 'react-toastify';
import PaginationComponent from '../../common-components/pagination/PaginationComponent';
import UsersCard from '../../common-components/UserCard';
import { getShortListedUsers, getIgnoredUsers } from '../../redux/slices/Users';

import './Usercard.css';

function ShortListedUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(10);
  const dispatch = useDispatch();

  const { shortlisted } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getShortListedUsers());
    setTotalpages(Math.ceil(shortlisted.length / 10));
    setCurrentPage(1);
  }, [dispatch]);

  const handleMoveToIgnoreList = (userId) => {
    const userExists = shortlisted.some((user) => user.userId === userId);
    if (userExists) {
      const toastId = toast.success(
        <div>
          User will be moved to ignore list.
          <button
            style={{
              border: '5px',
              borderRadius: '5px',
              float: 'right',
              backgroundColor: 'olive',
              fontSize: '12px',
              padding: '8px',
              color: 'white'
            }}
            onClick={() => undoMoveToIgnoreList(userId, toastId)}
          >
            Undo
          </button>
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
        dispatch(getIgnoredUsers("shortlisted"));
        toast.success('User moved to ignore list', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
    dispatch(getShortListedUsers("shortlisted"));
    toast.update(toastId, {
      render: 'User move to ignore list cancelled',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const removeUserFromShortList = () => {
    dispatch(getIgnoredUsers("Shortlisted"));
    toast.error('User removed from short list!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 576) {
  //       setUsersPerPage(4);
  //     } else if (window.innerWidth < 768) {
  //       setUsersPerPage(6);
  //     } else {
  //       setUsersPerPage(10);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);


  return (
    <div style={{ position: "relative" }}>
      <div className="shortlist-container">
        <div className='shortlist-mobile-back-arrow-container'>
          <FaArrowLeft className='shortlist-back-mobile' />
          <h4 className='shortlist-heading'>{ignoreUserText.heading1}</h4>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-2 g-md-3">
          {shortlisted.map((user, index) => {
            let background;
            let color;
            let buttonBackgroundColor;
            let viewButtonColor;

            if (index % 2 === 0) {
              background = 'linear-gradient(#B88A44 0%,#E0AA3E 31%, #F9F295 55% ,#E0AA3E 71%,#B88A44 100%)';
              color = '#780024';
              buttonBackgroundColor = '#780024';
              viewButtonColor = '#FFFFFF';
            } else {
              background = '#780024';
              color = '#FFFFFF';
              buttonBackgroundColor = '#E0AA3E';
              viewButtonColor = '#780024';
            }

            return (
              <Col key={user.userId}>
                <UsersCard
                  user={user}
                  background={background}
                  color={color}
                  buttonBackgroundColor={buttonBackgroundColor}
                  viewButtonColor={viewButtonColor}
                  onMoveToIgnoreList={() => handleMoveToIgnoreList(user.userId)}
                  removeUserFromShortList={() => removeUserFromShortList(user.userId)}
                />
              </Col>
            );
          })}
        </Row>
        <div className='shortlisted-pagination'>
         {totalpages>1&& <PaginationComponent
            totalPages={totalpages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />}
        </div>
      </div>
    </div>
  );
}

export default ShortListedUsers;
