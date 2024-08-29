import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, useHistory, Redirect, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDetails, logout } from './redux/slices/AuthSlice';
import Loader from './common-components/Loader';
import { toast } from 'react-toastify';
import { toastError } from './utils/constants';
import Storage from './utils/Storage';
// Lazy loading the components
const LoginPage = lazy(() => import('./components/Login/LoginPage'));
const ForgotPage = lazy(() => import('./components/Forgot/ForgotPage'));
const SignUp = lazy(() => import('./components/Signup/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const RegisterMain = lazy(() => import('./components/register/RegisterMain'));
const Home = lazy(() => import('./components/home/Home'));
const UPIPayment = lazy(() => import('./components/payment/Payment'));

// admin
const SignupForm = lazy(() => import('./vendor/SignUp/SignupForm'));
const Sidebar = lazy(() => import('./vendor/Sidebar'));
const AdminDashboard = lazy(() => import('./vendor/Sidebar')); // Add AdminDashboard component
const VendorDashboard = lazy(() => import('./vendor/Sidebar')); // Add VendorDashboard component

// Main Routes don't change anything
const Routes = () => {
    const { token } = useSelector(state => state.auth);
    return (
        <BrowserRouter>
            {token ? <AppRoutes /> : <UnAuthorizedRoutes />}
        </BrowserRouter>
    );
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
    }, [dispatch]);

    useEffect(() => {
        if (basicDetails !== undefined) {
            if (basicDetails) {
                const currentPath = history.location.pathname;
                if (currentPath.startsWith("/register")) {
                    history.push('/register');
                } else {
                    const role = Mydata?.role||Storage.get("role"); 
                    if (role === "ADMIN") {
                        history.push('/admin');
                    } else if (role === "VENDOR") {
                        history.push('/vendor');
                    } else {
                        history.push('/');
                    }
                }
            } else {
                history.push('/register');
            }
        }
    }, [basicDetails, history, Mydata]);

    return (
        <Suspense fallback={<Loader />}>
            {basicDetails === true || basicDetails === false ? (
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/register">
                        <RegisterMain />
                    </Route>
                    <Route path="/payment">
                        <UPIPayment />
                    </Route>
                    <Route path="/admin">
                        <AdminDashboard />
                    </Route>
                    <Route path="/vendor">
                        <VendorDashboard />
                    </Route>
                </Switch>
            ) : <Loader />}
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
                <Route path="/admin">
                    <Sidebar />
                </Route>
                <Route path="/admin-signup">
                    <SignupForm />
                </Route>
                <Redirect path="/" to="/home" />
            </Switch>
        </Suspense>
    );
};



export default Routes;