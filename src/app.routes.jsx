import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDetails } from './redux/slices/AuthSlice';
import Loader from './common-components/Loader';

// Lazy loading the components
const LoginPage = lazy(() => import('./components/Login/LoginPage'));
const ForgotPage = lazy(() => import('./components/Forgot/ForgotPage'));
const SignUp = lazy(() => import('./components/Signup/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const RegisterMain = lazy(() => import('./components/register/RegisterMain'));
const Home = lazy(() => import('./components/home/Home'));
const UPIPayment = lazy(() => import('./components/payment/Payment'));

// Main Routes don't change anything
const Routes = () => {
    const { token } = useSelector(state => state.auth);
    return token ? <AppRoutes /> : <UnAuthorizedRoutes />;
};

// Mention Authorized Routes
const AppRoutes = () => {
    const { Mydata } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [basicDetails, setBasicDetails] = useState(Mydata?.basicDetailsAvailable);
    const history = useHistory();

    useEffect(() => {
        const fetchMyDetails = async () => {
            const data = await dispatch(getMyDetails());
            if (data?.payload?.object?.basicDetailsAvailable) {
                setBasicDetails(true);
            } else {
                setBasicDetails(false);
            }
        };

        fetchMyDetails();
    }, [dispatch]);

    useEffect(() => {
        if (basicDetails !== undefined) {
            if (basicDetails) {
                history.push('/dashboard');
            } else {
                history.push('/register');
            }
        }
    }, [basicDetails, history]);

    return (
        <Suspense fallback={<Loader />}>
            {basicDetails === true || basicDetails === false ? (
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
                    <Redirect path="/" to="/dashboard" />
                </Switch>
            ):<Loader/> }
        </Suspense>
    );
};

// Mention UnAuthorized Routes
const UnAuthorizedRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
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
                <Redirect path="/" to="home" />
            </Switch>
        </Suspense>
    );
};

export default Routes;