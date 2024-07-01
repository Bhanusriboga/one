
// import UserService from './userService';
import React, { useState,useEffect } from 'react'
// import axios from 'axios';
import Searchbyname from './SearchByName';
function UserComponent() {
    const [usersData,setUsersData]=useState([])
    const [copyList,setCopyList]=useState([])
    const USERS_REST_API_URL = 'http://192.168.29.191:8080/findAll';
   useEffect(()=>{
    //  axios.get(USERS_REST_API_URL)
    //  .then((res)=>{const data=res.data;
    //     setUsersData(data)
    //     setCopyList(data)
    //     console.log(data)
    //  })
     
   },[])
   const [name,setName]=useState("")
    

    const url="http://192.168.29.191:8080/searchByName/{name}"
    const onSearch=()=>{
        
        searching(name)

       console.log(name)
    }
    const onName=(e)=>{
     setName(e.target.value)
    }
    const searching=async (name)=>{
        // if(name===""){
        //     // await axios.get(USERS_REST_API_URL)
        //     // .then(res=>{
               
        //     //     setUsersData(res.data
                
        //     //     )
                
        //     //  })

        // }
        // else{
        //     await axios.get(`http://192.168.29.191:8080/searchByName/${name}`)
        //     .then(res=>{
               
        //        setUsersData(res.data
               
        //        )
               
        //     })
        // }
        
    }
  return (
    <div>
    <div>
        <input type='search' onChange={onName} value={name} placeholder='search by name'/>
        <button type="button" onClick={onSearch}>search</button>
    </div>
    <h1 className="text-center"> All Users List</h1>
    <table className="table table-striped">
        <thead>
            <tr>
                <th> User Id</th>
                <th> Username</th>
                <th> Password</th>
                <th> First Name</th>
                <th> Last Name</th>
                <th> Email Id</th>
                <th>
                    middle Name
                </th>
                <th>
                    email id
                </th>
                <th>
                    caste
                </th>
                <th>
                    sub caste
                </th>
                <th>
                    gothram
                </th>
                <th>
                maritalStatus
                </th>
                <th>
                height
                </th>
                <th>
                family Status
                </th>
                <th>
                family Type
                </th>
                <th>
                famiyValues
                </th>
                <th>
                disability
                </th>
                <th>
                highestEducation
                </th>
                <th>
                EmployementType
                </th>
                <th>
                occupation
                </th>
                <th>
                annualIncome
                </th>
                <th>
                WorkLocation
                </th>
                <th>
                age
                </th>



            </tr>
        </thead>
        <tbody>
            {usersData.map(user => (
                <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.middleName}</td>
                    <td>{user.emailId}</td>
                    <td>{user.caste}</td>
                    <td>{user.subcaste}</td>
                    <td>{user.gothram}</td>
                    <td>{user.maritalStatus}</td>
                    <td>{user.familyStatus}</td>
                    <td>{user.familyType}</td>
                    <td>{user.famiyValues}</td>
                    <td>{user.disability}</td>
                    <td>{user.highestEducation}</td>
                    <td>{user.occupation}</td>
                    <td>{user.annualIncome}</td>
                    <td>{user.WorkLocation}</td>
                    <td>{user.age}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

  )
}



export default UserComponent;

