import React, { useEffect,useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import './Ignoreuser.css';
import { ignoreUserText } from '../../utils/constants';
import { toast } from 'react-toastify';
import PaginationComponent from '../../common-components/pagination/PaginationComponent';
import UsersCard from '../../common-components/UserCard';
import { getShortListedUsers, getIgnoredUsers } from '../../redux/slices/users';

function IgnoreUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(10);
  const dispatch = useDispatch();

  const { ignored } = useSelector((state) => state.users);
  useEffect(() => {
    getIgnoreItemList();
    setTotalpages(Math.ceil(ignored?.length / 10));
    setCurrentPage(1);
  },[])
 
const getIgnoreItemList=async()=>{
 await dispatch(getIgnoredUsers());
}


  const handleMoveToShortList = (userId) => {
    const userExists = ignored.some((user) => user.userId === userId);
    if (userExists) {
      const toastId = toast.success(
        <div>
          User will be moved to shortlist. 
          <button data-testid ="undo-button" style={{border:'5px', borderRadius:'5px' ,float:'right', backgroundColor:'olive', fontSize:'12px',padding:'8px',color:'white'}} onClick={() => undoMoveToShortList( toastId)}>Undo</button>
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
        dispatch(getShortListedUsers("shortlisted"));
        toast.success('User moved to shortlist', {
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
  const handlePageChange=(currentPage)=>{
    setCurrentPage(currentPage);
  }
  const undoMoveToShortList = ( toastId) => {
    dispatch(getIgnoredUsers("ignored"));
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

  const removeUserFromIgnoreList = () => {
    dispatch(getIgnoredUsers("ignored"));
    toast.error('User removed from ignore list!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  return (
    <div>
      <div className="ignore-container">
        <div className='mobile-back-arrow-container'>
          <FaArrowLeft className='ignore-back-mobile' />
          <h4 className='ignore-heading'>{ignoreUserText.heading}</h4>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-4 g-md-3">
          {ignored?.map((user, index) => {
            const even = index % 2 === 0;
            const styles = {
              background: even ? 'linear-gradient(#B88A44 0%,#E0AA3E 31%, #F9F295 55% ,#E0AA3E 71%,#B88A44 100%)' : '#780024',
              color: even ? '#780024' : '#FFFFFF',
              buttonBackgroundColor: even ? '#780024' : '#E0AA3E',
              viewButtonColor: even ? '#FFFFFF' : '#780024'
            };
            return (
              <Col key={user.userId}>
                <UsersCard
                  user={user}
                  background={styles.background}
                  color={styles.color}
                  buttonBackgroundColor={styles.buttonBackgroundColor}
                  viewButtonColor={styles.viewButtonColor}
                  onMoveToIgnoreList={() => handleMoveToShortList(user.userId)}
                  removeUserFromShortList={() => removeUserFromIgnoreList(user.userId)}
                />
              </Col>
            );
          })}
        </Row>
        <div className='ignoredlisted-pagination'>
         {totalpages>1&& <PaginationComponent
            totalPages={totalpages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            data-testid="pagination-component"
          />}
        </div>
      </div>
    </div>
  );
}

export default IgnoreUsers;