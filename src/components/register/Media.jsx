import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, prevStep, saveFormData } from '../../redux/slices/StepperSlice'

function Media() {
  const [formData1,setFormData1] = useState({name3:'',nickname3:''})
  const {formData} = useSelector((store)=>store.stepper )
  const dispatch = useDispatch()
  const changehandler = (e)=>{
setFormData1({...formData1,[e.target.name]:e.target.value})
  }
  const handlesubmit = (e)=>{
e.preventDefault()
dispatch(saveFormData(formData1))
dispatch(nextStep(formData1))
  }
const handleprev = ()=>{
dispatch(prevStep(formData1))
  }
  useEffect(()=>{
    if(formData){
      setFormData1(formData)
    }
  },[formData])
  return (
    <div>
      <form onSubmit={handlesubmit}>
<label>
   name
</label>
<input type='text' placeholder='enter name3' name='name3' value={formData1.name3} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname3' name='nickname3' value={formData1.nickname3} onChange={changehandler} />
<button type='submit'>Next</button>
<button onClick={handleprev}>Previous</button>
      </form>
    </div>
  )
}

export default Media