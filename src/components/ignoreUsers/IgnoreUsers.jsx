import React, { useEffect,useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import './Ignoreuser.css';
import { ignoreUserText } from '../../utils/constants';
import PaginationComponent from '../../common-components/pagination/PaginationComponent';
import UsersCard from '../../common-components/UserCard';
import { getIgnoredUsers  } from '../../redux/slices/Users';
import { changeUserStatus } from '../../redux/slices/Users';
import Loader from '../../common-components/Loader';

function IgnoreUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const { userId } = useSelector(state => state.auth)
  const {loader}=useSelector(state=>state.users)
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
const changeUSerStateById = async (affectedUserId, changeByUserId, userStatus) => {
  await dispatch(changeUserStatus({ affectedUserId, changeByUserId, userStatus }))
  getIgnoreItemList();
}

  const handlePageChange=(currentPage)=>{
    setCurrentPage(currentPage);
  }

  return (
    <div>
      <div className="ignore-container">
        <div className='mobile-back-arrow-container'>
          <FaArrowLeft className='ignore-back-mobile' />
          <h4 className='ignore-heading'>{ignoreUserText.heading}</h4>
        </div>

        {loader?<Loader/>:<Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-4 g-md-3">
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
                  onMoveToIgnoreList={() => changeUSerStateById(user.userId, userId, "Ignored")}
                removeUserFromShortList={() => changeUSerStateById(user.userId, userId, "Shortlisted")}
                />
              </Col>
            );
          })}
        </Row>}
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