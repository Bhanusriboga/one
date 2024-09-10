import React, { useRef } from 'react'
import "./home.css"
import StarRatings from 'react-star-ratings'
import rightArrow from "./assets/Animation - 1721798930907.json"
import Lottie from 'react-lottie'
import {testmonial1,testmonial2,testmonial3,testmonial4,testmonial5,testmonial6} from "./assets"


function Endorse() {
  const endorseList = [{ 
    name: 'Shiva',
    description: "Amazing platform with verified profiles and easy filters to find a perfect match!",
    imgUrl: testmonial2,
    rating: 4.8
  }, 
    {
      name: 'Shyam',
      description: "Pellisambandalu changed my life! Easy to use and supportive team. I found my soulmate!",
      imgUrl: testmonial6,
      rating: 4.4
    },
    {
      name: 'Bhanu Sri',
      description: "Effortless partner search with personalized recommendations and a secure platform.",
      imgUrl: testmonial1,
      rating: 5
    },
     {
      name: 'Chandini',
      description: "Well-organized site with great privacy and communication tools. Transparent process!",
      imgUrl: testmonial4,
      rating: 4.5
    },
    {
      name: 'Nithin',
      description: "This matrimony site exceeded expectations. Great service and genuine connections!",
      imgUrl: testmonial5,
      rating: 5
    },
    {
      name: 'Joshi',
      description: "Smooth experience with a user-friendly interface and large profile database",
      imgUrl: testmonial3,
      rating: 4
    }]
  const scrollContainerRef = useRef(null);
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rightArrow,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  return (
    <div className="endorsements d-flex flex-column justify-content-center align-items-center mb-0" data-testid="endorse-component">
      <h5 className='choose-us'>Endorsements</h5>
      <p style={{ textAlign: "center", width: "90vw", fontWeight: '400',fontSize:"20px" }}>Discover what others have to say about their experiences with us. Their words of praise, heartfelt commendations, and glowing reviews serve as a testament to the effectiveness of our matchmaking services</p>
      <div className="scrollable-list-container  d-flex justify-content-center align-items-center">
      
        <div onClick={() => scroll(-980)} className='animate-arrow-flip' >
        <Lottie className="animate-arrow" options={defaultOptions}
            height={100}
            width={100} />
            </div>
        <div className="d-flex scrollable-list" ref={scrollContainerRef}>
          {endorseList.map((item, index) => (
            <div key={index} className="scrollable-list-item">
              <div className='endorse-square d-flex flex-column justify-content-center align-items-center'>
                <h5 className='endorse-heading mt-2'>{item.name}</h5>
                <img className='customer-img rounded-circle mt-3' src={item.imgUrl} />
                <div className='width-100 mb-1'>
                  <p className='endorse-text-para justify-self-center'>
                    {item.description} 
                  </p>
                </div>
                <div className="endorse-stars w-20">
                  <StarRatings
                    rating={item.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    starDimension="18px"
                    starSpacing="0.5px"
                    className="starss"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div onClick={() => scroll(980)} className='right-arrow' >
          <Lottie className="animate-arrow" options={defaultOptions}
            height={100}
            width={100} />
        </div>
      </div>
    </div>
  )
}
export default Endorse