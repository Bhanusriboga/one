import React from 'react'
import { footerContent } from '../../utils/constants'

const FooterBar = props => {
  return (
    <div className='navbar navbar-expand-md navbar-light bg-secondary'>
        <div>
            {footerContent.registrationlabel}
        </div>
        </div>
  )
}

export default FooterBar