import React, { useEffect, useState } from 'react'
// import { Card, CardTitle, CardText, Button } from 'reactstrap';
import { Row } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import './ProfileList.scss'
import Filters from './filters';
import { changeUserStatus, getAllUsers } from '../../redux/slices/Users';
import UsersCard from '../../common-components/UserCard';
import Loader from '../../common-components/Loader';
import PaginationComponent from '../../common-components/pagination/PaginationComponent';
const ProfileList = () => {
  const [filterdata, setfilterData] = useState()
  const { data, loading } = useSelector(state => state.users)
  const { userId } = useSelector(state => state.auth)
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
    setTotalpages(Math.ceil(data?.payload?.object?.length / 10));
    setCurrentPage(1);
  }
  useEffect(() => {
    setfilterData(data)
  }, [data,userId])

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const filters = (data, maindata) => {
    let updatedfilteredData = []
    if (data?.religion !== '' && data?.subcast === '' && data?.cast === '') {
      updatedfilteredData = maindata?.filter(item => item.religion.toLowerCase().includes(data?.religion.toLowerCase()))
    } else if (data?.religion === '' && data?.subcast !== '' && data?.cast === '') {
      updatedfilteredData = maindata?.filter(item => item.subcast.toLowerCase().includes(data?.subcast.toLowerCase()))
    } else if (data?.religion === '' && data?.subcast === '' && data?.cast !== '') {
      updatedfilteredData = maindata?.filter(item => item.cast.toLowerCase().includes(data?.cast.toLowerCase()))
    } else if (data?.religion !== '' && data?.subcast === '' && data?.cast !== '') {
      updatedfilteredData = maindata?.filter(item => item.religion.toLowerCase().includes(data?.religion.toLowerCase()) && item.cast.toLowerCase().includes(data?.cast.toLowerCase()))
    } else if (data?.religion !== '' && data?.subcast !== '' && data?.cast === '') {
      updatedfilteredData = maindata?.filter(item => item.religion.toLowerCase().includes(data?.religion.toLowerCase()) && item.subcast.toLowerCase().includes(data?.subcast.toLowerCase()))
    } else if (data?.religion === '' && data?.subcast !== '' && data?.cast !== '') {
      updatedfilteredData = maindata?.filter(item => item.cast.toLowerCase().includes(data?.cast.toLowerCase()) && item.subcast.toLowerCase().includes(data?.subcast.toLowerCase()))
    } else if (data?.religion !== '' && data?.cast !== '' && data?.subcast !== '') {
      updatedfilteredData = maindata?.filter(item => item.religion.toLowerCase().includes(data?.religion.toLowerCase()) && item.cast.toLowerCase().includes(data?.cast.toLowerCase()) && item.subcast.toLowerCase().includes(data?.subcast.toLowerCase()))
    }
    return updatedfilteredData
  }
  const handleBasic = (FilterItems) => {
    setfilterData(filters(FilterItems, data))
  }

  const changeUSerStateById = async (affectedUserId, changeByUserId, userStatus) => {
    await dispatch(changeUserStatus({ affectedUserId, changeByUserId, userStatus }))
    await getAllUsersData();
  }

  return (
    <div>
      <Filters handlefilters={handleFilters} handleBasic={handleBasic} />
      {loading ? (<div className="w-100 bg-transparent d-flex justify-content-center align-items-center">
        <Loader />
      </div>):
        (<Row xs={1} sm={2} md={3} lg={4} className="g-2 g-sm-2 g-md-3 w-100 bcg">
          {filterdata?.map((val, index) => {
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
                buttonBackgroundColor={buttonBackgroundColor} />
            )
          })}
        </Row>)}
        <div className='d-flex justify-content-center pt-2'>
        {totalpages>1 && <PaginationComponent
            totalPages={totalpages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />}
        </div>
    </div>
  )

}

export default ProfileList