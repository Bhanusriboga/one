import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import RegisterMain from './components/register/RegisterMain'

// Main Routes don't change any thing
const Routes = () => {
    const {token}=useSelector(state=>state.auth)
    return (
     token ? <AppRoutes /> : <UnAuthorizedRoutes />
    )
}
// Mention Authorized Routes
const AppRoutes = () => {
    return (
        <Switch>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/register">
                <RegisterMain />
            </Route>
            <Redirect path='/' to="dashboard"></Redirect>
        </Switch>
    )
}
//Mention UnAuthorized Routes
const UnAuthorizedRoutes = () => {
    return (
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/forget">
                <ForgotPage />
            </Route>
            <Route path="/signUp">
                <SignUp />
            </Route>
            <Route path="/register">
                <RegisterMain />
            </Route>
            <Redirect path='/' to="login"></Redirect>
        </Switch>
    )
}
export default Routes