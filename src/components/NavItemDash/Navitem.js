import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

class Navitem extends Component {
    render() {
                return (
                    <li className="nav-item" id={this.props.item}>
                        <Link className="link-menu" style={{display:"flex", alignItems:"center", height: 70,margin: 10, textDecoration:"none", flexDirection: "column", color:"#fff", padding:5}} 
                        to={this.props.tolink}
                        onClick={this.props.activec.bind(this,this.props.item)}>
                        
                            {this.props.icone}

                            <span class="link-text"> {this.props.item}</span>
                        </Link>
                    </li>
                    )
            }
        }
        
export default Navitem
        