import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Userprofile.css'
import PropTypes from 'prop-types';
const Userinnerprofile = props => {
    const {userData} = props;
    const [useInfo, setUserInfo]= useState()
    useEffect(()=>{
        console.log(userData,"testing")
        if(userData){

        setUserInfo(userData)
        }
    },[userData])
   
    return (
        <Row className='mt-1'>
            <Col md="5" >
                <Card className='mb-2'>
                    <CardBody>
                        {useInfo?.ReligionDetails?.map((item ,ind) => (
                            <CardTitle className="titles" key={ind}>{item.value}</CardTitle>))}
                        <div className="row">
                            {useInfo?.Personal?.map((user) => {
                                return (
                                    <div className='d-flex justify-content-between' key={user.key}>
                                        <CardText className='mb-3 w-50'>{user.key}</CardText>
                                        <CardText className='mb-3 w-50'>{user.value}</CardText>
                                    </div>
                                )
                            })}
                        </div>
                    </CardBody>
                </Card>
                <Card className='mb-2'>
                    <CardBody>
                        {useInfo?.family?.map((item ,ind) => (
                            <CardTitle className="titles" key={ind}>{item.value}</CardTitle>))}
                        <div className="row">
                            {useInfo?.familyInformation?.map((user) => {
                                return (
                                    <div className='d-flex justify-content-between' key={user.key}>
                                        <CardText className='mb-3 w-50'>{user.key}</CardText>
                                        <CardText className='mb-3 w-50'>{user.value}</CardText>
                                    </div>
                                )
                            })}
                        </div>
                    </CardBody>
                </Card>
                <Card className='mb-2'>
                    <CardBody>
                        {useInfo?.Personals?.map((item,ind) => (
                            <CardTitle className="titles" key={ind}>{item.value}</CardTitle>))}
                        <div className="row">
                            {useInfo?.PersonalInformation?.map((user) => {
                                return (
                                    <div className='d-flex justify-content-between' key={user.key}>
                                        <CardText className='mb-3 w-50'>{user.key}</CardText>
                                        <CardText className='mb-3 w-50'>{user.value}</CardText>
                                    </div>
                                )
                            })}
                            <div className='d-flex justify-content-between'>
                                <CardText className='mb-3 w-50'>About me:</CardText>
                                <textarea className='mb-3 w-50' />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col md="1" className="d-flex flex-column justify-content-center align-items-center">
                <div className="border-start border-1 h-100" ></div>
            </Col>
            <Col md="5">
                <Card>
                    <CardBody>
                        {useInfo?.professionals?.map((item,ind) => (
                            <CardTitle className="titles" key={ind} >{item.value}</CardTitle>))}
                        <div className="row">
                            {useInfo?.ProfessionalDetails?.map((user) => {
                                return (
                                    <div className='d-flex justify-content-between' key={user.key}>
                                        <CardText className='mb-3 w-50'>{user.key}</CardText>
                                        <CardText className='mb-3 w-50'>{user.value}</CardText>
                                    </div>
                                )
                            })}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};
Userinnerprofile.propTypes = {
    userData: PropTypes.func.isRequired,
  };

export default Userinnerprofile;