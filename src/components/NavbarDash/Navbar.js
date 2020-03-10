import React, { Component } from 'react';
import Navitem from './NavItemDash';

class Navbar extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            'NavItemActive':''
        }
    }
    activeitem=(x)=>
    {
        if(this.state.NavItemActive.length>0){
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        this.setState({'NavItemActive':x},()=>{
            document.getElementById(this.state.NavItemActive).classList.add('active');
        });
    };
    render() {
        return (
            <nav>
            <ul>
            <Navitem item="Home" tolink="Dashboard/"  activec={this.activeitem}></Navitem>
            <Navitem item="About" tolink="Dashboard/about"  activec={this.activeitem}></Navitem>
            <Navitem item="Education" tolink="Dashboard/education"  activec={this.activeitem}></Navitem>
            <Navitem item="Skills" tolink="Dashboard/skills"  activec={this.activeitem}></Navitem>
            <Navitem item="Contact" tolink="Dashboard/contact"  activec={this.activeitem}></Navitem>
            </ul>
            </nav>
            )
        }
    }
    
    export default Navbar
    
