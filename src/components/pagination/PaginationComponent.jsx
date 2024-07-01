import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useState} from "react"
import "./Pagination.scss"

export default function PaginationComponent() {
  const [val,setVal]=useState(1)
  const handleChange=(e,value)=>{
     setVal(value)
  }
  return (
    <>
    <p>{val}</p>
    <Stack spacing={2}>
      <Pagination className='pages' count={10} page={val} shape='rounded' color="primary" onChange={handleChange} />
      
    </Stack>
    </>
  );                                                                                                                                                                            
}