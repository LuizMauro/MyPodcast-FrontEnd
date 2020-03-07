import React from 'react'
import { useDispatch }  from 'react-redux';
import { signOut } from '../../store/modules/auth/actions'

import api from '../../services/api'

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";


export default function Dashboard() {
    api.get('adm/users');
    
    const dispatch = useDispatch();

    function handleSignOut(){
        dispatch(signOut())
    }


    return (
        <div>
            <h1>ADM</h1>  

              
     
        
            <button type='button' onClick={handleSignOut}>Sair</button>
        </div>
    )
}
