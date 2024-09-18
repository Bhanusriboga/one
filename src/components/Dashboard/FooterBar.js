import React from 'react';
import { footerContent } from '../../utils/constants';
import './Dashboard.scss';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

const FooterBar = ({ setTermsCondition }) => {
  return (
    <div className='footerBack'>
      <Row className='margindata'>
        <Col lg={4} className='mt-5 mb-3 vertical-divider'>
        <div className='me-5'>
        {footerContent.infoText}
        </div>

        </Col>

        <Col lg={4} className='mt-5  mb-3 vertical-divider '>
        <div className='d-flex flex-column align-items-start me-5 ms-1'>
        <div className='labelstl '>{footerContent.contactLabel}</div>
        <div>{footerContent.Mobile}</div>
        <div>{footerContent.Email}</div>
        </div>

        </Col>
        <Col lg={2} className='mt-5 mb-3'>
        <div className='d-flex flex-column align-items-start me-4 ms-1'>
        <div className='labelstl'>{footerContent.privacyLabel}</div>
        <div>{footerContent.pp}</div>
        <button className='border-0 bg-transparent text-white p-0' onClick={setTermsCondition}>
          {footerContent.TermsC}
        </button>
        </div>
        </Col>
      </Row>
      <div className='w-100 d-flex justify-content-center'>
      <div className='d-flex justify-content-center copyrightBot w-50 mb-3'>{footerContent.copyright}</div>
      </div>
    </div>
  )
}

FooterBar.propTypes = {
  setTermsCondition: PropTypes.func.isRequired,
};

export default FooterBar