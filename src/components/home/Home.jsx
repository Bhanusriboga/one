import { useState,useEffect} from 'react'
import { BrowserRouter, Routes, Route,useNavigate,Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from "react-bootstrap-icons";



function Home() {
const mystyle=
  {color: "white"}
const mystyle2={backgroundColor: "rgb(205, 197, 197)",textAlign: "center"}
const navigate=useNavigate()
 const signUpDiv=()=>{
      navigate("/Login")

 }
 const options=[]
 for (let index = 18; index < 36; index++) {
    options.push(index)
  
 }

 
  return (
    <div className='main-cont'>
      <nav className="navbar navbar-expand-lg ">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src="http://pellisambandalu.com/wp-content/uploads/2022/12/logo-300x92.png"/>
                </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              </div>
              <div className="container">
               
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link active head1 flex-container" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link flex-container" href="#">About Us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active flex-container" aria-current="page" href="#">Brides</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link flex-container" href="#">Grooms</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link flex-container" href="#">Contact</a>
                  </li>
                 
                  <li className="nav-item ">
                    <a className="nav-link flex-container" href="/Login" id="navbarlogin" role="button"  aria-expanded="false">
                      Login
                    </a>
                    
                    </li>
                    
                  </ul>
              </div>
            </div>
          </nav>
          <div className="con-1">
            <div>  <div className="imgmatter">Where Love Meets Destiny And Hearts Unite Forever
   <br/><div className="text1">Pellisambandalu<br/>
   </div>
   </div>

   <div className="text2">The Trusted Matrimony</div>
   </div>
   <div className="dropbox">
    <div className="labell">
   <label style={mystyle}>Looking for</label><br/>
    
    <select style={{width:"100px",textAlign:"center"}}>
      <option >
        men
      </option>
      <option>
        women
      </option>
    </select>
</div>
<div className="labell">
    <label style={{color: "white"}}>Aged</label><br/>
      
     <select style={{width:"100px",textAlign:"center"}}>

      {options.map((item)=><option value={item}>{item}</option>)}
         
      
    </select>
    
 </div> 
 <p style={{color:"white",marginTop:"34px"
 }}>To</p>
 <div className="labell">
    <label style={{color: "white", display: "none"}}>to</label><br/>
    <select style={{width:"100px",textAlign:"center"}} defaultValue="25">
    
{options.map((item)=><option value={item}>{item}</option>)}
   

</select>
 </div>
 <div className="labell">
    <label style={{color: "white"}}>Religion</label><br/>
    <select style={{width:"100px",textAlign:"center"}}>
      <option >
        Hindu
      </option>
      <option>
        Muslim
      </option>
      <option>
        Christian
      </option>
      <option>
        Sikhism
      </option>
      <option>
        Buddism
      </option>
      <option>
        Jainism
      </option>
    </select>
     
 </div>
 
    
 <button type="button" className="button2 ">Search</button></div>

   
   <div className="container-fluid">
   
   <div className="connect">
      
      <p style={{color: "orangered", fontSize:"20px", textShadow: "#2E2E2E"}}>Find Your Better Half Here</p>
      
      
       <div style={{display:"flex",width:"60vw",borderRadius:"15px"}}>
 <div className="connect3" onClick={signUpDiv}>
   <img src="https://thumbs.dreamstime.com/b/sign-up-member-icon-isolated-orange-round-button-abstract-illustration-sign-up-member-icon-orange-round-button-104804549.jpg"height="100"width="100"/ ><br/><br/><p style={{color: "orange",fontSize: "25px"}}>SIGNUP</p>
    </div>
    <div className="connect4"><img src="https://www.pngitem.com/pimgs/m/120-1204941_orange-color-heart-shape-hd-png-download.png" height="100" width="100"  className="rounded" /><br/><br/><p style={{color: "orange",fontSize: "25px"}}>CONNECT</p>
    </div>

    <div className="connect5"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGuBgLLPjxGfaHoEOiorL2boY3fIe2Ruch_ekPpEpDsvHfGuNwBCBaprUpQgJQ1jnR_cM&usqp=CAU"height="100"width="100"/><br/><br/><p style={{color:"orange",fontSize: "25px"}}>INTERACT</p>
    </div>
    </div>
  </div>
  </div>
   
   </div>
  


    </div>
  )

}
export default Home
