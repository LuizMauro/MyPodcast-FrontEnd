import React from 'react'
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions'
import Sidebar from '../../components/Sidebar'

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';


import api from '../../services/api'

// nodejs library that concatenates classes
//import classNames from "classnames";
// react plugin used to create charts

//import { Line, Pie } from "react-chartjs-2";

// reactstrap components
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";


export default function Dashboard() {
    api.get('adm/users');

    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch(signOut())
    }


    return (     
        <>
                <Router>
                //<div className="App">
                <Navbar />
                <Route exact path="/">
                <Home />
                </Route>
                <Route path="/about">
                <About />
                </Route>
                <Route path="/education">
                <Education />
                </Route>
                <Route path="/skills">
                <Skills />
                </Route>
                <Route path="/contact">
                <Contact />
                </Route>
                </div>
                </Router>
        </>
    )
}
