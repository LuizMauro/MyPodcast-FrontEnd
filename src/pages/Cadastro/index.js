import React from 'react'
import { useDispatch } from 'react-redux';
import { Form }  from '@unform/web'
import Input from '../../components/Input'

import { signUpRequest }  from '../../store/modules/auth/actions';


export default function Cadastro() {
    const dispatch =  useDispatch();

    function handleSubmit({nome, senha, email, cpf, tipoUser}){
        dispatch(signUpRequest(nome, senha, email, cpf, tipoUser));
    }

    return (
       <>
            <Form onSubmit={handleSubmit}>
                <Input name="nome" type="text" placeholder="Nome" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="senha" type="password" placeholder="Sua senha " />
                <Input name="cpf" type="text" placeholder="CPF" />
                <Input name="tipoUser" type="text" placeholder="teste tus_id"/>
	
                <button type="submit">Cadastrar</button>
            </Form>
       </>
    )
}
