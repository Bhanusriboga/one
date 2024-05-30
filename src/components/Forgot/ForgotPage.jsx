import React from 'react'
import { Button, Input, Form, Label, FormGroup, Col } from 'reactstrap';
const ForgotPage=()=> {
  return (
    <div class="d-flex justify-content-center align-items-center h-100">
                  <Form>
            <h3> Forgot Password</h3>
            <FormGroup row className='mt-4'>
                    <Label
                        for="Email"
                        sm={3}
                    >
                        Email
                    </Label>
                    <Col sm={9}>
                        <Input
                            id="Email"
                            name="email"
                            placeholder="Enter Email"
                            type="email"
                        />
                    </Col>
                </FormGroup>
                <FormGroup
                    row
                    className='d-flex justify-content-center align-items-center p-0'
                >
                        <Button 
                        color='primary'  
                        href="#"
                        tag="a" 
                        >
                            Forgot Password
                        </Button>
                </FormGroup>
                <FormGroup
                    row
                >
                        <Button 
                        color='link'  
                        href="/login"
                        tag="a" 
                        className='d-flex justify-content-start text-decoration-none pl-1 cButton'
                        >
                            Sign in?
                        </Button>
                </FormGroup>
            </Form>
     </div>
  )
}

export default ForgotPage