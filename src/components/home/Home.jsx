import React,{useEffect, useState} from 'react'

import animation from "../../utils/Animation - 1720516602656.json"
import Lottie from "react-lottie"

import logo from "../../utils/Logo01 1.svg"
import "./home.css"
import playstore from "../../utils/Rectangle 4453.png"
import appstore from "../../utils/Rectangle 4455.png"

import frame1 from"../../utils/Frame 45.png"
import frame2 from "../../utils/Frame 46.png"

import coupleimg from "../../utils/Rectangle 4110.png"
import ringsframe from "../../utils/Frame 39.png"

import casteimg from "../../utils/Group 38.png"
import religionimg from "../../utils/Group 40.png"
import mothertoungeimg from "../../utils/Group 39.png"

import yukthi from "../../utils/Frame 40.png";
import leftArrow from "../../utils/Frame 42.png"
import rightArrow from "../../utils/Frame 41.png"
import sidehalfimg from "../../utils/394317-PCMJUW-273-Photoroom 9.png"
import exploreright from "../../utils/394317-PCMJUW-273-Photoroom 9 (2).png"
import lefthalfimg from "../../utils/394317-PCMJUW-273-Photoroom 10.png"


import bottomleftimg from "../../utils/394317-PCMJUW-273-Photoroom 8.png"
import facebook from "../../utils/facebook.png"
import instagram from "../../utils/instagram.png"
import linkedin from "../../utils/mdi_linkedin.png"
import twitter from "../../utils/ri_twitter-x-fill.png"
import verticalline from "../../utils/Line 44.png"
import horizontalline from "../../utils/Line 47.png"
import rightbottomimgside from "../../utils/394317-PCMJUW-273-Photoroom 7.png"



function Home() {
  const [scrolled,setScrolled]=useState(false)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  useEffect(() => {
    window.addEventListener("scroll",()=>{  
      if(window.scrollY>0){
        setScrolled(true)
      }
      else{
        setScrolled(false)
      }
    })
   
  }, [])
  
  
 
  return (
  <div className='home-page-div' >
     <nav className={`navbar navbar-expand-lg custom-nav fixed-top ${scrolled&&"navbar-blur"}`}>
      <img src={logo} className='nav-logo'/>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse navbar-cont" id="navbarNav">
    <ul class="navbar-nav ml-auto mr-5" >
      <li class="nav-item">
        <a className="nav-link" href="#">About us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/signUp">Signup</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
     
    </ul>
  </div>
     </nav>
       <div className='content'>
        
        <div className='couple-container'>
        {/* <img src={sideimg} className='side-img'/> */}
          <div className='col1'>
             <img src={frame1} className='frames'/>
             <img src={frame2} className="frames2"/>
             
              <button className='engage-btn' >
                Engage <span><Lottie className="animate" options={defaultOptions}
        height={50}
        width={50}/></span> </button>
                
      
           </div>
         <div className="img-container">
           <img src={coupleimg} className='couple-img'/>
        </div>
        </div>
       
        
        <div className='choose'>
           
          <div className='choose-us-cont'>
          <p className='choose-us'>Why Choose Us ?</p>
          <p style={{textAlign:"center",width:"80vw"}}>In the enchanting landscape of matrimony, we proudly stand as the beacon of excellence. Our dedication to creating meaningful connections, coupled with a personalized approach, sets us apart as the premier destination for those seeking lifelong companionship. Trust in us to navigate the path to your happily ever after, for in the realm of matrimony, we are simply the best.</p>
          <img src={ringsframe}/>
           </div>
        </div>
        <img src={sidehalfimg} className='side-choose'/> 
        <div style={{alignSelf:"flex-start",justifySelf:"flex-end"}}>
          <img src={lefthalfimg} className='leftexplore'/> 
          </div>

         <div className="explore">
          
          <p className='exploretext'>Explore matrimonial profiles</p>
           <div className="explore-cont">
            <img className='explore-imgs' src={religionimg}/>
             <img className='explore-imgs'  src={casteimg}/>
             <img className='explore-imgs'  src={mothertoungeimg}/>
           </div>
           
         </div>
         <img src={exploreright} className='exploreRight'/>
        <div className="endorsements">
         
          <div className='endorse-cont'>
          <h5 className='heading-endorse'>Endorsements</h5>
          <p className='para-endorse'>Discover what others have to say about their experiences with us. Their words of praise, heartfelt commendations, and glowing reviews serve as a testament to the effectiveness of our matchmaking services</p>
            <div className='yukthi-cont'>
             <img className="arrows" src={leftArrow}/>
            <img src={yukthi} className='yukthi-img'/>          
            <img className="arrows" src={rightArrow}/>
            </div>
            </div>
             {/* <img src={rightimg} className='righthalf'/> */}
        </div>

        <div className="destination-cont">
        <h4 className='destination'>Perfect destination to discover your soulmate</h4>
        <p className="destination-para"> From detailed profiles that capture the essence of who you are to sophisticated matching algorithms that consider compatibility on multiple levels, we ensure that every interaction is purposeful and promising. With a community of like-minded individuals all on a quest for love, our platform fosters genuine connections that have the potential to blossom into something beautiful.</p>
        <button className='begin'>
        Let’s Begin
        </button>
        </div>
        
       </div>

       <div className='bottom'>
          
          <div className='first-bottom'>
           <div className='first-row'>
           <h3 className='heading'>Let's write our own love story together : Download Our App For Any Queries</h3>
      
            <p className='paragraph'>Our platform is dedicated to helping you find a lifelong partner who shares your values, dreams, and aspirations. </p>
            <div className="connect">
             <img src={playstore}/>
             <img src={appstore} className='appstore'/>
            </div>
            
       </div>
          </div>
         
       
           
      <div className='second-bottom'>
        <div className='top-bottom'>
        <img src={bottomleftimg} className='bottomleftimg' />
        
        <h5 className='bottom-text-1'>S<span className='bottom-text-1-span'>electing a life partner is like adding a precious melody to the song of your life, forever altering its tune. The sweetest symphony is found in choosing the perfect harmony. How delightful it would be to have a trusted companion to join in this heartwarming duet of choice.</span></h5>
        <img src={verticalline} className='line'/>
       
          <div className='horizontal'>
          <div className='contact'>
          
          <h5 className='contact-head'>Contact us</h5>
          <p className='mobile'>Mobile : 1234567890</p>
          <p className='emailid'>Email :xyz@gmail.com</p>
            <div>
            <img src={facebook}/>
            <img src={instagram}/>
            <img src={linkedin}/>
            <img src={twitter}/>
            </div>
          </div>
          <img src={verticalline} className='line'/>
          </div>

        <div className='privacy-cont'>
          <div className='privacy-sub-cont'>
                <h4 className='privacy-head'>Privacy & You</h4>
                <p className='privacy'>Privacy policy</p>
                <p className='terms'>Terms & Conditions</p>
          </div>
           <div>
              <img src={verticalline} className='line'/>
           </div>
        </div>
        <img src={logo} className='bottom-logo'/>
        </div>
        <div>
        <img src={horizontalline} className='horline'/>
        </div>
        <p className='copyright'>Copyright@2024 All rights reserved</p>
      </div>   
    </div>
    <img src={rightbottomimgside} className='right-side-img-bottom'/>
  </div>
  )
}

export default Home