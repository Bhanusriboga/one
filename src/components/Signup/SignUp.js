import React, { useState } from 'react'
import { Input, Button, Label } from 'reactstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// import axios from 'axios';
const SignUp = () => {
    const [passwordError, setPasswordError] = useState('');
    const [rePassError, setRePassError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userEmail: "",
        userPass: "",
        repeatPass: "",
        name: "",

    })

    const [token, setToken] = useState("")
    const onSignUp = async () => {
        const { userEmail, userPass, username } = formData
        // try {
        //     const response = await axios.post('http://192.168.29.191:8080/register', {
        //         email: { userEmail },
        //         password: { userPass },
        //         username: { username }

        //     });

        //     const { token } = response.data;

        //     // Store the token in localStorage
        //     localStorage.setItem('token', token);
        //     // Set the token in state
        //     setToken(token);
        // } catch (error) {
        //     console.error('Login failed', error);
        // }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

    };
    const togglePasswordVisibilities = () => {
        setRePassError(!rePassError)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(localStorage.getItem(token))
        if (formData.userPass !== formData.repeatPass) {
            setPasswordError('Passwords do not match');

        }
        else if (formData.userPass.length < 6 || formData.repeatPass.length < 6) {
            setPasswordError("password must be minimum 6 digits")
        }
        else {
            setPasswordError('');
        }

        console.log(formData)

    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,

            [name]: value
        });
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center border border-primary rounded p-4'>
                <Label for='email'>Username</Label>
                <Input bsSize="lg" id='email' onChange={handleChange} value={formData.userEmail} name='userEmail' placeholder='enter your username/emailId' />
                <div style={{ position: 'relative' }}>
                    <Label for='pass'>create a password</Label>
                    <Input bsSize="xl" type={showPassword ? 'text' : 'password'} id="pass" onChange={handleChange} name='userPass' value={formData.userPass} placeholder='create a password' />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '65%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>


                </div>
                <div style={{ position: 'relative' }} >
                    <Label for='reenter'>Re-Type your password</Label>
                    <Input bsSize="lg" type={showPassword ? 'text' : 'password'} id="reenter" onChange={handleChange} name='repeatPass' value={formData.repeatPass} placeholder='ReEnter your password' />
                    <button
                        type="button"
                        onClick={togglePasswordVisibilities}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '65%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        {rePassError ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <br />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                <Button
                    color="primary"
                    type='submit'
                    onClick={onSignUp}
                >
                    SignUp
                </Button>
                <br />
                <p className='text-align-center' >Already a Member? <span><a href='/login' style={{ textDecoration: "none" }}>Login</a></span></p>

            </form>

            {/* <LoginForm stateFromSignUp={formData}/> */}

        </div>
    )
}

export default SignUp;
