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
// const Signup = lazy(() => import('./vendor/SignUp/SignupForm'));

const Routes = () => {
    const { token,role } = useSelector(state => state.auth);
    return (
        <BrowserRouter>
            {token ? <RoleBasedRoutes role={role} /> : <UnAuthorizedRoutes />}
        </BrowserRouter>
    );
};

const RoleBasedRoutes = ({ role }) => {
    const { Mydata } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [basicDetails, setBasicDetails] = useState(Mydata?.basicDetailsAvailable);
    const history = useHistory();

    useEffect(() => {
        if (role === 'USER') {
            const fetchMyDetails = async () => {
                const data = await dispatch(getMyDetails());
                if(data.payload?.status>=400||data.payload?.object?.message=="Invalid User ReCheck Your MobileNumber"||data.payload?.object?.message=="JWT token has expired"){//after ai change need to change this as exact status code
                    toast.error(data?.payload?.message,toastError)
                    await dispatch(logout())
                    setBasicDetails(false);
                }
                else if (data?.payload?.object?.basicDetailsAvailable) {
                    setBasicDetails(true);
                } else {
                    setBasicDetails(false);
                }
            };

            fetchMyDetails();
        }
    }, [dispatch, role]);

    useEffect(() => {
        if (role === 'USER') {
            if (basicDetails) {
                const currentpath=window.location.pathname;
                if(currentpath=="/dashboard"||currentpath=="/edit-profile"||currentpath=="/user-details"||currentpath=="/add-preferences"||currentpath=="/ignored-users"||currentpath=="/shortlisted"||currentpath=="/settings"){
                history.push(currentpath);
            } else {
                history.push('/register');
            }
        } else if (role === 'ADMIN' || role === 'VENDOR') {
            history.push('/admin');
        }
    }
    }, [basicDetails, history, role]);

    return (
        <Suspense fallback={<Loader />}>
            {role === 'USER' ? 
                   ( <Switch>
                        <Route path="/" >
                            <Dashboard />
                        </Route>
                        <Route path="/register">
                            <RegisterMain />
                        </Route>
                        <Route path="/payment">
                            <UPIPayment />
                        </Route>
                        {basicDetails===false ? (
                            <Redirect path="/" to="/register" />
                        ) : (
                            <Redirect path="/" to="/" />
                        )}
                    </Switch>
            ) : (
                <Switch>
                    <Route path="/admin" exact>
                        <Sidebar />
                    </Route>
                    <Route path="/admin-signup">
                        <SignupForm />
                    </Route>
                    <Redirect path="/" to="/admin" />
                </Switch>
            )}
        </Suspense>
    );
};
RoleBasedRoutes.propTypes={
    role:PropTypes.string
}
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
                <Redirect path="/" to="/home" />
            </Switch>
        </Suspense>
    );
};

export default Routes;