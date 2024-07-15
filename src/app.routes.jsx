import React,{useState} from 'react'
import { Route, Router,Switch } from 'react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
// import Home from './components/home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
const Routes = () => {
    const [signedUp,setSignedUp]=useState(false)
    return (
        <>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/forget">
                    <ForgotPage />
                </Route>
                <Route path="/signUp">
                    <SignUp signupState={signedUp} setSignedUp={setSignedUp}/>
                </Route>
                <Route path="/dashboard">
                    {signedUp?<Dashboard/>:<Redirect to="/signUp"></Redirect>}
                </Route>
                
            </Switch>
        </>
    )
}

export default Routes