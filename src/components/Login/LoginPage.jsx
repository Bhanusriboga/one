import React from 'react'
import './Login.scss'
import { Button, Input, Form, Label, FormGroup, Col } from 'reactstrap';
const LoginPage = (props) => {
    return (
        <div class="d-flex justify-content-center align-items-center h-100">
            
            <Form>
            <h3>Sign in</h3>
                <FormGroup row className='mt-4'>
                    <Label
                        for="Email"
                        sm={3}
                    >
                        Email
                    </Label>
                    <Col sm={9}>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Enter Email"
                            type="email"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="Password"
                        sm={3}
                    >
                        Password
                    </Label>
                    <Col sm={9}>
                        <Input
                            id="Password"
                            name="password"
                            placeholder="Enter Password"
                            type="password"
                        />
                    </Col>
                </FormGroup>
                <FormGroup
                    row
                >
                        <Button 
                        color='link'  
                        href="/forget"
                        tag="a" 
                        className='d-flex justify-content-start text-decoration-none pl-1 cButton'
                        >
                            Forget password?
                        </Button>
                </FormGroup>
                <FormGroup
                    check
                    row
                    className='d-flex justify-content-center align-items-center p-0'
                >
                        <Button 
                        color='primary'  
                        href="/dashboard"
                        tag="a" 
                        className='w-50 mt-2'
                        >
                            Sign in
                        </Button>
                </FormGroup>
                <FormGroup
                    className='d-flex justify-content-center align-items-center p-4'
                > <span className='fitWidth'>Not Registered?</span>
                        <Button 
                        color='link'  
                        href="/signUp"
                        tag="a" 
                        className='text-decoration-none p-0 cButton'
                        >
                            Create an account
                        </Button>
                </FormGroup>
            </Form>
        </div>
    )
}
export default LoginPage