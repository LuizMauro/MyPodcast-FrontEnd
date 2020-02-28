import React from 'react'

import { Link } from 'react-router-dom';

export default function index() {
    return (
       <>
            <form>
                <input type="email" placeholder="Seu e-mail" />
                <input type="password"  placeholder="Sua senha" />

                <button type="submit">Entrar</button>
                <Link to="/cadastro">Criar conta gratuita</Link>
            </form>
       </>
    )
}
