import React from 'react'
import { Route,Switch } from 'react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import CustomSideBar from './components/custom-side-bar/CustomSideBar'
import RegisterMain from './components/register/RegisterMain'
import Stepper from './components/register/Stepper'

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
                <Route path="/profile">
                    <CustomSideBar/>
                </Route>
                <Route path='/register'>
                <RegisterMain />
                </Route>
                <Route path='/stepper'>
                    <Stepper />
                </Route>
                <Redirect path='/' to="login"></Redirect>
                
            </Switch>
        </>
    )
}

export default Routes