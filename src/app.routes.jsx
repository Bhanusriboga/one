import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import LoginPage from './components/Login/LoginPage'
// import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
// import Dashboard from './components/Dashboard/Dashboard'
// import RegisterMain from './components/register/RegisterMain'
import Home from './components/home/Home'
// const Routes = () => {
//     const {token}=useSelector(state=>state.auth)
//     return (
//      token ? <AppRoutes /> : <UnAuthorizedRoutes />
//     )
// }
// Mention Authorized Routes
const Routes = () => {
    return (
        <>
                <Switch>
                    {/* <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/profile">
                        <CustomSideBar />
                    </Route>
                    <Route path="/shortlistusers">
                        <ShortListedUsers />
                    </Route>
                    <Route path="/ignoreusers">
                        <IgnoreUsers />
                    </Route>
                    <Route path="/register">
                        <RegisterMain />
                    </Route> */}
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    {/* <Route path="/forget">
                        <ForgotPage />
                    </Route> */}
                    <Route path="/signUp">
                        <SignUp />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    {/* <Redirect path='/' to="login"></Redirect> */}
                </Switch>
        </>
    )
}
export default Routes