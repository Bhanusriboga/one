import React,{useState,useEffect} from 'react'
import { footerContent } from '../../utils/constants'
import './Dashboard.scss'
import logo from '../../Assets/Logo.png'
import { Col, Row } from 'reactstrap'
const FooterBar = () => {
 const [width,setWidth]=useState(window.innerWidth)
 useEffect(() => {
 
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

 
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  
  return (
     <>
      {
        width<767? 
        <div className='footerBackSmall'>
        <Row className='margindata'>
        <Col md={3} className='mt-5 mb-3 d-flex align-items-center'>
        <div>
        <img src={logo} className='pelli-imgs'></img>
        </div>
        </Col>
        <Col md={4} className='mt-5 mb-3 vertical-divider'>
        <div className='me-5'>
        {footerContent.infoText}
        </div>

        </Col>
        <Col lg={2} className='mt-5  mb-3 vertical-divider '>
        <div className='d-flex flex-column align-items-start me-5 ms-1'>
        <div className='labelstl '>{footerContent.contactLabel}</div>
        <div>{footerContent.Mobile}</div>
        <div>{footerContent.Email}</div>
        </div>
        </Col>
        <Col lg={2} className='mt-5 mb-3 vertical-divider'>
        <div className='d-flex flex-column align-items-start me-4 ms-1'>
        <div className='labelstl'>{footerContent.privacyLabel}</div>
        <div>{footerContent.pp}</div>
        <div>{footerContent.TermsC}</div>
        </div>

        </Col>
        <hr className="horizontal-line"/>
        <div className='w-100 d-flex justify-content-center'>
      <div className='d-flex justify-content-center copyrightBot w-100 mb-3'>{footerContent.copyright}</div>
      </div>
        </Row>
        </div>
        : 
        <div className='footerBack'>
        <Row className='margindata'>
        <Col md={4} className='mt-5 mb-3 vertical-divider'>
        <div className='me-5 info-text '>
        {footerContent.infoText}
        </div>
        </Col>

        <Col lg={2} className='mt-5  mb-3 vertical-divider '>
        <div className='d-flex flex-column align-items-start me-5 ms-1 '>
        <div className='labelstl left-margin'>{footerContent.contactLabel}</div>
        <div className='left-margin'>{footerContent.Mobile}</div>
        <div className='left-margin'>{footerContent.Email}</div>
        </div>
        </Col>
        <Col lg={2} className='mt-5 mb-3 vertical-divider'>
        <div className='d-flex flex-column align-items-start me-4 ms-1'>
        <div className='labelstl left-margin'>{footerContent.privacyLabel}</div>
        <div className='left-margin'>{footerContent.pp}</div>
        <div className='left-margin'>{footerContent.TermsC}</div>
        </div>

        </Col>
        <Col md={3} className='mt-5 mb-3 d-flex align-items-center'>
        <div>
        <img src={logo} className='left-margins'></img>
        </div>
        </Col>
      </Row>
      <div className='w-100 d-flex justify-content-center'>
      <div className='d-flex justify-content-center copyrightBot w-50 mb-3'>{footerContent.copyright}</div>
      </div>
      </div>
      }
     
     </>
  )
}

export default FooterBar