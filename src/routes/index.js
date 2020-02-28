import React from 'react'
import { Switch }  from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'

import Dashboard from '../pages/Dashboard'

export default function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Cadastro"  component={Cadastro} />
            <Route path="/Login"  component={Login} />
            <Route path="/Dashboard"  component={Dashboard} isPrivate />

            <Route path="/" component={() => <h1>404</h1>} />
        </Switch>
    )
}