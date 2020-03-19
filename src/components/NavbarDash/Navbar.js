import React, { Component } from 'react';
import Navitem from '../NavItemDash/Navitem';
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'NavItemActive': '',
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            abrir: false,
           
        }

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }


    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
      }
    
      componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
      }
    
      onSetSidebarOpen() {
        this.setState({ sidebarDocked: true, sidebarOpen: false, abrir: false });
      }
    
      onSetSidebarExit() {
        this.setState({ sidebarDocked: false, sidebarOpen: false, abrir: true});
      }
    
      mediaQueryChanged() {
        console.log(mql.matches)
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false, abrir: !mql.matches });
      }


    activeitem = (x) => {
        if (this.state.NavItemActive.length > 0) {
            console.log(this.state.NavItemActive);
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        
        this.setState({ 'NavItemActive': x }, () => {
            console.log(this.state.NavItemActive[0]);
            document.getElementById(this.state.NavItemActive).classList.add('active');
        });
    };
    render() {
        return (


            <>
            <Sidebar
              sidebar ={ 
                        <nav>
                            <ul>
                                <Navitem item="Home" tolink="/adm/dashboard/" activec={this.activeitem}></Navitem>
                                <Navitem item="Usuarios" tolink="/adm/dashboard/usuarios" activec={this.activeitem}></Navitem>
                                <Navitem item="Cadastrar Podcast" tolink="/adm/dashboard/podcasts/cadastrar" activec={this.activeitem}></Navitem>
                                <Navitem item="Editar Podcast" tolink="/adm/dashboard/podcasts/editar" activec={this.activeitem}></Navitem>
                                <Navitem item="Moderadores" tolink="/adm/dashboard/moderadores" activec={this.activeitem}></Navitem>
                                <Navitem item="Solicitacao" tolink="/adm/dashboard/solicitacoes" activec={this.activeitem}></Navitem>
                                <Navitem item="Categorias" tolink="/adm/dashboard/categorias" activec={this.activeitem}></Navitem>
                                <Navitem item="Publicidade" tolink="/adm/dashboard/publicidade" activec={this.activeitem}></Navitem>
                                <Navitem item="Relatorio" tolink="/adm/dashboard/relatorio" activec={this.activeitem}></Navitem>
                            </ul>
                        </nav>
                       }   
              open={this.state.sidebarOpen}
              docked={this.state.sidebarDocked}
              onSetOpen={this.onSetSidebarOpen}
              styles={{
                sidebar: {
                  padding:20,
                  background:"#fff"
                }}}
            >
            
              {this.state.abrir ? (
                <div>
                  <button onClick={() => this.onSetSidebarOpen()}>Abrir</button>
                </div>
              ):(
                <div>
                    <button onClick={() => this.onSetSidebarExit()}>Fechar</button>
                  
                </div>
              )} 
             
             {this.props.teste}

            </Sidebar>
            </>
        )
    }
}

export default Navbar

