
import { useParams } from "react-router-dom";
import { users } from "./Data";
import { useState } from "react";
function SingleUserData() {
  const [selectedimage,setselectedimage] = useState('/dummy.jpg')
  const handleimagechange= (image)=>{
    setselectedimage(image)
  }
  const { id } = useParams();
  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return <h2>User not found</h2>;
  }
  return (
    <div style={{ padding: '20px' }}>
    <h1>{user.name}</h1>
    <p>Time of Birth: {new Date(user.time_of_birth).toLocaleString()}</p>
    <p>Religion: {user.religion.religion_name}</p>
    <p>Caste: {user.religion.caste}</p>
    <p>Zodiac Sign: {user.religion.zodiac_sign}</p>
    <p>Mother Tongue: {user.mother_tongue}</p>
    <p>Language Proficiency: {user.language_proficiency.join(', ')}</p>
    <p>LinkedIn: <a href={`https://linkedin.com/in/${user.linkedin_id}`}>{user.linkedin_id}</a></p>
    <p>Address: {user.address}</p>
    <p>Citizenship: {user.citizenship}</p>
    <h3>Family Information</h3>
    <p>Family Status: {user.family_information.family_status}</p>
    <p>Father Name: {user.family_information.father_name}</p>
    <p>Mother Name: {user.family_information.mother_name}</p>
    <p>Siblings: {user.family_information.siblings.join(', ')}</p>
    <h3>Personal Information</h3>
    <p>Complexion: {user.personal_information.complexion}</p>
    <p>Body Type: {user.personal_information.body_type}</p>
    <p>Weight: {user.personal_information.weight}</p>
    <p>Any Disability: {user.personal_information.any_disability}</p>
    <p>Height: {user.personal_information.height}</p>
    <p>Eating Habits: {user.personal_information.eating_habits}</p>
    <p>Drinking Habits: {user.personal_information.drinking_habits}</p>
    <p>Smoking Habits: {user.personal_information.smoking_habits}</p>
    <p>About Me: {user.personal_information.about_me}</p>
    <h3>Professional Details</h3>
    <p>Highest Education: {user.professional_details.highest_education}</p>
    <p>Name of Institute: {user.professional_details.name_of_institute}</p>
    <p>Year of Passing: {user.professional_details.year_of_passing}</p>
    <p>Employ Status: {user.professional_details.employ_status}</p>
    <p>Employed In: {user.professional_details.employed_in}</p>
    <p>Occupation: {user.professional_details.occupation}</p>
    <p>Work Location: {user.professional_details.work_location}</p>
    <p>State: {user.professional_details.state}</p>
    <p>City: {user.professional_details.city}</p>
    <div style={{ backgroundColor:'red'}}>
<img src={selectedimage} style={{width:'300px',height:'300px'}}/>
    </div>
    <div style={{display:'flex',alignItems:'center' , gap:'40px',paddingTop:'80px'}}>
<div onClick={()=>handleimagechange('/vite.svg')} ><img src='/vite.svg' style={{width:'100px',height:'100px'}}/></div>
<div  onClick={()=>handleimagechange('/dummy.jpg')}><img src='/dummy.jpg ' style={{width:'100px',height:'100px'}}/></div>
<div onClick={()=>handleimagechange('/vite.svg')}><img src='/vite.svg' style={{width:'100px',height:'100px'}}/></div> 
    </div>
    
  </div>
  )
}

export default SingleUserData