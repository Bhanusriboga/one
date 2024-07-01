import React from 'react';
import { useState,useEffect } from 'react';
// import axios from 'axios';

function SearchByName() {
    const [name,setName]=useState("")
    const [filteredList,setFilteredList]=useState([])

    const url="http://192.168.29.191:8080/searchByName/{name}"
    const onSearch=()=>{
       searching(name)
       console.log(name)
    }
    const onName=(e)=>{
     setName(e.target.value)
    }
    const searching=async (name)=>{
        // await axios.get(`http://192.168.29.191:8080/searchByName/${name}`)
        // .then(res=>{
        //    console.log(res.data)
        // })
    }
   
  return (
    <div>
        <input type='search' onChange={onName} value={name} placeholder='search by name'/>
        <button type="button" onClick={onSearch}>search</button>
    </div>
  )
}

export default SearchByName