import React, { useEffect, useState } from 'react'
import card from '../assets/Card-Slide01.png'
import btnicon from '../assets/arrow.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import { Chooseusstyle, DisplayBox, TextSize } from '../../../commonSyles/HomeStyles';
const ExploreProfiles = () => {
  const navigator = useHistory()
    const [userdata, setUserdata]= useState([{title:'RELIGION', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'},{title:'CASTE', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'},{title:'MOTHER TONGUE', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'}])
    useEffect(()=>{
        setUserdata([{title:'RELIGION', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'},{title:'RELIGION', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'},{title:'RELIGION', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'},{title:'CASTE', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'},{title:'MOTHER TONGUE', content:'Hindu | Muslim | Christian Buddhism | Jain | Sikhism'}])
    },[]);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        }
      };
  return (
    <div className='FlowerBack'>
    <DisplayBox padding={'25px'} flex-direction={'column'}>
        <TextSize font-size={'48px'} Color-code={'#780024'} mobile-color={'#780024'} line-height={'76px'} font-weight={400} ><Chooseusstyle mobile-font-size={'32px'} >Explore matrimonial profiles</Chooseusstyle></TextSize>
     <div className='w-100 d-flex justify-content-center'>
        <Carousel responsive={responsive} className='w-75' renderButtonGroupOutside={true}>
            {userdata.map((val)=>(
                <div key={val.title} className='position-relative'>
                        <img src={card} width={'100%'}></img>
                        <div className='position-absolute cardexplorehomecontent'>
                        <span className='exploretitleStyle'>{val.title}</span>
                        <div className='cardexplorecontenthome Cheight'>{val.content}</div>
                        <div className='cardexplorecontenthome explorebtn'><Button className='explorebutton' onClick={() => navigator.push("/signup")} >Explore <img src={btnicon} ></img></Button></div>
                        </div>
                </div>


            ))}
        </Carousel></div>
        </DisplayBox>
    </div>
  )
}

export default ExploreProfiles