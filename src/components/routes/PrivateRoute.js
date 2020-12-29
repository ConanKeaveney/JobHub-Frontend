import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStitchAuth } from "../login/StitchAuth";




const PrivateRoute = ({ component: Component, ...rest }) => {
    const {
        currentUser,
        isLoggedIn
    } = useStitchAuth();
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn === true ?
                <Component {...props} currentUser={currentUser} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;