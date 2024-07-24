import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardText } from 'reactstrap';
import { CiSquareMinus, CiHeart } from "react-icons/ci";
import { FaArrowLeft, FaHeart, FaMinusSquare } from 'react-icons/fa';
import { personalData, userName, buttons } from './Data'
import Userinnerpeofile from './Userinnerprofile'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Userprofile.css'

const Userprofile = () => {
    const [imageSrc, setImageSrc] = useState('Image1.jpeg');
    const image = ['Image2.jpeg', 'Image3.jpeg', 'Image4.jpeg', 'Image5.jpeg'];
    const [isMobileView, setIsMobileView] = useState(false);
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isMinusClicked, setIsMinusClicked] = useState(false);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleCardClick = (image) => {
        setImageSrc(image);
    };

    const handleHeartClick = () => {
        setIsHeartClicked(!isHeartClicked);
    };

    const handleMinusClick = () => {
        setIsMinusClicked(!isMinusClicked);
    };

    const CardComponent = () => (
        <Card className="border-0 position-relative" style={{ height: 'auto' }}>
            <div className="ratio ratio-1x1" style={{ objectFit: 'cover' }}>
                <img
                    src={imageSrc}
                    alt="Card image cap"
                    className="rounded img-fluid w-100 h-100"
                />
            </div>
            <CardBody className="d-flex flex-wrap justify-content-between p-2 position-absolute w-100" >
                {isMinusClicked ? (
                    <FaMinusSquare className="icons fs-1"
                        onClick={handleMinusClick}
                    />
                ) : (
                    <CiSquareMinus className="icons fs-1" onClick={handleMinusClick} />
                )}
                {isHeartClicked ? (
                    <FaHeart className="icons fs-1"

                        onClick={handleHeartClick}
                    />
                ) : (
                    <CiHeart className="icons fs-1"
                        data-testid="clickheart"
                        onClick={handleHeartClick}
                    />
                )}
            </CardBody>
        </Card>)
    const Datac = () => (
        <CardBody className='body'>
            <div className="row">
                {personalData.map((user,ind) => {
                    return (
                        <div className='d-flex justify-content-between' key={ind}>
                            <CardText className='mb-3 w-50'>{user.key}</CardText>
                            <CardText className='mb-3 w-50'>{user.value}</CardText>
                        </div>
                    )
                })}
            </div>

        </CardBody>
    )
    return (
        <Container className='main'>
            {isMobileView ? (     
                <>
                    <div className='d-flex align-items-center justify-content-left'>
                        <FaArrowLeft className='pt-1 title' />
                        {userName.map((item ,ind) => (
                            <div className="title" key={ind}>
                                {item.value}
                            </div>))}
                    </div>
                    <div className="row">
                        <div className="col-12 m-1">
                            <CardComponent />
                        </div>
                    </div>
                    <div className="row">
                        {image.map((image, index) => (
                            <div key={index} className="col-6 col-sm-6 col-md-3">
                                <button className="ratio ratio-4x3 border-0" onClick={() => handleCardClick(image)}>
                                    <img src={image} alt="Clickable card" className="fixed-img img-fluid rounded" />
                                </button>
                            </div>
                        ))}

                    </div>
                    <div className="row">
                        <div className="col-12 m-1">
                            <Card className='h-100'>
                                <Datac />
                            </Card>
                        </div>
                    </div>
                </>
            ) : (

                <>
                    <div className="d-flex justify-content-between align-items-center">
                        {userName.map((item,ind) => (
                            <span className='text title pt-5 m-1' key={ind}>{item.value}</span>))}
                        <button className='back-button align-items-center rounded'>
                            <FaArrowLeft />
                            {buttons.map((item,ind) => (
                                <span className='icon-text' key={ind}>{item.value}</span>))}
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-md-5 m-1">
                            <CardComponent />
                        </div>
                        <div className="col-md-5 m-1">
                            <Card className='h-100 border-0'>
                                <Datac />
                            </Card>
                        </div>
                    </div>
                    <div className="row justify-content-left">
                        {image.map((image, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-3 custom-card">
                                <button className="ratio ratio-4x3 border-0 " onClick={() => handleCardClick(image)}>
                                    <img src={image} alt="Clickable card" className="fixed-img img-fluid rounded" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <Userinnerpeofile />

        </Container>
    );
};

export default Userprofile;
                            