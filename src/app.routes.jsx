import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import LoginPage from './components/Login/LoginPage'
import ForgotPage from './components/Forgot/ForgotPage'
import SignUp from './components/Signup/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import RegisterMain from './components/register/RegisterMain'
import Home from "./components/home/Home"
import { getMyDetails } from './redux/slices/AuthSlice';
import UPIPayment from './components/payment/Payment'
import Loader from './common-components/Loader'
// Main Routes don't change anything
const Routes = () => {
    const { token } = useSelector(state => state.auth)
    return (
        token ? <AppRoutes /> : <UnAuthorizedRoutes />
    )
}

// Mention Authorized Routes
const AppRoutes = () => {
    const { Mydata } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [basicDetails, setBasicDetails] = useState(Mydata?.basicDetailsAvailable)
    const history = useHistory()

    useEffect(() => {
        const fetchMyDetails = async () => {
            const data = await dispatch(getMyDetails())
            if (data?.payload?.object?.basicDetailsAvailable) {
                setBasicDetails(true)
            } else {
                setBasicDetails(false)
            }
        }

        fetchMyDetails()
    }, [dispatch])

    useEffect(() => {
        if (basicDetails !== undefined) {
            if (basicDetails) {
                history.push('/dashboard')
            } else {
                history.push('/register')
            }
        }
    }, [basicDetails, history])

    return (
        (basicDetails === true || basicDetails === false) ?
            (
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
                    <Redirect path='/' to="/dashboard" />
                </Switch>
            ) : (
                <Loader/>
            )
    )
}

// Mention UnAuthorized Routes
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
            <Redirect path='/' to="home" />
        </Switch>
    )
}

export default Routes