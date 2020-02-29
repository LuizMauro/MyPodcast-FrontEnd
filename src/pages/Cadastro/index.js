import React from 'react'
import { Form }  from '@unform/web'
import * as Yup from 'yup'

import Input from '../../components/Input'

const schema = Yup.object().shape({
    
});

export default function index() {

    function handleSubmit(data){
        console.tron.log(data);
    }

    return (
       <>
            <Form onSubmit={handleSubmit}>
                <Input name="nome" type="text" placeholder="Nome" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="senha" type="password" placeholder="Sua senha " />
                <Input name="cpf" type="text" placeholder="CPF" />
                <Input name="tipo usuario" type="text" placeholder="teste tus_id"/>
	
                <button type="submit">Cadastrar</button>
            </Form>
       </>
    )
}
