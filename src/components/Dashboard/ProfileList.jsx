import React, { useEffect, useState } from 'react'
// import { Card, CardTitle, CardText, Button } from 'reactstrap';
import { Row } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import './ProfileList.scss'
import Filters from './filters';
import UsersCard from '../../common-components/UserCard';
import Loader from '../../common-components/Loader';
import { changeUserStatus, getAllUsers,UserFilterApi } from '../../redux/slices/users';
import PaginationComponent from '../../common-components/pagination/PaginationComponent';
import Storage from '../../utils/Storage';
const ProfileList = () => {
  const [filterdata, setfilterData] = useState([])
  const { data, loading } = useSelector(state => state.users)
  const userId=Storage.get("userId")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const dispatch = useDispatch()
  const handleFilters = () => {

  }
  useEffect(() => {
    getAllUsersData();
  }, [])

  const getAllUsersData = async () => {
    const data=await dispatch(getAllUsers());
    setfilterData(data?.payload?.object)
    setTotalpages(Math.ceil(data?.payload?.object?.length / 12));
    setCurrentPage(1);
  }
  useEffect(() => {
    setfilterData(data)
  }, [data,userId])

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const filters =async (maindata) => {
    let updatedfilteredData = [];
    const filters = Object.fromEntries(
      Object.entries({
        religion: maindata?.religion,
        caste: maindata?.cast,
        subcast: maindata?.subcast,
        martialStatus: maindata?.marital,
        occupation: maindata?.occupation,
        minAge: maindata?.minAge,
        maxAge: maindata?.maxAge,
        city: maindata?.city,
        annualIncome: maindata?.annualIncome
      }).filter(([, value]) => value !== "" && value !== undefined && value !== null)
    );
    if (maindata?.religion !== '' || maindata?.subcast!== '' || maindata?.cast !== ''|| maindata?.martialStatus !== '' || maindata?.occupation !== '' || maindata?.minAge !== '' || maindata?.maxAge !== '' || maindata?.city !== '' || maindata?.annualIncome !== '') {
      const data = await dispatch(UserFilterApi(filters));
      updatedfilteredData = data?.payload?.object;
      setTotalpages(Math.ceil(updatedfilteredData?.length / 12));
    }
    return updatedfilteredData
  }
  const handleBasic = async(FilterItems) => {
    const responseData=await filters(FilterItems)
    if(responseData?.length!==0)
    setfilterData(responseData)
  }

  const changeUSerStateById = async (affectedUserId, changeByUserId, userStatus) => {
    await dispatch(changeUserStatus({ affectedUserId, changeByUserId, userStatus }))
    await getAllUsersData();
  }

  return (
    <div>
      <Filters handleFilters={handleFilters} handleBasic={handleBasic} />
      {loading ? (<Loader />):
        (<Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-2 g-md-3 w-100 bcg">
          {filterdata?.slice(currentPage * 12 -12, currentPage * 12)?.map((val, index) => {
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
              <UsersCard
                key={index}
                user={val}
                onMoveToIgnoreList={() => changeUSerStateById(val.userId, userId, "Ignored")}
                removeUserFromShortList={() => changeUSerStateById(val.userId, userId, "Shortlisted")}
                background={background}
                color={color}
                viewButtonColor={viewButtonColor}
                buttonBackgroundColor={buttonBackgroundColor} 
                />
            )
          })}
        </Row>)}
        <div className='d-flex justify-content-center pt-2'>
        {totalpages>1 &&<PaginationComponent
            totalPages={totalpages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />}
        </div>
    </div>
  )

}

export default ProfileList