import React from 'react'
import { homepage } from '../../../utils/constants'
import coupleImage from '../../../Assets/coupleImage.png'
import '../home.css'
import Lottie from "react-lottie"
import { useHistory } from 'react-router-dom'
import animation from "../assets/Animation - 1720516602656.json"
import { TextSize, DisplayBox, TextBoxMargin, TextBoxMarginright } from '../../../commonSyles/HomeStyles'
const CoupleData = () => {
  const navigator = useHistory()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <DisplayBox padding={'25px'} data-testid="CoupleData-component">
        <TextBoxMargin margin-top={'6%'} margin-left={'6%'}>
        <TextSize text-align={'start'} font-size={'64px'} Color-code={'#940221'} mobile-color={'white'} line-height={'76px'} font-weight={800}>
        {homepage.discover} <span className='magicbold'>{homepage.magic}</span>
        </TextSize>
        <TextSize text-align={'start'} font-size={'16px'} Color-code={'#940221'} mobile-color={'white'} line-height={'21px'} font-weight={400}>
            {homepage.subdiscover}
            </TextSize>
            <button className='beginstyle mt-5' onClick={() => navigator.push("/signup")}>
        <div className='btntext'>Engage              <span><Lottie className="animate" options={defaultOptions}
                height={40}
                width={40} /></span></div>
      </button>
        </TextBoxMargin>
        <TextBoxMarginright margin-right={'4%'}>
            <div className='grow'>
        <img src={coupleImage} className='couple-img' alt='couple image' loading="lazy"/>
        </div>
        </TextBoxMarginright>
        
    </DisplayBox>
  )
}

export default CoupleData