import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, prevStep, saveFormData } from '../../redux/slices/StepperSlice'

function BasicsDetails() {
  const [formData1,setFormData1] = useState({name:'',nickname:''})
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
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<var><label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} />
<label>
   name
</label>
<input type='text' placeholder='enter name' name='name' value={formData1.name} onChange={changehandler} />
<br/>
<br/>
<label>
   name
</label>
<input type='text' placeholder='enter nicname' name='nickname' value={formData1.nickname} onChange={changehandler} /></var>
<button type='submit'>Next</button>
<button onClick={handleprev}>Previous</button>
      </form>
    </div>
  )
}

export default BasicsDetails