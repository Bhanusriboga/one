import React,{useState} from 'react'
import { Route, Router,Switch } from 'react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
import Home from './components/home/Home'
import Dashboard from './components/Dashboard/Dashboard'
<<<<<<< HEAD
=======
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import CustomSideBar from './components/custom-side-bar/CustomSideBar'
import ShortListedUsers from './components/shortlistedUsers/ShortListedUsers'
import IgnoreUsers from './components/ignoreUsers/IgnoreUsers'
import RegisterMain from './components/register/RegisterMain'
>>>>>>> 90b9f398be6d4171e435ab2c8e44e6a422fb7790
const Routes = () => {

    return (
        <>
            <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/forget">
                    <ForgotPage />
                </Route>
                <Route path="/signUp">
                    <SignUp />
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
<<<<<<< HEAD
=======
                <Route path="/profile">
                    <CustomSideBar/>
                </Route>
                <Route path="/shortlistusers">
                    <ShortListedUsers/>
                </Route>
                <Route path="/ignoreusers">
                <IgnoreUsers/>
                </Route>
                <Route path='/register'>
                <RegisterMain />
                </Route>
                <Redirect path='/' to="login"></Redirect>
>>>>>>> 90b9f398be6d4171e435ab2c8e44e6a422fb7790
            </Switch>
        </>
    )
}

export default Routes