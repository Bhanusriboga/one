import React, { useRef } from 'react'
import "./home.css"

import StarRatings from 'react-star-ratings'

import rightArrow from "./assets/Animation - 1721798930907.json"
import Lottie from 'react-lottie'
import customer from "./assets/Ellipse 16.svg"

function Endorse() {
  const endorseList = [{ name: 'YUKTHI', description: "Joining this website was the best decision of my life! Within weeks, I found my perfect match.", imgUrl: "", rating: 4.8 }, { name: 'Kareem', description: "Joining this website was the best decision of my life! Within weeks, I found my perfect match.", imgUrl: "", rating: 3.4 }, { name: 'vishnu', description: "Joining this website was the best decision of my life! Within weeks, I found my perfect match.", imgUrl: "", rating: 5 }, { name: 'venkat', description: "Joining this website was the best decision of my life! Within weeks, I found my perfect match.", imgUrl: "", rating: 4.5 }, { name: 'YUKTHI', description: "Joining this website was the best decision of my life! Within weeks, I found my perfect match.", imgUrl: "", rating: 5 }, { name: 'vasavi', description: "Joining this website was the best decision of my life! Within weeks, I found my perfect match.", imgUrl: "", rating: 4 }]
  const scrollContainerRef = useRef(null);
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  //const [rating,setRating]=useState(5)
  // const changeRating=( newRating) =>{
  //       setRating(newRating)
  // }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rightArrow,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  return (
    <div className="endorsements d-flex flex-column justify-content-center align-items-center mb-0">
      <h5 className='choose-us'>Endorsements</h5>
      <p style={{ textAlign: "center", width: "90vw", fontWeight: '400',fontSize:"20px" }}>Discover what others have to say about their experiences with us. Their words of praise, heartfelt commendations, and glowing reviews serve as a testament to the effectiveness of our matchmaking services</p>
      <div className="scrollable-list-container  d-flex justify-content-center align-items-center">
      
        <div onClick={() => scroll(-980)} className='animate-arrow-flip mb-3' >
        <Lottie className="animate-arrow" options={defaultOptions}
            height={100}
            width={100} />
            </div>
        <div className="d-flex scrollable-list" ref={scrollContainerRef}>
          {endorseList.map((item, index) => (
            <div key={index} className="scrollable-list-item">
              <div className='endorse-square d-flex flex-column justify-content-center align-items-center'>
                <h5 className='endorse-heading'>YUKTHI</h5>
                <img className='customer-img' src={customer} />
                <div className='width-100'>
                  <p className='endorse-text-para justify-self-center'>Joining this website was the best decision<br /> of my life! Within weeks,<br /> I found my perfect match. </p>
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
        <div onClick={() => scroll(980)} className='right-arrow mb-5' >

          <Lottie className="animate-arrow " options={defaultOptions}
            height={100}
            width={100} />
        </div>
      </div>
    </div>
  )
}
export default Endorse