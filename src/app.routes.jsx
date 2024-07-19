import React,{useState} from 'react'
import { Route, Router,Switch } from 'react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
import Home from './components/home/Home'
import Dashboard from './components/Dashboard/Dashboard'
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
            </Switch>
        </>
    )
}

export default Routes