import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form, Input, FormFeedback, } from 'reactstrap';
import { registration1 } from '../../utils/constants';
import './Professional.css'
import Buttons from './Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { saveFormData,nextStep,prevStep } from '../../redux/slices/StepperSlice';
function Professional() {
  const [formData, setFormData] = useState({

    highestEducation: "",
    occupation: "",
    annualIncome: "",
    WorkLocation: "",
    age: 0,
    yearOfPassing: "",
    nameOfTheInstitute: "",
    employmentStatus: "",
    employedIn: "",
    workstate: "",
    workcity: ""
  });

  const education = ["PhD", "Masters", "Bachelors", "Others"]
  const occupation = ["Business Owner",
    "Celebrity",
    "Self Employed",
    "Government Employee",
    "Corporate Employee",
    "Unemployed",
    "Others"]
  const employmentStatus = ["Full Time",
    "Part Time",
    "Contract"]
  const income = ["Less than 50k",
    "50K",
    "0 - 1 Lakh",
    "1 - 2 Lakhs",
    "2 - 4 Lakhs",
    "4 - 6 Lakhs",
    "6 - 8 Lakhs",
    "8 - 10 Lakhs",
    "10 - 12 Lakhs",
    "12 - 14 Lakhs",
    "14 - 16 Lakhs",
    "16 - 18 Lakhs",
    "18 - 20 Lakhs",
    "20 - 30 Lakhs",
    "30 - 40 Lakhs",
    "40 - 50 Lakhs",
    "50 - 60 Lakhs",
    "60 - 70 Lakhs",
    "70 - 80 Lakhs",
    "80 - 90 Lakhs",
    "90 - 1 Crore ",
    "1 Crore & Above"]
  // const nav=useNavigate()
  const [eduError, setEduError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [employmentError, setEmploymentError] = useState(false);
  const [employedError, setEmployedError] = useState(false);
  const [workLocationError, setWorkLocationError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setcityError] = useState(false);
  const [incomeError, setIncomeError] = useState(false);
  const {formData1} = useSelector((store)=>store.stepper )
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleNext = () => {
    if (formData.highestEducation === "") {
      setEduError(true)
    }
    else if (formData.yearOfPassing == "") {
      setYearError(true)

    }

    else if (formData.nameOfTheInstitute === "") {
      setNameError(true)
    }
    else if (formData.occupation === "") {
      setOccupationError(true)
    }


    else if (formData.employmentStatus == "") {
      setEmploymentError(true)

    }
    else if (formData.employedIn === "") {
      setEmployedError(true)
    }
    else if (formData.WorkLocation === "") {
      setWorkLocationError(true)
    }
    else if (formData.workcity === "") {
      setWorkLocationError(true)
    }
    else if (formData.workstate === "") {
      setcityError(true)
      setStateError(true)
    }
    else if (formData.annualIncome === "") {
      setIncomeError(true)
    }
    else {
   setEduError(false)
    }

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    handleNext()
    await dispatch(saveFormData(formData))
    await dispatch(nextStep(formData))

  };
  const prev = async() => {
    await dispatch(prevStep(formData))
  }
  useEffect(() => {
    setFormData(formData1)
  }, [formData1])

  return (

    <div className="container-fluid">
      <Form onSubmit={handleSubmit} className='w-100'>
        <div className="row mb-4 gap">
          <div className=" col-12 col-md-6 col-lg-6">
            <Input className='dob'
              id="highestEducation" name="highestEducation" placeholder={registration1.education} value={formData.highestEducation} onChange={handleChange}
              type="select"
              invalid={formData.highestEducation === "" && eduError}
            >
              <option value="" disabled >{registration1.education}</option>
              {education.map((high, index) => (
                <option key={index} value={high}>{high}</option>
              )
              )}
            </Input>

            {formData.highestEducation === "" && eduError && <FormFeedback style={{ textIndent: "-11em" }}>
              {registration1.field}
            </FormFeedback>}
          </div>
          <div className=" col-12 col-md-6 col-lg-6">
            <Input className='dob'
              id="yearOfPassing" name="yearOfPassing" placeholder={registration1.year} value={formData.yearOfPassing} onChange={handleChange}
              type="text" invalid={formData.yearOfPassing === "" && yearError}>
            </Input>
            {formData.yearOfPassing === "" && yearError &&
              <FormFeedback>
                {registration1.field}
              </FormFeedback>}
          </div></div>
        <div className="row mb-4">
          <div className="col-12 col-md-12 col-lg-12">
            <Input className='dob'
              id="nameOfTheInstitute" name="nameOfTheInstitute" placeholder={registration1.name} value={formData.nameOfTheInstitute} onChange={handleChange}
              type="text" invalid={formData.nameOfTheInstitute === "" && nameError}> </Input>
            {formData.nameOfTheInstitute === "" && nameError &&
              <FormFeedback style={{ textIndent: "1em" }}>
                {registration1.field}
              </FormFeedback>}
          </div></div>
        <div className="row mb-4 gap">
          <div className="col-12 col-md-3 col-lg-3 ">
            <Input className='dob'
              id="occupation" name="occupation" placeholder="Occupation*" value={formData.occupation} onChange={handleChange} type="select"
              invalid={formData.occupation === "" && occupationError}  >
              <option value="" disabled >Occupation *</option>
              {occupation.map((occ, index) => (
                <option key={index} value={occ} >{occ}</option>
              ))}
            </Input>
            {formData.occupation === "" && occupationError &&
              <FormFeedback style={{ textIndent: "1em" }}>
                {registration1.field}
              </FormFeedback>}
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <Input className='dob'

              id="employmentStatus" name="employmentStatus" placeholder={registration1.employment} value={formData.employmentStatus}
              type="select"
              onChange={handleChange}
              invalid={formData.employmentStatus === "" && employmentError}
            >

              <option value="" disabled> {registration1.employment}</option>
              {employmentStatus.map((es, index) => (
                <option key={index} value={es}>{es}</option>

              )
              )}
            </Input>
            {formData.employmentStatus === "" && employmentError &&
              <FormFeedback style={{ textIndent: "3.3em" }}>
                {registration1.field}
              </FormFeedback>
            }
          </div>
          <div className="col-12 col-md-5 col-lg-5">
            <Input className=' dob'

              id="employedIn" name="employedIn" placeholder={registration1.employedinplaceholder} value={formData.employedIn}
              type="text"
              onChange={handleChange}
              invalid={formData.employedIn === "" && employedError}
            >

            </Input>
            {formData.employedIn === "" && employedError &&
              <FormFeedback style={{ textIndent: "1em" }}>
                {registration1.field}
              </FormFeedback>}
          </div>
        </div>

        <div className="row mb-4 gap">
          <div className=" col-12 col-md-3">
            <Input className=' dob'
              id="WorkLocation" name="WorkLocation" placeholder={registration1.locationplaceholder} value={formData.WorkLocation} onChange={handleChange}

              type="text"

              invalid={formData.WorkLocation === "" && workLocationError}
            >
            </Input>
            {formData.WorkLocation === "" && workLocationError &&
              <FormFeedback style={{ textIndent: "40px" }}>
                {registration1.field}
              </FormFeedback>}
          </div>
          <div className=" col-12 col-md-3">
            <Input className=' dob'

              id="workstate" name="workstate" placeholder='State' value={formData.workstate} onChange={handleChange}
              type="text" invalid={formData.workstate === "" && stateError} >
            </Input>
            {formData.workstate === "" && stateError &&
              <FormFeedback style={{ textIndent: "3.3em" }}>
                {registration1.field}
              </FormFeedback>
            }
          </div>
          <div className="clo-12 col-md-3 ">
            <Input className='dob' id="workcity" name="workcity" placeholder='City' value={formData.workcity} onChange={handleChange}
              type="text" invalid={formData.workcity === "" && cityError}>
            </Input>
            {formData.workcity === "" && cityError &&
              <FormFeedback style={{ textIndent: "1em" }}>
                {registration1.field}
              </FormFeedback>}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <Input className=' dob'
              id="annualIncome" name="annualIncome" value={formData.annualIncome} onChange={handleChange}

              type="select"

              invalid={formData.annualIncome === "" && incomeError}
            >                  <option value="" disabled > {registration1.annualtext}</option>
              {income.map((inc, index) => (
                <option key={index} value={inc} >{inc}</option>
              ))}
            </Input>
            {formData.annualIncome === "" && incomeError &&
              <FormFeedback style={{ textIndent: "40px" }}>
                {registration1.annualincome}
              </FormFeedback>
            }
          </div>
          <div>
          <Buttons prev ={prev} />
          </div>
          

        </div>
      </Form >
    </div>




  );
}

export default Professional
