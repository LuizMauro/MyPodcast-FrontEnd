import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom'


import AuthLayout from '../pages/_layouts/auth';
import DashboardLayout from '../pages/_layouts/dashboard'

import { store } from '../store'


export default function RouteWrapper({
    component: Component,
    isPrivate,
    teste,
    ...rest
}){

    const { signed } = store.getState().auth;
   
    let Layout = null;
  
    if(signed){
        const { profile } = store.getState().user;
        const { tus_descricao } = profile;
    
      
        if((signed && !isPrivate) && (tus_descricao === teste) && (teste === "Administrador")){
            return <Redirect to="/adm/dashboard" />
        }else if((signed && !isPrivate) && (tus_descricao === teste) && (teste === "Moderador")){
            return <Redirect to="/mod/dashboard" />
        }

    }


    if(!signed && isPrivate){
        return <Redirect to="/Login"/>
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
    teste: PropTypes.string,
    component: PropTypes.oneOfType([
       PropTypes.element, PropTypes.func 
    ]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false,
}