import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { toast } from 'react-toastify';

export function* createCategoria({ payload }) {
	try {
		const { ctg_categoria } = payload;
		yield call(api.post, 'adm/categoria', {
			ctg_categoria
		});

		toast.success('Categoria cadastrada!');
	} catch (err) {
		console.tron.log(err);
		toast.error('Falha no cadastro, Verifique seus dados!');
	}
}

export default all([
	takeLatest('@ctg/CREATE_CATEGORIA_REQUEST', createCategoria)
]);
