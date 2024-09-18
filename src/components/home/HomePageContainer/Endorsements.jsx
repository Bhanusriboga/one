import React, { useEffect, useState } from 'react'
import SwardCard from '../../../Assets/square card 1.png'
import Profile from '../../../Assets/ProfileImage.svg'
import Carousel from 'react-multi-carousel';
import { Chooseusstyle, DisplayBox, TextSize } from '../../../commonSyles/HomeStyles';
import '../home.css'
import { FaStar } from "react-icons/fa";
import { useHistory } from 'react-router-dom'
const Endorsements = () => {
  const navigator = useHistory()
    const [userdata, setUserdata]= useState([{title:'YUKTHI', content:'Joining this website was the best decision of my life! Within weeks, I found my perfect match.'},{title:'YUKTHI', content:'HJoining this website was the best decision of my life! Within weeks, I found my perfect match.'},{title:'YUKTHI', content:'Joining this website was the best decision of my life! Within weeks, I found my perfect match.'}])
    useEffect(()=>{
        setUserdata([{title:'YUKTHI', content:'Joining this website was the best decision of my life! Within weeks, I found my perfect match.',ratings:5},{title:'YUKTHI', content:'Joining this website was the best decision of my life! Within weeks, I found my perfect match.',ratings:4},{title:'YUKTHI', content:'Joining this website was the best decision of my life! Within weeks, I found my perfect match.', ratings:3},{title:'YUKTHI', content:'Joining this website was the best decision of my life! Within weeks, I found my perfect match.', ratings:1},{title:'YUKTHI', content:'Joining this website was the best decision of my life! Within weeks, I found my perfect match.', ratings:0}])
    },[]);
    const STAR_COUNT = 5;
const Rating = (value) => {
    <FaStar fill={'#F9F295'} size={20}/>
  const stars = Array.from({length: STAR_COUNT}, () => <FaStar key={value} size={20}/>);
  let i;
  for (i = 0; i < value; i++) { // this will loop Math.floor(value) times
    stars[i] = <FaStar fill={'#F9F295'} size={20}/>;
  }

  if (value % 1 != 0) // if value is a decimal, add a half star
    stars[i-1] = <FaStar fill={'#F9F295'} size={20}/>;

  return <div className="rating">{stars}</div>;
};
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
        <div>
        <TextSize font-size={'48px'} Color-code={'#780024'} mobile-color={'#780024'} line-height={'76px'} font-weight={400} ><Chooseusstyle mobile-font-size={'32px'} >Endorsements</Chooseusstyle></TextSize>
        <DisplayBox ><TextSize font-size={'18px'} Color-code={'#2C2C2C'} mobile-color={'#2C2C2C'} line-height={'30px'} font-weight={400} className='chooseUswidth' ><Chooseusstyle mobile-font-size={'16px'}> Discover what others have to say about their experiences with us. Their words of praise, heartfelt commendations, and glowing reviews serve as a testament to the effectiveness of our matchmaking services</Chooseusstyle></TextSize></DisplayBox>
        <div className='w-100 d-flex justify-content-center text-center mt-4'>
        <Carousel responsive={responsive} className='w-75' renderButtonGroupOutside={true}>
            {userdata.map((val)=>(
                <div key={val.title} className='position-relative'>
                        <img src={SwardCard} width={'90%'}></img>
                        <div className='position-absolute cardhomecontent'>
                        <span className='w-100 d-flex justify-content-center titleStyle'>{val.title}</span>
                        <div className='cardcontentprofilehome'><img src={Profile} width={'35%'}></img></div>
                        <div className='cardcontenthome'>{val.content}</div>
                        <div className='cardcontenthome'>{Rating(val.ratings)}</div>
                        </div>
                </div>


            ))}
        </Carousel></div>
        </div>
        </DisplayBox>
        <DisplayBox padding={'25px'} flex-direction={'column'}>
        <TextSize font-size={'48px'} Color-code={'#780024'} mobile-color={'#780024'} line-height={'76px'} font-weight={400} ><Chooseusstyle mobile-font-size={'32px'} >Perfect destination to discover your soulmate</Chooseusstyle></TextSize>
        <DisplayBox ><TextSize font-size={'18px'} Color-code={'#2C2C2C'} mobile-color={'#2C2C2C'} line-height={'30px'} font-weight={400} className='chooseUswidth' ><Chooseusstyle mobile-font-size={'16px'}> From detailed profiles that capture the essence of who you are to sophisticated matching algorithms that consider compatibility on multiple levels, we ensure that every interaction is purposeful and promising. With a community of like-minded individuals all on a quest for love, our platform fosters genuine connections that have the potential to blossom into something beautiful.</Chooseusstyle></TextSize></DisplayBox>
        <DisplayBox>
            <button className='beginstyle mt-5' onClick={() => navigator.push("/signup")}>
                <div className='btntext'>Let’s Begin</div>
            </button>
            </DisplayBox>
</DisplayBox>
        </div>
  )
}

export default Endorsements