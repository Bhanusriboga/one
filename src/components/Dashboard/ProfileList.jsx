import React, { useEffect, useState } from 'react'
import { Card,CardTitle,CardText, Button, Row,Col,Form} from 'reactstrap';
import './ProfileList.scss'
import { CiSquareMinus } from "react-icons/ci";
import testjson from '../../utils/test.json'
import { CiHeart } from "react-icons/ci";
import Filters from './filters';

const ProfileList = () => {
  const [filterdata, setfilterData]=useState()
   const handleFilters=(data)=>{
    
   }
   useEffect(()=>{
    setfilterData(testjson)
   },[testjson])
   const filters=(data,maindata)=>{
let updatedfilteredData=[]
    if(data.religion !=='' && data.subcast==='' && data.cast ===''){
      updatedfilteredData= maindata.filter(item => item.religion.toLowerCase().includes(data.religion.toLowerCase()))
    }  else if(data.religion==='' && data.subcast !==''&& data.cast ===''){
      updatedfilteredData= maindata.filter(item => item.subcast.toLowerCase().includes(data.subcast.toLowerCase()))
    }else if(data.religion ==='' && data.subcast === ''&& data.cast !==''){
      updatedfilteredData= maindata.filter(item => item.cast.toLowerCase().includes(data.cast.toLowerCase()))
    }else if(data.religion !=='' && data.subcast === '' && data.cast !==''){
      updatedfilteredData= maindata.filter(item => item.religion.toLowerCase().includes(data.religion.toLowerCase()) && item.cast.toLowerCase().includes(data.cast.toLowerCase()))
    }else if(data.religion !=='' && data.subcast !== '' && data.cast ===''){
      updatedfilteredData= maindata.filter(item => item.religion.toLowerCase().includes(data.religion.toLowerCase()) && item.subcast.toLowerCase().includes(data.subcast.toLowerCase()))
    } else if(data.religion ==='' && data.subcast !== '' && data.cast !==''){
      updatedfilteredData= maindata.filter(item => item.cast.toLowerCase().includes(data.cast.toLowerCase()) && item.subcast.toLowerCase().includes(data.subcast.toLowerCase()))
    }else if(data.religion !=='' && data.cast !=='' && data.subcast !==''){
      updatedfilteredData= maindata.filter(item => item.religion.toLowerCase().includes(data.religion.toLowerCase()) && item.cast.toLowerCase().includes(data.cast.toLowerCase())&& item.subcast.toLowerCase().includes(data.subcast.toLowerCase()))
    }
    return updatedfilteredData
   }
   const handleBasic=(data)=>{
    setfilterData(filters(data,testjson))
   }

  return (
    <div>
      <Filters handlefilters={handleFilters} handleBasic={handleBasic}/>
      <div className="row d-flex justify-content-center align-items-center w-100 bcg">

    {filterdata?.map(val=>(
         <div className="col-md-3 mr-2 cardwidth">
        <Card
        body
        className={val?.color==='red'?"my-2 cardColorredDash":"my-2 cardColorDash"}
      >
        <div className='d-flex justify-content-between w-100'>
          <CiSquareMinus color='white'size={25} />
          <CiHeart color='white' size={25}/>
        </div>
        <div className='circle'>
        </div>
        <CardTitle tag="h5">
        {val.name}
        </CardTitle>
        <CardText className='w-100 d-flex flex-column justify-content-start'>
          <span>Age : {val.age}</span>
          <span>  Religion: {val.religion}</span>
        
        </CardText>
        <Button className={val.color==='red'?"otherbtn ":"redButton"} size='sm'>
          View Profile
        </Button>
      </Card>
      </div>
    ))}
    </div>
</div>
  )

}

export default ProfileList