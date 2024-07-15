import React from 'react'
import { footerContent } from '../../utils/constants'
import './Dashboard.scss'
const FooterBar = props => {
  return (
    <div className='navbar navbar-expand-md navbar-light navbck'>
      <div>
        {footerContent.registrationlabel}
      </div>
    </div>
  )
}

export default FooterBar