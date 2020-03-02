import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import {store} from '../store';

const PrivateRouteADM = ({ component: Component,path ,...rest})=>(
    <Route
        {...rest}
            render={props => (((store.getState().auth) && (store.getState().user.profile.tus_descricao === "Administrador") && (path.includes("/adm"))))? (
                <Component { ...props}/>
            ):(
                <h1>Area restrita </h1>
            )}
    />
);

PrivateRouteADM.prototype = {
    component: PropTypes.func.isRequired,
}

export default PrivateRouteADM;