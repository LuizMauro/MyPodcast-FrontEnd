import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom'


import AuthLayout from '../pages/_layouts/auth';
import DashboardLayout from '../pages/_layouts/dashboard'


export default function RouteWrapper({
    component: Component,
    isPrivate,
    ... rest
}){
    const signed = false;
    let Layout = null;

    if(!signed && isPrivate){
        return <Redirect to="/Login"/>
    }

    if(signed && !isPrivate){
      
        return <Redirect to="/dashboard" />
    }

    if(!signed){
        Layout = AuthLayout;
    }else if(signed && isPrivate){
        Layout = DashboardLayout;
    }
   
  

    return(
        <Route
            {...rest}
            render={props =>(
                <Layout>
                    <Component {...props}></Component>
                </Layout>
            )}
        />
    )
}

RouteWrapper.prototype = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([
       PropTypes.element, PropTypes.func 
    ]).isRequired
};

RouteWrapper.defaulProps = {
    isPrivate: false,
}