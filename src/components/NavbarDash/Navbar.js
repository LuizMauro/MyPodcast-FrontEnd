import React, { Component } from 'react';
import Navitem from '../NavItemDash/Navitem';

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
            <Navitem item="Home" tolink="/Dashboard/"  activec={this.activeitem}></Navitem>
            <Navitem item="Usuarios" tolink="/Dashboard/usuarios"  activec={this.activeitem}></Navitem>
            <Navitem item="Podcasts" tolink="/Dashboard/podcasts"  activec={this.activeitem}></Navitem>
            <Navitem item="Moderadores" tolink="/Dashboard/moderadores"  activec={this.activeitem}></Navitem>
            <Navitem item="Solicitacao" tolink="/Dashboard/solicitacao"  activec={this.activeitem}></Navitem>
            <Navitem item="Categorias" tolink="/Dashboard/Categorias"  activec={this.activeitem}></Navitem>
            <Navitem item="Publicidade" tolink="/Dashboard/Publicidade"  activec={this.activeitem}></Navitem>
            <Navitem item="Tags" tolink="/Dashboard/tags"  activec={this.activeitem}></Navitem>
            <Navitem item="Relatorio" tolink="/Dashboard/relatorio"  activec={this.activeitem}></Navitem>
            </ul>
            </nav>
            )
        }
    }
    
    export default Navbar
    
