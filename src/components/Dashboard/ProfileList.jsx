import React, { useState } from 'react'
import { Card,CardTitle,CardText, Button, Row,Col,Form} from 'reactstrap';
import './ProfileList.scss'
const ProfileList = () => {
    const [list, setList]= useState([{name:'YUKTHI'},{name:'YUKTHI',color:'red'},{name:'YUKTHI'},{name:'YUKTHI'},{name:'YUKTHI',color:'red'},{name:'YUKTHI'},{name:'YUKTHI'},{name:'YUKTHI'},{name:'YUKTHI',color:'red'},{name:'YUKTHI'}])
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
    {list.map(val=>(
         <div className="col-md-3 cardwidth">
        <Card
        body
        className={val.color==='red'?"my-2 cardColorredDash":"my-2 cardColorDash"}
      >
        <div className='circle'>
    
        </div>
        <CardTitle tag="h5">
          YUKTHI
        </CardTitle>
        <CardText>
          With supporting text below.
        </CardText>
        {/* <Button color="primary" size='sm'>
          View Profile
        </Button> */}
      </Card>
      </div>
    ))}
    </div>
</div>
  )

}

export default ProfileList