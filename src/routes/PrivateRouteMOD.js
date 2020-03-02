import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import {store} from '../store';

const PrivateRouteMOD = ({ component: Component,path ,...rest})=>(
    <Route
        {...rest}
            render={props => (((store.getState().auth) && (store.getState().user.profile.tus_descricao === "Moderador") && (path.includes("/mod"))))? (
                <Component { ...props}/>
            ):(
                <h1>Area restrita</h1>
            )}
    />
);

PrivateRouteMOD.prototype = {
    component: PropTypes.func.isRequired,
}

export default PrivateRouteMOD;