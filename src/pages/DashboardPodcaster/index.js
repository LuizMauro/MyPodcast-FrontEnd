import React from 'react'
import { useDispatch }  from 'react-redux';
import { signOut } from '../../store/modules/auth/actions'

export default function Dashboard() {
    const dispatch = useDispatch();

    function handleSignOut(){
        dispatch(signOut())
    }


    return (
        <div>
            <h1>Podcaster</h1>  

            <button type='button' onClick={handleSignOut}>Sair</button>
        </div>
    )
}
