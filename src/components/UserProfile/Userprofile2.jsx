import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './Userprofile2.css'
const Userprofile2 = () => {
  return (
  
      <Row className='mt-1'>
        <Col md="5 m-3" >
          <Card className="ml-3" >
            <CardBody>
              <CardTitle className="titles">Religion</CardTitle>
              <CardText><span className="key">Caste:</span><span className='key2'>xyzxyz, xyz</span></CardText>
              <CardText><span className="key">Zodiac Sign:</span><span className='key2'>xyz</span></CardText>
              <CardText><span className="key">Gothra:</span><span className='key2'>xyz, star name</span></CardText>
              <CardText><span className="key">Dosham:</span><span className='key2'>Manglik</span></CardText>
            </CardBody>
          </Card>
          <Card className="ml-3" >
            <CardBody>
              <CardTitle className="titles">Family Information</CardTitle>
              <CardText><span className="key">Family Status:</span><span className='key2'> Nuclear, Rich</span></CardText>
              <CardText><span className="key">Father:</span><span className='key2'> Madhu, Business</span></CardText>
              <CardText><span className="key">Mother Name:</span><span className='key2'> Yukthi, Homemaker</span></CardText>
              <CardText><span className="key">Siblings:</span><span className='key2'>1</span></CardText>
            </CardBody>
          </Card>
          <Card className="ml-3">
            <CardBody className='card-body'>
              <CardTitle className="titles">Personal Information</CardTitle>
              <CardText className='card-text'>
                <span className="key">Complexion:</span>
                <span className='key2'>
                 xyzxyz
                </span>
                 </CardText>
              <CardText><span className="key">Body Type:</span><span className='key2'> xyzxyz</span></CardText>
              <CardText><span className="key">Any Disabilities:</span><span className='key2'> 11:55 PM</span></CardText>
              <CardText><span className="key">Weight:</span><span className='key2'> 1</span></CardText>
              <CardText><span className="key">Height:</span><span className='key2'> 1</span></CardText>
              <CardText><span className="key">Marital Status:</span><span className='key2'> xyzxyz</span></CardText>
              <CardText><span className="key">Eating Habits:</span><span className='key2'> Non Veg</span></CardText>
              <CardText><span className="key">Drinking Habits:</span><span className='key2'> Never drink</span></CardText>
              <CardText><span className="key">Smoking Habits:</span><span className='key2'> Never smoke</span></CardText>
              <CardText><span className="key">About me:</span></CardText>
              <span className='key2'><textarea ></textarea></span>
            </CardBody>
          </Card>
        </Col>
        <Col md="1" className="d-flex justify-content-center">
          <div style={{
            borderLeft: "1px solid #ced4da",
            height: "100%"
          }}></div>
        </Col>
        <Col md="5" className='pro'>
          <Card className="mb-3 m-2" >
            <CardBody>
              <CardTitle className="titles" >Professional Details</CardTitle>
              <CardText><span className="key">Highest Education :</span><span className='key2'>B.Tech</span></CardText>
              <CardText><span className="key">Name Of the Institute :</span><span className='key2'>abcdefgh</span></CardText>
              <CardText><span className="key">Year Of Passing :</span><span className='key2'>2222</span></CardText>
              <CardText><span className="key">Employment Status :</span><span className='key2'>xyz</span></CardText>
              <CardText><span className="key">Employed in :</span><span className='key2'>xyzxyz</span></CardText>
              <CardText><span className="key">Occupation :</span><span className='key2'>xyz</span></CardText>
              <CardText><span className="key">Work Location :</span><span className='key2'>India</span></CardText>
              <CardText><span className="key">State :</span><span className='key2'>xyzxyz</span></CardText>
              <CardText><span className="key">City :</span><span className='key2'>Xyz</span></CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
   
  );
};

export default Userprofile2;
