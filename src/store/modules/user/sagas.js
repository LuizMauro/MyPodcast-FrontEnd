import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import { toast } from 'react-toastify';

export function* updateProfile({ payload }) {
	try {
		const { usu_nome, usu_email, ...rest } = payload.data;

		const profile = Object.assign(
			{ usu_nome, usu_email },
			rest.senhaAntiga ? rest : {}
		);

		const response = yield call(api.put, 'edituser', profile);

		if (response.data.usuNomeExists) {
			toast.error('Nome de usuário indisponível');
		} else if (response.data.usuEmailExists) {
			toast.error('E-mail já cadastrado');
		} else {
			toast.success('Perfil atualizado com sucesso');
			yield put(updateProfileSuccess(response.data));
		}
	} catch (err) {
		toast.error('Erro ao atualizar perfil');
		yield put(updateProfileFailure);
	}
}

export function* updateStatus({ payload }) {
	const { usu_id, usu_status } = payload;

	try {
		yield call(api.put, `/users/${usu_id}/${usu_status ? 0 : 1}`);
	} catch (err) {
		toast.error('Erro ao ativar ou desativar usuário');
		console.tron.log('o erro é', err);
	}
}

export function* updateModerador({ payload }) {
	const { usu_id, tus_id } = payload;

	try {
		yield call(api.put, `/users/tipo/${usu_id}/${tus_id === 3 ? 1 : 3}`);
	} catch (err) {
		toast.error('Erro ao ativar ou desativar usuário');
		console.tron.log('o erro é', err);
	}
}

export default all([
	takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
	takeLatest('@user/UPDATE_STATUS_REQUEST', updateStatus),
	takeLatest('@user/UPDATE_MODERADOR_REQUEST', updateModerador),
]);
