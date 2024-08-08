import React, { useEffect,useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import RegisterMain from './components/register/RegisterMain'
import Home from "./components/home/Home"import {getMyDetails} from "./redux/slices/AuthSlice"
import UPIPayment from './components/payment/Payment'
// Main Routes don't change any thing
const Routes = () => {
    const {token}=useSelector(state=>state.auth)
    return (
     token ? <AppRoutes /> : <UnAuthorizedRoutes />
    )
}
// Mention Authorized Routes
const AppRoutes = () => {
    const {Mydata}=useSelector(state=>state.auth)
    const dispatch=useDispatch();
    const [basicDetails,setBasicDetails]=useState(Mydata?.basicDetailsAvailable)
    useEffect(()=>{
        myDetails()
        setBasicDetails(Mydata.basicDetailsAvailable)
    },[])
    const myDetails=async()=>{
      const data= await dispatch(getMyDetails())
      if(data?.Mydata?.basicDetailsAvailable){
        setBasicDetails(true)
      }
    }
    

    return (
        <Switch>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/register">
                <RegisterMain />
            </Route>
            <Route path="/payment">
                <UPIPayment />
            </Route>
            <Redirect path='/' to={basicDetails?"dashboard":"register"}></Redirect>
        </Switch>
    )
}
//Mention UnAuthorized Routes
const UnAuthorizedRoutes = () => {
    return (
        <Switch>
            <Route path="/home">
                <Home />
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
            <Route path="/register">
                <RegisterMain />
            </Route>
            <Redirect path='/' to="home"></Redirect>
        </Switch>
    )
}
export default Routes