import React from 'react';
import { Route, Redirect } from 'react-router-dom';


/*
    Private Route rules:
    1. Access all the props we commonly would get into Route.
    2. If the user is logged in (token exists), render the passed in component.
    3. If the user is not logged in, redirect to login page.
*/

const PrivateRoute = ({component:Component, ...rest}) => {
    // return <Route {...rest} component={Component}/>
    return <Route {...rest} render={(props)=> {
        if (localStorage.getItem("token")) {
            return (<Component {...props}/>);
        } else {
            return <Redirect to="/login" />
        }
    }}/>
}

export default PrivateRoute;