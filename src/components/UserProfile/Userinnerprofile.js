import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import {
    Personal,
    familyInformation,
    PersonalInformation,
    ProfessionalDetails,
    ReligionDetails,
    family,
    Personals,
    professionals,

} from "./Data"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Userprofile.css'

const Userinnerprofile = () => {
    return (
        <Row className='mt-1'>
            <Col md="5" >
                <Card>
                    <CardBody>
                        {ReligionDetails.map((item ,ind) => (
                            <CardTitle className="titles" key={ind}>{item.value}</CardTitle>))}
                        <div className="row">
                            {Personal.map((user) => {
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
                <Card>
                    <CardBody>
                        {family.map((item ,ind) => (
                            <CardTitle className="titles" key={ind}>{item.value}</CardTitle>))}
                        <div className="row">
                            {familyInformation.map((user) => {
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
                <Card>
                    <CardBody>
                        {Personals.map((item,ind) => (
                            <CardTitle className="titles" key={ind}>{item.value}</CardTitle>))}
                        <div className="row">
                            {PersonalInformation.map((user) => {
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
                        {professionals.map((item,ind) => (
                            <CardTitle className="titles" key={ind} >{item.value}</CardTitle>))}
                        <div className="row">
                            {ProfessionalDetails.map((user) => {
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

export default Userinnerprofile;