// import React,{useEffect, useState} from 'react'
// import {useHistory} from "react-router-dom"
// import animation from "../../utils/Animation - 1720516602656.json"
// import Lottie from "react-lottie"
// import { RiArrowDropUpLine } from "react-icons/ri";
// import logo from "../../utils/Logo01 1.svg"
// import "./home.css"
// import playstore from "./assets/Rectangle 4453.png"
// import appstore from "./assets/Rectangle 4455.png";
// import yukthiimg from "../../utils/Group 45.png";
// import yukthi2 from "../../utils/Group 46.png"
// import yukthi3 from "../../utils/Group 47.png"
// import frame1 from"../../utils/Frame 45.png"
// import frame2 from "../../utils/Frame 46.png"
// import coupleimg from "../../utils/Rectangle 4110.png"
// import ringsframe from "../../utils/Frame 39.png"
// import rings from "../../utils/Rings 1.png"
// import casteimg from "../../utils/Group 38.png"
// import religionimg from "../../utils/Group 40.png"
// import mothertoungeimg from "../../utils/Group 39.png"
// import yukthi from "../../utils/Frame 40.png";
// import leftArrow from "../../utils/Frame 42.png"
// import rightArrow from "../../utils/Frame 41.png"
// import sidehalfimg from "../../utils/394317-PCMJUW-273-Photoroom 9.png"
// import exploreright from "../../utils/394317-PCMJUW-273-Photoroom 9 (2).png"
// import lefthalfimg from "../../utils/394317-PCMJUW-273-Photoroom 10.png"
// import bottomleftimg from "../../utils/394317-PCMJUW-273-Photoroom 8.png"
// import facebook from "../../utils/facebook.png"
// import instagram from "../../utils/instagram.png"
// import linkedin from "../../utils/mdi_linkedin.png"
// import twitter from "../../utils/ri_twitter-x-fill.png"
// import verticalline from "../../utils/Line 44.png"
// import horizontalline from "../../utils/Line 47.png"
// import rightbottomimgside from "../../utils/394317-PCMJUW-273-Photoroom 7.png"
// function Home() {
//   const [scrolled,setScrolled]=useState(false)
//   const [dropDown,setDropDown]=useState(false)
//   const [width,setWidth]=useState(window.innerWidth)
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animation,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice"
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("scroll",()=>{  
//       if(window.scrollY>0){
//         setScrolled(true)
//       }
//       else{
//         setScrolled(false)
//       }
//     })
//   }, [])

//   useEffect(()=>{
//     const handleResize=()=>{
//       setWidth(window.innerWidth)
//     }
//     window.addEventListener("resize",handleResize)
//     return () => window.removeEventListener('resize', handleResize);
//   },[])
//   const onNavBtn=()=>{
//        setDropDown(true)
//   }
//   const navigator=useHistory()
//   return (
//   <div className='home-page-div d-flex flex-column justify-content-space-between align-items-center position-relative' >
//      <nav className={`custom-nav navbar-expand-lg fixed-top ${scrolled&&"navbar-blur"}`}>
//       <img src={logo} className='nav-logo'/>
//       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//       {/* {dropDown?<div>
//         <div className='ml-5 mr-5' onClick={onNavBtn}>
//          <p>Login ^</p>
//       </div>
//       <ul class="navbar-nav ml-auto mr-5 dropDown2" >
//       <li class="nav-item">
//         <a className="nav-link" href="#">About us</a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="/signUp">Signup</a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="/login">Login</a>
//       </li>
//     </ul>
//       </div>:<div className='ml-auto mr-5' onClick={onNavBtn}>
//          <p>Login ^</p>
//       </div>} */}
      
//   <div className="collapse navbar-collapse navbar-cont" id="navbarNav" >
//     <ul class="navbar-nav ml-auto mr-5">
//       <li class="nav-item">
//         <a className="nav-link" href="#">About us</a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="/signUp">Signup</a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="/login">Login</a>
//       </li>
//     </ul>
//   </div>

//      </nav>
//        <div className='content d-flex flex-column justify-content-center'>
//         <div className='couple-container d-flex justify-content-space-around align-items-center'>
//           <div className='col1 display-flex flex-column justify-content-center align-items-flex-start'>
//              <img src={frame1} className='w-50'/>
//              <img src={frame2} className="w-50"/>
//               <div className='engage-btn' onClick={()=>navigator.push("/signup")} >
//                 Engage <span><Lottie className="animate" options={defaultOptions}
//                height={50}
//                 width={50}/></span> </div>
//            </div>
//           <div className="img-container">
//            <img src={coupleimg} className='couple-img'/>
//           </div>
//         </div>
//         <div className='choose'>
           
//           <div className='choose-us-cont'>
//           <p className='choose-us'>Why Choose Us ?</p>
//           <p style={{textAlign:"center",width:"80vw"}}>In the enchanting landscape of matrimony, we proudly stand as the beacon of excellence. Our dedication to creating meaningful connections, coupled with a personalized approach, sets us apart as the premier destination for those seeking lifelong companionship. Trust in us to navigate the path to your happily ever after, for in the realm of matrimony, we are simply the best.</p>
         

//         <img src={ringsframe} className={width<600?"d-none":"d-block"}/>
          
//         <div className={`d-flex position-relative ${width<600?"d-block":"d-none"}`} >
//         <div className='ring-con'> 
//           <img  src={rings}>
//           </img>
//           <p className='para-ring-1'>Trust Worthy</p>
//         </div>
//         <div className='ring-con'> 
//           <img  src={rings}>
//           </img>
//           <p className='para-ring-1'>Stake Holders</p>
//         </div>
//         <div className='ring-con'> 
//           <img  src={rings}>
//           </img>
//           <p className='para-ring'>Franchise</p>
//         </div>
//         <div className='ring-con'> 
//           <img  src={rings}>
//           </img>
//           <p className='para-ring'>Vendors</p>
//         </div>
//         </div>
          
//            </div>
//         </div>
//         <img src={sidehalfimg} className='side-choose'/> 
//         <div style={{alignSelf:"flex-start",justifySelf:"flex-end"}}>
//           <img src={lefthalfimg} className='leftexplore'/> 
//           </div>

//          <div className="explore">
          
//           <p className='exploretext'>Explore matrimonial profiles</p>
//           {width <600 ? 
//             <div className="explore-cont">
//            <img className='explore-imgs'  src={casteimg}/>
//            <img className='explore-imgs religion' src={religionimg}/>
//            <img className='explore-imgs'  src={mothertoungeimg}/>
               
//            </div> : <div className="explore-cont" onClick={()=>navigator.push("/signup")} >
//             <img className='explore-imgs' src={religionimg}/>
//              <img className='explore-imgs'  src={casteimg}/>
//              <img className='explore-imgs'  src={mothertoungeimg}/>
//            </div>}
//          </div>   
//          <img src={exploreright} className='exploreRight'/>
      
//         <div className="endorsements">
         
//           <div className='endorse-cont'>
//           <h5 className='heading-endorse'>Endorsements</h5>
//           <p className='para-endorse'>Discover what others have to say about their experiences with us. Their words of praise, heartfelt commendations, and glowing reviews serve as a testament to the effectiveness of our matchmaking services</p>
//             {width<600?<div className='yukthi-cont'>
//              <img src={yukthi2} className='yukthi-2'/>
//             <img src={yukthiimg} className='yukthi-img'/>  
//             <img src={yukthi3} className='yukthi-2'/>        
           
//             </div>:<div className='yukthi-cont'>
//              <img className="arrows" src={leftArrow}/>
//             <img src={yukthi} className='yukthi-img'/>          
//             <img className="arrows" src={rightArrow}/>
//             </div>}
//             </div>
//         </div>

//         <div className="destination-cont">
//         <h4 className='destination'>Perfect destination to discover your soulmate</h4>
//         <p className="destination-para"> From detailed profiles that capture the essence of who you are to sophisticated matching algorithms that consider compatibility on multiple levels, we ensure that every interaction is purposeful and promising. With a community of like-minded individuals all on a quest for love, our platform fosters genuine connections that have the potential to blossom into something beautiful.</p>
//         <div className='begin' onClick={()=>navigator.push("/signup")}>
//         Let’s Begin
//         </div>
//         </div>
        
//        </div>
//        <div className='bottom'>
          
//           <div className='first-bottom'>
//            <div className='first-row'>
//            <h3 className='heading'>Let's write our own love story together : Download Our App For Any Queries</h3>
      
//             <p className='paragraph'>Our platform is dedicated to helping you find a lifelong partner who shares your values, dreams, and aspirations. </p>
//             <div className="connect">
//              <img src={playstore}/>
//              <img src={appstore} className='appstore'/>
//             </div>
            
//        </div>
//           </div>
//         {width<600?
//       <div className='second-bottom'>
//         <div className='top-bottom'>
//         <img src={logo} className='bottom-logo'/>
//         <h5 className='bottom-text-1'>S<span className='bottom-text-1-span'>electing a life partner is like adding a precious melody to the song of your life, forever altering its tune. The sweetest symphony is found in choosing the perfect harmony. How delightful it would be to have a trusted companion to join in this heartwarming duet of choice.</span></h5>
//           <div className='horizontal'>
//           <div className='contact'>
//           <h5 className='contact-head'>Contact us</h5>
//           <p className='mobile'>Mobile : 1234567890</p>
//           <p className='emailid'>Email :xyz@gmail.com</p>
//             <div>
//             <img src={facebook}/>
//             <img src={instagram}/>
//             <img src={linkedin}/>
//             <img src={twitter}/>
//             </div>
//           </div>
//           </div>
//         <div className='privacy-cont'>
//           <div className='privacy-sub-cont'>
//                 <h4 className='privacy-head'>Privacy & You</h4>
//                 <p className='privacy'>Privacy policy</p>
//                 <p className='terms'>Terms & Conditions</p>
//           </div>
          
//         </div>
//         </div>
//         <div>
//         <img src={horizontalline} className='horline'/>
//         </div>
//         <p className='copyright'>Copyright@2024 All rights reserved</p>
//       </div> : <div className='second-bottom'>
//         <div className='top-bottom'>
//         <img src={bottomleftimg} className='bottomleftimg' />
//         <h5 className='bottom-text-1'>S<span className='bottom-text-1-span'>electing a life partner is like adding a precious melody to the song of your life, forever altering its tune. The sweetest symphony is found in choosing the perfect harmony. How delightful it would be to have a trusted companion to join in this heartwarming duet of choice.</span></h5>
//         <img src={verticalline} className='line'/>
//           <div className='horizontal'>
//           <div className='contact'>
//           <h5 className='contact-head'>Contact us</h5>
//           <p className='mobile'>Mobile : 1234567890</p>
//           <p className='emailid'>Email :xyz@gmail.com</p>
//             <div>
//             <img src={facebook}/>
//             <img src={instagram}/>
//             <img src={linkedin}/>
//             <img src={twitter}/>
//             </div>
//           </div>
//           <img src={verticalline} className='line'/>
//           </div>

//         <div className='privacy-cont'>
//           <div className='privacy-sub-cont'>
//                 <h4 className='privacy-head'>Privacy & You</h4>
//                 <p className='privacy'>Privacy policy</p>
//                 <p className='terms'>Terms & Conditions</p>
//           </div>
//            <div>
//               <img src={verticalline} className='line'/>
//            </div>
//         </div>
//         <img src={logo} className='bottom-logo'/>
//         </div>
//         <div>
//         <img src={horizontalline} className='horline'/>
//         </div>
//         <p className='copyright'>Copyright@2024 All rights reserved</p>
//       </div> 
// }
      
      
//     </div>
//     <img src={rightbottomimgside} className='right-side-img-bottom'/>
//   </div>
//   )

// }
// export default Home






import React, { useEffect, useState } from 'react'
import logo from "./assets/Logo01 1.svg"
import "./home.css"
import sidehalfimg from "./assets/394317-PCMJUW-273-Photoroom 9.png"
import exploreright from "./assets/394317-PCMJUW-273-Photoroom 5.svg"
import lefthalfimg from "./assets/394317-PCMJUW-273-Photoroom 10.png"
import Couple from './Couple'
import Choose from './Choose'
import Explore from './Explore';
import rightcircle from "./assets/394317-PCMJUW-273-Photoroom 9 (2).png"
import Endorse from './Endorse';
import rightchakra from "./assets/011 3.png"
import Destination from './Destination';
 
function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      }
      else {
        setScrolled(false)
      }
    })
  }, [])
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  return (
    <div className='home-page-div d-flex flex-column justify-content-space-between align-items-center w-100 ' >
      <nav className={`custom-nav navbar-expand-lg fixed-top ${scrolled && "navbar-blur"}`}>
        <img src={logo} className='nav-logo' />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* {dropDown?<div>
        <div className='ml-5 mr-5' onClick={onNavBtn}>
         <p>Login ^</p>
      </div>
      <ul className="navbar-nav ml-auto mr-5 dropDown2" >
      <li className="nav-item">
        <a className="nav-link" href="#">About us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/signUp">Signup</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/login">Login</a>
      </li>
    </ul>
      </div>:<div className='ml-auto mr-5' onClick={onNavBtn}>
         <p>Login ^</p>
      </div>} */}
 
        <div className="collapse navbar-collapse navbar-cont" id="navbarNav" >
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item">
              <a className="nav-link" href="#">About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signUp">Signup</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
          </ul>
        </div>
 
      </nav>
      <div className='content d-flex flex-column justify-content-center align-items-center'>
        <Couple />
        <Choose width={width} />
        <img src={sidehalfimg} className='side-choose' />
        <div style={{ alignSelf: "flex-start", justifySelf: "flex-end" }}>
          <img src={lefthalfimg} className='leftexplore' />
        </div>
        <img src={rightcircle} className="position-absolute right-circle"/>
        <Explore width={width} />
        <img src={exploreright} className='exploreRight' />
        <Endorse />
        <img src={rightchakra} className='position-absolute right-chakra'/>
        <Destination />
      </div>
    </div>
  )
}
export default Home