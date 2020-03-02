import React from 'react'
import { useDispatch }  from 'react-redux';
import { signOut } from '../../store/modules/auth/actions'


import api from '../../services/api'

export default function Dashboard() {
    const dispatch = useDispatch();

    api.get('adm/users');
    function handleSignOut(){
        dispatch(signOut())
    }


    return (
        <div>
            <h1>MOD</h1>  

            <button type='button' onClick={handleSignOut}>Sair</button>
        </div>
    )
}
