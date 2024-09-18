import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import { ignoreUserText } from '../../utils/constants';
import PaginationComponent from '../../common-components/pagination/PaginationComponent';
import UsersCard from '../../common-components/UserCard';
import { getShortListedUsers } from '../../redux/slices/users';
import { changeUserStatus } from '../../redux/slices/users';
import Loader from '../../common-components/Loader';
import Storage from '../../utils/Storage';
function ShortListedUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const { loader } = useSelector(state => state.users)
  const userId=Storage.get("userId")
  const dispatch = useDispatch();
  const history=useHistory();
  const { shortlisted } = useSelector((state) => state.users);

  useEffect(() => {
    getShortListedItemList();
    setTotalpages(Math.ceil(shortlisted?.length / 12));
    setCurrentPage(1);
  }, [dispatch]);

  const getShortListedItemList = async () => {
    await dispatch(getShortListedUsers());
    setTotalpages(Math.ceil(shortlisted?.length / 12));
  }

  const changeUSerStateById = async (affectedUserId, changeByUserId, userStatus) => {
    await dispatch(changeUserStatus({ affectedUserId, changeByUserId, userStatus }))
    setTotalpages(Math.ceil(shortlisted?.length / 12));
  }


  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      <div className="shortlist-container">
        <div className='shortlist-mobile-back-arrow-container'>
          <FaArrowLeft className='shortlist-back-mobile'  onClick={() => history.goBack()}/>
          <h4 className='shortlist-heading'>{ignoreUserText.heading1}</h4>
        </div>
        {loader?<Loader/>:<Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-2 g-md-3">
          {shortlisted?.slice(currentPage * 12 - 12, currentPage * 12)?.map((user, index) => {
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
                  onMoveToIgnoreList={() => changeUSerStateById(user.userId, userId, "Ignored")}
                removeUserFromShortList={() => changeUSerStateById(user.userId, userId, "Active")}
                />
              </Col>
            );
          })}
        </Row>}
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
