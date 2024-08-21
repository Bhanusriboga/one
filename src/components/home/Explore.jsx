import React, { useRef } from 'react';
import "./home.css";
import arrow from "./assets/arrow.png";
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types"
const ExploreCard = (props) =>{
  const { title, items, onClick }=props;
  return(
  <div className='card-bg'>
    <p className='card-text1'>{title}</p>
    <div className='para-div'>
      {items.map((item, index) => (
        <p className='para-explore' key={index}>{item}</p>
      ))}
    </div>
    <div className='expore-btn d-flex justify-content-evenly align-items-center' onClick={onClick}>
      <p className="btn-text"> Explore</p>
      <img src={arrow} className='btn-arrow' alt="arrow" />
    </div>
  </div>
)};
ExploreCard.propTypes={
  title:PropTypes.string.isRequired,
  items:PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
}
function Explore() {
  const myRef = useRef();
  const navigator = useHistory();
 
  const data = [
    {
      title: "RELIGION",
      items: ["Hindu | Muslim | Christian | Buddhism | Jain | Sikhism", "Hindu | Muslim | Christian | Buddhism | Jain | Sikhism"],
    },
    {
      title: "CASTE",
      items: ["Reddy | Chowdhary | Balija | Kapu | Achari", "Reddy | Chowdhary | Balija | Kapu | Achari"],
    },
    {
      title: "MOTHER TONGUE",
      items: ["Telugu | Hindi | Urdu | Tamil | Malayalam", "Marati | Kannada | Bengali"],
    }
  ];
 
  return (
    <div className="explore d-flex flex-column justify-content-between align-items-center ml-5" data-testid="explore-component">
      <p className='choose-us'>Explore matrimonial profiles</p>
 
      <div className='scroll-container d-flex justify-content-evenly' ref={myRef}>
        <div className='scroll-div'>
          {data.map((card, index) => (
            <ExploreCard key={index} title={card.title} items={card.items} onClick={() => navigator.push("/signup")} />
          ))}
         
        </div>
      </div>
 
      <div className="explore-cont mb-5" onClick={() => navigator.push("/signup")}>
        {data.map((card, index) => (
          <ExploreCard key={index} title={card.title} items={card.items} onClick={() => navigator.push("/signup")} />
        ))}
      </div>
    </div>
  );
}
 
export default Explore;