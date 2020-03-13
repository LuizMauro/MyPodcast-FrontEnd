import React, { Component } from 'react';
import Navitem from '../NavItemDash/Navitem';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'NavItemActive': ''
        }
    }
    activeitem = (x) => {
        if (this.state.NavItemActive.length > 0) {
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        this.setState({ 'NavItemActive': x }, () => {
            document.getElementById(this.state.NavItemActive).classList.add('active');
        });
    };
    render() {
        return (
            <nav>
                <ul>
                    <Navitem item="Home" tolink="/adm/dashboard/" activec={this.activeitem}></Navitem>
                    <Navitem item="Usuarios" tolink="/adm/dashboard/usuarios" activec={this.activeitem}></Navitem>
                    <Navitem item="Podcasts" tolink="/adm/dashboard/podcasts" activec={this.activeitem}></Navitem>
                    <Navitem item="Moderadores" tolink="/adm/dashboard/moderadores" activec={this.activeitem}></Navitem>
                    <Navitem item="Solicitacao" tolink="/adm/dashboard/solicitacoes" activec={this.activeitem}></Navitem>
                    <Navitem item="Categorias" tolink="/adm/dashboard/categorias" activec={this.activeitem}></Navitem>
                    <Navitem item="Tags" tolink="/adm/dashboard/tags" activec={this.activeitem}></Navitem>
                    <Navitem item="Publicidade" tolink="/adm/dashboard/publicidade" activec={this.activeitem}></Navitem>
                    <Navitem item="Relatorio" tolink="/adm/dashboard/relatorio" activec={this.activeitem}></Navitem>
                </ul>
            </nav>
        )
    }
}

export default Navbar

