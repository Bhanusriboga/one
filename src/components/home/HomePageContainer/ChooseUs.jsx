import React from 'react'
import { Chooseusstyle, DisplayBox, TextSize } from '../../../commonSyles/HomeStyles'
import { homepage } from '../../../utils/constants'
import rings from '../../../Assets/Frame 39.png'
import '../home.css'

const ChooseUs = () => {
  return (
    <div className='FlowerBack' data-testid="choose-component">
      <DisplayBox padding={'25px'} flex-direction={'column'}>
        <TextSize font-size={'48px'} Color-code={'#780024'} mobile-color={'#780024'} line-height={'76px'} font-weight={400} ><Chooseusstyle mobile-font-size={'32px'} >{homepage.chooseus}</Chooseusstyle></TextSize>
        <DisplayBox ><TextSize font-size={'18px'} Color-code={'#2C2C2C'} mobile-color={'#2C2C2C'} line-height={'30px'} font-weight={400} className='chooseUswidth' ><Chooseusstyle mobile-font-size={'16px'}>{homepage.choosetext}</Chooseusstyle></TextSize></DisplayBox>
        <DisplayBox padding={'20px'}>
          <img src={rings} className='imagewidth'></img>
        </DisplayBox>
      </DisplayBox>
    </div>
  )
}

export default ChooseUs