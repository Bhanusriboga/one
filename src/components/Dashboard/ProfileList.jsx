import React, { useState } from 'react'
import { Card,CardTitle,CardText, Button, Row,Col,Form} from 'reactstrap';
import './ProfileList.scss'
import { CiSquareMinus } from "react-icons/ci";

import { CiHeart } from "react-icons/ci";

const ProfileList = () => {
    const [list, setList]= useState([{name:'YUKTHI', age:'27', religion:'xyz'},{name:'YUKTHI',color:'red'},{name:'YUKTHI'},{name:'YUKTHI'},{name:'YUKTHI',color:'red'},{name:'YUKTHI'},{name:'YUKTHI'},{name:'YUKTHI'},{name:'YUKTHI',color:'red'},{name:'YUKTHI'}])
  return (
    <div>
      <div className="row d-flex align-items-center w-100 bcg">
    {list.map(val=>(
         <div className="col-md-3 mr-2 cardwidth">
        <Card
        body
        className={val.color==='red'?"my-2 cardColorredDash":"my-2 cardColorDash"}
      >
        <div className='d-flex justify-content-between w-100'>
          <CiSquareMinus color='white'size={25} />
          <CiHeart color='white' size={25}/>
        </div>
        <div className='circle'>
        </div>
        <CardTitle tag="h5">
          YUKTHI
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