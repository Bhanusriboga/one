import React from 'react'
import { CircularProgressbar ,buildStyles } from 'react-circular-progressbar';
import { useSelector } from 'react-redux'
import {ProgressBar, Step} from 'react-step-progress-bar'
import 'react-step-progress-bar/styles.css';
import BasicsDetails from './BasicsDetails';
import PersonalDetails from './PersonalDetails';
import Professional from './Professional';
import Media from './Media';
import Finish from './Finish';
import './Stepper.css'

function Stepper() {
  const {currentStep} = useSelector((store)=>store.stepper)
  const renderStep = ()=>{
    switch(currentStep){
      case 1 :
        return <BasicsDetails />;
      case 2 :
        return <PersonalDetails />;
      case 3 :
        return <Professional />;
      case 4 :
        return <Media />;
      case 5 : 
        return <Finish />;
      default :
        return <BasicsDetails />
    }
  }
  const stepNames = [" Basics", "Personal Details", "Professional Details", "Media", "Finish"];
  const progressPercentage = ((currentStep - 1) / 4) * 100;
  return (
    <div className='stepper-main-container'>
       <div className="stepper-container">
    <ProgressBar
    percent={(currentStep-1) * 25} 
    filledBackground="rgba(120, 0, 36, 1)">
{stepNames.map((name,index)=>(
  <Step key={index}>
{({ accomplished }) => (
                <div className="step-wrapper">
                  <div className={`indexedStep ${accomplished ? 'accomplished' : ''}`}>
                    {index + 1}
                  </div>
                  <div className="step-name">
                    {name}
                  </div>
                </div>
              )}
  </Step>
))}
    </ProgressBar>
      </div>
    <div className="mobile-view">
      <div className="circular-progress-container">
          <CircularProgressbar
           value={progressPercentage}
           
            text={`${currentStep} of 5`}
            styles={buildStyles({
              textColor: "#000",
              pathColor: "rgba(120, 0, 36, 1)",
              trailColor: "#d6d6d6",
              pathWidth: 20        
               
            })}
          />
          </div>
            <div className="step-name-mobile">
            {stepNames[currentStep - 1]}
          </div>

    </div>
    <div className="step-content">
        {renderStep()}
      </div>
    </div>
  )
}

export default Stepper