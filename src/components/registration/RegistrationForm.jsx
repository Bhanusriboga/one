import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from './userService';
// import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    roles:'',
  });
  const [registrationError, setRegistrationError] = useState(null);


        // Add other fields as needed
    });
    
    const myArray=[5,10,20,28]
    const formArray=Object.keys(formData)

const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    };
   
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.35.22:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Success:', data);
            // Optionally, redirect to another page or show a success message
        } catch (error) {
            console.error('Error:', error);
            // Handle errors here
        }
        navigate("/home")
    };
    const handlePrevClick=()=>{
        setCount(parseInt(count)-1)
        if(count===3){
            setIndex(20)}
            if(count===2){
                setIndex(10)}
                if(count===1){
                    setIndex(5)}
                    if(count===0){
                        setIndex(5)}
                        if(count===0){
                            setIndex(5)}
                
    

    }
    const handleNextClick=()=>{
        setCount(parseInt(count)+1)
        
        if(count===0){
            setIndex(10)}

            if(count===1){
                setIndex(20)}
                if(count===2){
                    setIndex(28)}
                    if(count===3){
                        setIndex(28)}
                 if (count>3){
                    setIndex(28)
                 }
      console.log(index)
    }


    return (
        <div>
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                {index===5?<div >
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}  /><br /><br />
                
                <label htmlFor="mobileNumber">mobileNumber : </label>
                <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="dateOfBirth"> dateOfBirth : </label>
                <input type="date" id="middleName" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required /><br /><br />
                
                
                <label htmlFor="age">age : </label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required /><br /><br />
                 

                <label htmlFor="religion">religion : </label>
                <input type="text" id="religion" name="religion" value={formData.religion} onChange={handleChange} required /><br /><br />


                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /><br /><br />
                </div>:null}

    {index===10?<div>
        <label htmlFor="caste">caste : </label>
                <input type="text" id="caste" name="caste" value={formData.caste} onChange={handleChange} required /><br /><br />
                
                
        <label htmlFor="subcaste">motherTongue : </label>
                <input type="text" id="subcaste" name="subcaste" value={formData.subcaste} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="gothram">gothram : </label>
                <input type="text" id="gothram" name="gothram" value={formData.gothram} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="maritalStatus">maritalStatus : </label>
                <input type="text" id="maritalStatus" name="maritalStatus" value={formData.motherTongue} onChange={handleChange} required /><br /><br />
                 
                <label htmlFor="familyStatus">familyStatus : </label>
                <input type="text" id="familyStatus" name="familyStatus" value={formData.familyStatus} onChange={handleChange} required /><br /><br />
                 
                <label htmlFor="familyType">familyType : </label>
                <input type="text" id="familyType" name="familyType" value={formData.familyType} onChange={handleChange} required /><br /><br />
                 
                <label htmlFor="famiyValues">famiyValues : </label>
                <input type="text" id="famiyValues" name="famiyValues" value={formData.famiyValues} onChange={handleChange} required /><br /><br /></div>:null}
  
                <label htmlFor="disability">disability : </label>
                <input type="text" id="disability" name="disability" value={formData.disability} onChange={handleChange} required /><br /><br />
                 
                

                {index===20?
                    <div>
                      <label htmlFor="highestEducation">highestEducation : </label>
                      <input type="text" id="highestEducation" name="highestEducation" value={formData.highestEducation} onChange={handleChange} required /><br /><br />
                       
                      <label htmlFor="EmployementType">EmployementType : </label>
                      <input type="text" id="EmployementType" name="EmployementType" value={formData.EmployementType} onChange={handleChange} required /><br /><br />
                       
                      <label htmlFor="occupation">occupation : </label>
                      <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} required /><br /><br />
                       
                      <label htmlFor="annualIncome">annualIncome : </label>
                      <input type="text" id="annualIncome" name="annualIncome" value={formData.annualIncome} onChange={handleChange} required /><br /><br />
                       
                      
                      <label htmlFor="WorkLocation">WorkLocation : </label>
                      <input type="text" id="WorkLocation" name="WorkLocation" value={formData.WorkLocation} onChange={handleChange} required /><br /><br />
                 </div>   :null}
                {/* Add other fields for personal details */}
                {index===28?<div>
                    <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />
            
                <label htmlFor="emailId">emailId : </label>
                <input type="email" id="emailId" name="emailId" value={formData.emailId} onChange={handleChange} required /><br /><br />
                
                </div>:null}
                
                <input type="submit" />
            </form>
            <button onClick={handlePrevClick}>Previous</button>
            
    <button onClick={handleNextClick}>Next</button>
        </div>
    );
}

export default RegistrationForm;
