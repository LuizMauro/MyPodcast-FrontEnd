import React, { useRef } from 'react'
import { useDispatch}  from 'react-redux'
import { Link } from 'react-router-dom';
import { Form }  from '@unform/web'


import { logarRequest } from '../../store/modules/auth/actions'

import Input from '../../components/Input';

function Login() {
    const formRef = useRef(null);
    const dispatch = useDispatch();


   function handleSubmit({email, senha }){
    dispatch(logarRequest(email, senha))
   }

    return (
       <>
            <Form ref={formRef}  onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="E-mail"  />
                <Input name="senha" type="password" placeholder="Senha"  />
                <button type="submit">Entrar</button>

                <Link to="/cadastro">Criar conta gratuita</Link>
            </Form>
       </>
    )
}

export default Login;