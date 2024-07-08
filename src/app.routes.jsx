import React from 'react'
import { Route, Router,Switch } from 'react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import Userprofile1 from './components/UserProfile/Userprofile1'

const Routes = () => {
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
                    <SignUp/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/userprofile">
                    <Userprofile1/>
                </Route>
                <Redirect path='/' to="login"></Redirect>
            </Switch>
        </>
    )
}

export default Routes