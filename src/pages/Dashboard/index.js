import React from 'react'
import { useDispatch }  from 'react-redux';
import { signOut } from '../../store/modules/auth/actions'

import api from '../../services/api'



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
