import React,{useRef} from 'react'
import "./home.css"
import arrow from "./assets/Group 29.png"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
function Explore() {
  const myRef=useRef()
const list=[]


for (let index = 0; index < 101; index++) {
  list.push(index)
  
}


  const getDivs=()=>{
    const items=[]
    for(let i=0;i<list.length;i++){
        items.push( <div className='scr d-flex'>
          <div className='card-bg'>
          <p className='card-text1'>RELIGION</p>
          <div className='para-div'>
            <p className='para-explore'>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
            <p className='para-explore '>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
          </div>
          <p></p>
          <div className='expore-btn  d-flex justify-content-evenly align-items-center' onClick={() => navigator.push("/signup")}>
            <p className="btn-text"> Explore</p>
            <img src={arrow} className='btn-arrow' />
          </div>
        </div>
        <div className="card-bg">
          <p className='card-text1'>CASTE</p>
          <div className='para-div'>
            <p className='para-explore'>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
            <p className='para-explore '>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
          </div>
          <p></p>
          <div className='expore-btn d-flex justify-content-evenly align-items-center' onClick={() => navigator.push("/signup")}>
            <p className="btn-text btn-text-big"> Explore</p>
            <img src={arrow} className='btn-arrow btn-arrow-big' />
          </div>
        </div>
        <div className='card-bg'>
          <p className='card-text1 '>MOTHER TONGUE</p>
          <div className='para-div'>
            <p className='para-explore'>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
            <p className='para-explore '>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
          </div>
          <p></p>
          <div className='expore-btn d-flex justify-content-evenly align-items-center' onClick={() => navigator.push("/signup")}>
            <p className="btn-text"> Explore</p>
            <img src={arrow} className='btn-arrow' />
          </div>
        </div>
        </div>)
    }
    return items
  }
 
  const navigator = useHistory()
  return (
    <div className="explore d-flex flex-column justify-content-between align-items-center">
      <p className='choose-us'>Explore matrimonial profiles</p>


    
    <div className='scroll-container d-flex justify-content-evenly' ref={myRef} >
  <div className='scroll-div'>
     {getDivs()}
               
    </div>
  </div>

      <div className="explore-cont mb-5" onClick={() => navigator.push("/signup")} >
        <div className='card-bg'>
          <p className='card-text1'>RELIGION</p>
          <div className='para-div'>
            <p className='para-explore'>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
            <p className='para-explore '>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
          </div>
          <p></p>
          <div className='expore-btn  d-flex justify-content-evenly align-items-center' onClick={() => navigator.push("/signup")}>
            <p className="btn-text"> Explore</p>
            <img src={arrow} className='btn-arrow' />
          </div>
        </div>
        <div className='card-bg'>
          <p className='card-text1'>CASTE</p>
          <div className='para-div para-div-big'>
            <p className='para-explore'>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
            <p className='para-explore '>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
          </div>
          <p></p>
          <div className='expore-btn  explore-btn-big d-flex justify-content-evenly align-items-center' onClick={() => navigator.push("/signup")}>
            <p className="btn-text btn-text-big"> Explore</p>
            <img src={arrow} className='btn-arrow btn-arrow-big' />
          </div>
        </div>
        <div className='card-bg'>
          <p className='card-text1 '>MOTHER TONGUE</p>
          <div className='para-div'>
            <p className='para-explore'>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
            <p className='para-explore '>Hindu | Muslim | Christian Buddhism | Jain | Sikhism</p>
          </div>
          <p></p>
          <div className='expore-btn d-flex justify-content-evenly align-items-center' onClick={() => navigator.push("/signup")}>
            <p className="btn-text"> Explore</p>
            <img src={arrow} className='btn-arrow' />
          </div>
        </div>
      </div>
      
      <div>
      </div>
    </div>

  )
}
export default Explore