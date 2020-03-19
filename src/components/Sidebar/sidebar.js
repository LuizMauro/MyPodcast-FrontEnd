// sidebar.js

import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default (props) => {
	return (
		<Menu>
			<a className="menu-item" href="/">
				Home
			</a>

			<a className="menu-item" href="/Users">
				Usuários
			</a>

			<a className="menu-item" href="/angular">
				Solicitações de Cadastro
			</a>

			<a className="menu-item" href="/react">
				Podcasts
			</a>

			<a className="menu-item" href="/vue">
				Moderadores
			</a>

			<a className="menu-item" href="/node">
				Categorias
			</a>

			<a className="menu-item" href="/node">
				Publicidade
			</a>

			<a className="menu-item" href="/node">
				Relatório
			</a>
		</Menu>
	);
};
