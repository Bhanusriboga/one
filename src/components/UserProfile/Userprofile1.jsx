import React, { useState, useEffect } from 'react';
import { Card, CardText, Row, Col, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Userprofile1.css"
import { CiSquareMinus, CiHeart } from "react-icons/ci";
import { FaArrowLeft, FaHeart, FaMinusSquare } from 'react-icons/fa';
import Userprofile2 from './UserProfile2';


const Userprofile1 = () => {
  const [imageSrc, setImageSrc] = useState('Image1.jpeg');
  const images = ['Image2.jpeg', 'Image3.jpeg', 'Image4.jpeg', 'Image5.jpeg'];
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isMinusClicked, setIsMinusClicked] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleCardClick = (image) => {
    setImageSrc(image);
  };

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleMinusClick = () => {
    setIsMinusClicked(!isMinusClicked);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const imagesContainer = () => {
    return (

      <div className="side-images-col  d-flex gap-2">
        {images.map((image, index) => (
          <button key={index} className={`image image${index + 1}`} onClick={() => handleCardClick(image)}>
            <img src={image} alt="Clickable card" className='side-image' />
          </button>
        ))}
      </div>
    )
  }

  const dataContainer = () => {
    return (
      <Card className='cards-bg m-2 d-flex ml-3'>
        <CardBody className='body'>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Date Of Birth:</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Time Of Birth:</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Religion:</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Mother Tongue:</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Language Proficiency:</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Instagram id:</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">LinkedIn id:</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Address :</span><span className='key2'>xyz</span></CardText>
          <CardText style={{ fontFamily: 'Poppins' }}><span className="key">Citizenship:</span><span className='key2'>xyz</span></CardText>
        </CardBody>
      </Card>)
  }

  return (
    <div className='main'>
      <div>
      {/*  Back button */}
        {
          isMobileView ? <div className='mobile-header d-flex align-items-center justify-content-left'>
          <FaArrowLeft className='pt-1' />
          <div className="header-text">
            ABCDEF
          </div>
        </div> :
        <div className='headers m-3'>
          <span className='text'>ABCDEF</span>
        <button className='back-button'>
          <FaArrowLeft className='icone' />
          <span className='icon-text'>Back</span>
        </button>
      </div>
        }
        <div>
          <div className='parent'>
            <div className='sub-parent m-3 d-flex gap-2'>
              <Card className="background-image" style={{ backgroundImage: `url(${imageSrc})` }}>
                <div className="icon-container" >
                  {isMinusClicked ? (
                    <FaMinusSquare className="icons"
                     
                      onClick={handleMinusClick}
                    />
                  ) : (
                    <CiSquareMinus className="icons" onClick={handleMinusClick}/>
                   
                  )}
                  {isHeartClicked ? (
                    <FaHeart className="icons"
                     
                      onClick={handleHeartClick}
                    />
                  ) : (
                    <CiHeart className="icons"
                    
                      onClick={handleHeartClick}
                    />
                  )}
                </div>
              </Card>
              {isMobileView ? imagesContainer() : dataContainer()}
            </div>
            {!isMobileView ? imagesContainer() : dataContainer()}
          </div>
   <Userprofile2/>
        </div>
      </div>
    </div>
  );
}

export default Userprofile1;
