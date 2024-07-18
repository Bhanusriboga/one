import React, { useState } from 'react'
import { Button, Modal, FormGroup,Col, ModalBody, ModalFooter,Input } from 'reactstrap';
import { FaExclamationCircle,FaEnvelope } from "react-icons/fa";
import { forgot,login } from '../../utils/constants';
import '../Login/Login.scss'
import { RxCross2 } from "react-icons/rx";
import fogIcon from '../../Assets/forgotIcon.svg'
import { useHistory } from "react-router-dom";
const ForgotPage=(props)=> {
    const history = useHistory();
    const [submitClicked, setSubmitClicked] = useState(false)
    const handlesubmit=(type)=>{
        if(type === 'submit'){
            setSubmitClicked(true)
        } else{
            props.toggle()
            history.push('/dashboard');
        }

    }
  return (
    <div class="d-flex justify-content-center align-items-center h-100">
      <Modal isOpen={props.modal} toggle={props.toggle} {...props} centered>
        <ModalBody className='fogbck'>
            <div className='d-flex justify-content-end'>
            <Button color='link' className='text-decoration-none' onClick={props.toggle}><RxCross2 size={23} color='gray'/></Button>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
            <img src={fogIcon}></img>
             <h4>{forgot.forgot}</h4>
             <div className='w-75 d-flex justify-content-center align-items-center'>{forgot.forgotMsg}</div>
            </div>

             <FormGroup  className='mt-4 d-flex justify-content-center align-items-center '>
                        <Col sm={9} className='letterIconplace'>
                        {!submitClicked?<>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder={login.emailPlaceholder}
                                    type="email"
                                    className='emailinput'
                                />
                                    <FaEnvelope color='#d3d3d3' className='emailicon'/></>:
                                     <Input
                                     id="OTP"
                                     name="OTP"
                                     placeholder={login.otpPlaceHolder}
                                     type="number"
                                     className='emailinput'
                                 />}
                        </Col>
                    </FormGroup>
                    <FormGroup
                        check
                        row
                        className='d-flex justify-content-center align-items-center p-0'
                    >
                         {!submitClicked?
                        <Button
                            className='mt-2 submitbtn btnback'
                            onClick={()=>handlesubmit('submit')}
                        >
                            {forgot.subbtn}
                        </Button>:<Button
                            className='mt-2 submitbtn btnback'
                            onClick={()=>handlesubmit('verify')}
                        >
                            {forgot.verify}
                        </Button>}
                    </FormGroup>
                    <FormGroup
                        className='d-flex justify-content-center align-items-center p-4 loginhead'
                    > <span className='fitWidth'> {login.noAccount}</span>
                        <Button
                            color='link'
                            href="/signUp"
                            tag="a"
                            className='text-decoration-none p-0 cButton loginhead signupbtn'
                        >
                            {login.signup}
                        </Button>
                    </FormGroup>
        </ModalBody>
      </Modal>
     </div>
  )
}

export default ForgotPage