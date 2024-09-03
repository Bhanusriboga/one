import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, useHistory, Redirect, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDetails, logout } from './redux/slices/AuthSlice';
import Loader from './common-components/Loader';
import { toast } from 'react-toastify';
import { toastError } from './utils/constants';
import PropTypes from 'prop-types';

// Lazy loading the components
const LoginPage = lazy(() => import('./components/Login/LoginPage'));
const ForgotPage = lazy(() => import('./components/Forgot/ForgotPage'));
const SignUp = lazy(() => import('./components/Signup/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const RegisterMain = lazy(() => import('./components/register/RegisterMain'));
const Home = lazy(() => import('./components/home/Home'));
const UPIPayment = lazy(() => import('./components/payment/Payment'));

// admin and vendor
const SignupForm = lazy(() => import('./vendor/SignUp/SignupForm'));
const Sidebar = lazy(() => import('./vendor/Sidebar'));

const Routes = () => {
    const { token, role } = useSelector(state => state.auth);
    return (
        <BrowserRouter>
            {token ? <RoleBasedRoutes role={role} /> : <UnAuthorizedRoutes />}
        </BrowserRouter>
    );
};

const RoleBasedRoutes = ({ role }) => { 
    const { Mydata } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [basicDetails, setBasicDetails] = useState(Mydata?.object?.basicDetailsAvailable);
    const history = useHistory();

    useEffect(() => {
        if (role === 'USER') {
            const fetchMyDetails = async () => {
                const data = await dispatch(getMyDetails());
                if (data.payload?.status >= 400 || data.payload?.object?.message === "Invalid User ReCheck Your MobileNumber" || data.payload?.object?.message === "JWT token has expired") {
                    toast.error(data?.payload?.message, toastError);
                    await dispatch(logout());
                    setBasicDetails(false);
                    history.push('/home');
                } else if (data?.payload?.object?.basicDetailsAvailable) {
                    setBasicDetails(true);
                } else {
                    setBasicDetails(false);
                    history.push('/register');
                }
            };

            fetchMyDetails();
        } else if (role === 'ADMIN' || role === 'VENDOR') {
            const fetchMyDetails = async () => {
                await dispatch(getMyDetails());
            }
            fetchMyDetails()

            history.push(role === 'ADMIN'?'/admin':'/vendor');
        }
    }, [dispatch, role, history]);

    useEffect(() => {
        if (role === 'USER') {
            if (basicDetails) {
                const currentpath = window.location.pathname;
                if (currentpath=="/dashboard"||currentpath=="/edit-profile"||currentpath=="/user-details"||currentpath=="/add-preferences"||currentpath=="/ignored-users"||currentpath=="/shortlisted"||currentpath=="/settings") {
                    history.push(currentpath);
                } else {
                    history.push('/dashboard');
                }
            } else {
                history.push('/register');
            }
        }
    }, [basicDetails, history, role]);

    return (
        <Suspense fallback={<Loader />}>
            {role === 'USER' ? (
                <Switch>
                    <Route path="/register">
                        <RegisterMain />
                    </Route>
                    <Route path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/payment">
                        <UPIPayment />
                    </Route>
                    {basicDetails === false ? (
                        <Redirect to="/register" />
                    ) : (
                        <Redirect to="/dashboard" />
                    )}
                </Switch>
            ) : (
                <Switch>
                    <Route path="/admin" exact>
                        <Sidebar />
                    </Route>
                    <Route path="/vendor" exact>
                        <Sidebar />
                    </Route>
                    <Route path="/admin-signup">
                        <SignupForm />
                    </Route>
                    
                    {role=="ADMIN"  ? <Redirect to="/admin" /> : <Redirect to="/vendor" />}
                </Switch>
            )}
        </Suspense>
    );
};

RoleBasedRoutes.propTypes = {
    role: PropTypes.string.isRequired
};

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
                <Redirect to="/home" />
            </Switch>
        </Suspense>
    );
};

export default Routes;